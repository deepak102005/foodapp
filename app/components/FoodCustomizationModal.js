'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './FoodCustomizationModal.module.css';

export default function FoodCustomizationModal({ item, isOpen, onClose }) {
  const { addItem } = useCart();

  const basesList = useMemo(() => item?.customizationOptions?.bases?.options || [], [item]);
  const proteinsList = useMemo(() => item?.customizationOptions?.proteins?.options || [], [item]);
  const toppingsList = useMemo(() => item?.customizationOptions?.toppings?.options || [], [item]);
  const dressingsList = useMemo(() => item?.customizationOptions?.dressings?.options || [], [item]);

  // Default selections
  const [selectedBase, setSelectedBase] = useState(basesList[0]?.id || 'tri-quinoa');
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([
    toppingsList[0]?.id || 'extra-avocado',
  ]);
  const [selectedDressing, setSelectedDressing] = useState(dressingsList[0]?.id || 'lemon-tahini');
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // Toggle Protein selection (max 2)
  const toggleProtein = (id) => {
    setSelectedProteins((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  // Toggle Topping selection (max 4)
  const toggleTopping = (id) => {
    setSelectedToppings((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  // Dynamic calculations
  const { currentUnitPrice, currentCalories, currentProtein, activeAllergens } = useMemo(() => {
    let unitPrice = item?.price || 249;
    let calories = item?.nutrition?.calories || 450;
    let protein = item?.nutrition?.protein || 18;
    const allergensSet = new Set();

    // Base option
    const baseOpt = basesList.find((b) => b.id === selectedBase);
    if (baseOpt) {
      unitPrice += baseOpt.price;
      calories += baseOpt.calories - (basesList[0]?.calories || 140);
      baseOpt.allergens?.forEach((a) => allergensSet.add(a));
    }

    // Proteins
    selectedProteins.forEach((pId) => {
      const pOpt = proteinsList.find((p) => p.id === pId);
      if (pOpt) {
        unitPrice += pOpt.price;
        calories += pOpt.calories;
        protein += pOpt.protein;
        pOpt.allergens?.forEach((a) => allergensSet.add(a));
      }
    });

    // Toppings
    selectedToppings.forEach((tId) => {
      const tOpt = toppingsList.find((t) => t.id === tId);
      if (tOpt) {
        unitPrice += tOpt.price;
        calories += tOpt.calories;
        protein += tOpt.protein;
        tOpt.allergens?.forEach((a) => allergensSet.add(a));
      }
    });

    // Dressing
    const dressingOpt = dressingsList.find((d) => d.id === selectedDressing);
    if (dressingOpt) {
      unitPrice += dressingOpt.price;
      dressingOpt.allergens?.forEach((a) => allergensSet.add(a));
    }

    // Add base allergens from original item
    item?.allergens?.contains?.forEach((c) => allergensSet.add(c.name));

    return {
      currentUnitPrice: unitPrice,
      currentCalories: Math.round(calories),
      currentProtein: Math.round(protein * 10) / 10,
      activeAllergens: Array.from(allergensSet),
    };
  }, [
    item,
    selectedBase,
    selectedProteins,
    selectedToppings,
    selectedDressing,
    basesList,
    proteinsList,
    toppingsList,
    dressingsList,
  ]);

  const totalPrice = currentUnitPrice * quantity;

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    const baseObj = basesList.find((b) => b.id === selectedBase);
    const proteinsObj = selectedProteins.map((pId) => proteinsList.find((p) => p.id === pId)?.name).filter(Boolean);
    const toppingsObj = selectedToppings.map((tId) => toppingsList.find((t) => t.id === tId)?.name).filter(Boolean);
    const dressingObj = dressingsList.find((d) => d.id === selectedDressing);

    const customizedDescription = [
      baseObj ? `Base: ${baseObj.name}` : null,
      proteinsObj.length > 0 ? `Protein: ${proteinsObj.join(', ')}` : null,
      toppingsObj.length > 0 ? `Toppings: ${toppingsObj.join(', ')}` : null,
      dressingObj ? `Dressing: ${dressingObj.name}` : null,
    ]
      .filter(Boolean)
      .join(' • ');

    const cartItem = {
      id: `custom_${item.id}_${Date.now()}`,
      baseId: item.id,
      name: `${item.name} (Custom)`,
      price: currentUnitPrice,
      basePrice: item.price,
      desc: customizedDescription,
      image: item.image,
      tags: [
        { text: `${currentCalories} kcal`, isGreen: true },
        { text: `${currentProtein}g Protein`, isGreen: true },
      ],
      customizations: {
        base: baseObj?.name,
        proteins: proteinsObj,
        toppings: toppingsObj,
        dressing: dressingObj?.name,
        notes: instructions,
      },
      calories: currentCalories,
      protein: currentProtein,
      allergens: activeAllergens,
      quantity,
    };

    addItem(cartItem);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 800);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <Image
              src={item.image}
              alt={item.name}
              width={54}
              height={54}
              className={styles.headerThumb}
            />
            <div>
              <h2 className={styles.headerTitle}>Customize {item.name}</h2>
              <p className={styles.headerSubtitle}>
                Base bowl starts at ₹{item.price} • Live dietary &amp; allergen calculator
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close customizer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Live Nutrition & Allergen Status Bar */}
        <div className={styles.liveStatsBar}>
          <div className={styles.statsGroup}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>🔥 Energy:</span>
              <span className={styles.statValue}>{currentCalories} kcal</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>💪 Protein:</span>
              <span className={styles.statValue}>{currentProtein}g</span>
            </div>
          </div>

          <div>
            {activeAllergens.length === 0 ? (
              <span className={`${styles.allergenStatusBadge} ${styles.allergenSafe}`}>
                ✓ Zero Common Allergens
              </span>
            ) : (
              <span className={`${styles.allergenStatusBadge} ${styles.allergenWarning}`}>
                ⚠️ Contains: {activeAllergens.slice(0, 3).join(', ')}
                {activeAllergens.length > 3 ? ` +${activeAllergens.length - 3}` : ''}
              </span>
            )}
          </div>
        </div>

        {/* Customization Options Body */}
        <div className={styles.modalBody}>
          {/* Step 1: Base Selection (Single choice) */}
          <div className={styles.customSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                1. Choose Your Base Grain / Greens
                <span className={styles.requiredBadge}>Required</span>
              </h3>
            </div>
            <div className={styles.optionsGrid}>
              {basesList.map((base) => {
                const isSelected = selectedBase === base.id;
                return (
                  <div
                    key={base.id}
                    className={`${styles.optionCard} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => setSelectedBase(base.id)}
                  >
                    <div className={styles.radioCircle}>
                      {isSelected && <div className={styles.circleDot} />}
                    </div>
                    <div className={styles.optionDetails}>
                      <span className={styles.optionName}>{base.name}</span>
                      <div className={styles.optionMeta}>
                        <span className={styles.optionCalories}>{base.calories} kcal</span>
                        <span className={styles.optionPrice}>
                          {base.price > 0 ? `+₹${base.price}` : 'Free'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Protein Boost (Multi-select, up to 2) */}
          <div className={styles.customSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                2. Extra Protein Boost
                <span className={styles.optionalBadge}>Optional (Max 2)</span>
              </h3>
            </div>
            <div className={styles.optionsGrid}>
              {proteinsList.map((protein) => {
                const isSelected = selectedProteins.includes(protein.id);
                return (
                  <div
                    key={protein.id}
                    className={`${styles.optionCard} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => toggleProtein(protein.id)}
                  >
                    <div className={styles.checkboxSquare}>
                      {isSelected && (
                        <svg className={styles.checkMark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div className={styles.optionDetails}>
                      <span className={styles.optionName}>{protein.name}</span>
                      <div className={styles.optionMeta}>
                        <span className={styles.optionCalories}>
                          +{protein.calories} kcal • {protein.protein}g protein
                        </span>
                        <span className={styles.optionPrice}>+₹{protein.price}</span>
                      </div>
                      {protein.allergens?.length > 0 && (
                        <span className={styles.optionAllergenTag}>
                          Contains: {protein.allergens.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Veggie & Superfood Add-Ons (Multi-select, up to 4) */}
          <div className={styles.customSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                3. Veggies &amp; Superfood Add-Ons
                <span className={styles.optionalBadge}>Optional (Max 4)</span>
              </h3>
            </div>
            <div className={styles.optionsGrid}>
              {toppingsList.map((topping) => {
                const isSelected = selectedToppings.includes(topping.id);
                return (
                  <div
                    key={topping.id}
                    className={`${styles.optionCard} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => toggleTopping(topping.id)}
                  >
                    <div className={styles.checkboxSquare}>
                      {isSelected && (
                        <svg className={styles.checkMark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div className={styles.optionDetails}>
                      <span className={styles.optionName}>{topping.name}</span>
                      <div className={styles.optionMeta}>
                        <span className={styles.optionCalories}>+{topping.calories} kcal</span>
                        <span className={styles.optionPrice}>+₹{topping.price}</span>
                      </div>
                      {topping.allergens?.length > 0 && (
                        <span className={styles.optionAllergenTag}>
                          Contains: {topping.allergens.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Dressing Selection (Single choice) */}
          <div className={styles.customSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                4. Select Signature Dressing
                <span className={styles.requiredBadge}>Required</span>
              </h3>
            </div>
            <div className={styles.optionsGrid}>
              {dressingsList.map((dressing) => {
                const isSelected = selectedDressing === dressing.id;
                return (
                  <div
                    key={dressing.id}
                    className={`${styles.optionCard} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => setSelectedDressing(dressing.id)}
                  >
                    <div className={styles.radioCircle}>
                      {isSelected && <div className={styles.circleDot} />}
                    </div>
                    <div className={styles.optionDetails}>
                      <span className={styles.optionName}>{dressing.name}</span>
                      <div className={styles.optionMeta}>
                        <span className={styles.optionCalories}>+{dressing.calories} kcal</span>
                        <span className={styles.optionPrice}>
                          {dressing.price > 0 ? `+₹${dressing.price}` : 'Free'}
                        </span>
                      </div>
                      {dressing.allergens?.length > 0 && (
                        <span className={styles.optionAllergenTag}>
                          Contains: {dressing.allergens.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 5: Special Cooking & Dietary Notes */}
          <div className={styles.customSection}>
            <h3 className={styles.sectionTitle}>5. Special Dietary Instructions / Cooking Notes</h3>
            <textarea
              className={styles.instructionsInput}
              placeholder="e.g. Please put dressing on the side, extra crispy chickpeas, severe nut allergy..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Modal Footer with Live Quantity and Dynamic Price */}
        <div className={styles.modalFooter}>
          <div className={styles.footerLeft}>
            {/* Quantity Stepper */}
            <div className={styles.quantityStepper}>
              <button
                type="button"
                className={styles.stepperBtn}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className={styles.stepperCount}>{quantity}</span>
              <button
                type="button"
                className={styles.stepperBtn}
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className={styles.totalSummary}>
              <span className={styles.totalLabel}>Customized Total</span>
              <span className={styles.totalAmount}>₹{totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
          >
            {showToast ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added to Cart!
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add Customized Bowl • ₹{totalPrice}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
