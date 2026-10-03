'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { foodItems } from '@/lib/foodData';
import { useCart } from '@/context/CartContext';
import FoodCustomizationModal from './FoodCustomizationModal';
import styles from './IngredientsDetail.module.css';

const gallery = [
  { id: 1, src: '/quinoa-power-bowl.jpg', alt: 'Quinoa Power Bowl' },
  { id: 2, src: '/chicken-protein-bowl.jpg', alt: 'Chicken Bowl' },
  { id: 3, src: '/dark-bowl-salad.jpg', alt: 'Dark Bowl Salad' },
  { id: 4, src: '/mediterranean-bowl.jpg', alt: 'Mediterranean Bowl' },
  { id: 5, src: '/hero-food.jpg', alt: 'Preparation Video', isVideo: true },
];

const allergenSensitivityOptions = [
  { id: 'sesame', label: 'Sesame' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'dairy', label: 'Dairy / Lactose' },
  { id: 'nuts', label: 'Tree Nuts & Peanuts' },
  { id: 'soy', label: 'Soy' },
  { id: 'eggs', label: 'Eggs' },
];

export default function IngredientsDetail() {
  const item = foodItems[0]; // Quinoa Power Bowl Live Data
  const { addItem } = useCart();

  const [selectedImg, setSelectedImg] = useState('/quinoa-power-bowl.jpg');
  const [isFavorite, setIsFavorite] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [nutritionOpen, setNutritionOpen] = useState(true);
  const [allergenOpen, setAllergenOpen] = useState(true);

  // Live Ingredient selection
  const [selectedIngredient, setSelectedIngredient] = useState(item.ingredients[0]);

  // Interactive Allergen Safety Checker State
  const [activeAllergies, setActiveAllergies] = useState(['sesame']);

  // Food Customization Flow Modal
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleAllergyFilter = (id) => {
    setActiveAllergies((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Live Allergen Safety Status Evaluation
  const getAllergenAssessment = () => {
    if (activeAllergies.length === 0) {
      return {
        safe: true,
        text: 'Select your sensitivities above to check real-time safety for this dish.',
      };
    }

    const conflicts = [];
    if (activeAllergies.includes('sesame')) {
      conflicts.push('Sesame (in Lemon Tahini dressing)');
    }
    if (activeAllergies.includes('nuts')) {
      // Dish has seeds, some nut-allergic patients avoid seeds
      conflicts.push('Pumpkin & Chia Seeds (seed mix)');
    }

    if (conflicts.length > 0) {
      return {
        safe: false,
        text: `Notice: This dish contains ${conflicts.join(', ')}. Use our Customizer to swap or omit them!`,
      };
    }

    return {
      safe: true,
      text: `✓ 100% Safe! This dish is naturally free from your selected sensitivities.`,
    };
  };

  const allergenStatus = getAllergenAssessment();
  const totalPrice = item.price * quantity;

  const handleQuickAddToCart = () => {
    addItem({
      id: item.id,
      baseId: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      desc: item.tagline,
      image: item.image,
      tags: [
        { text: 'Vegan', isGreen: true },
        { text: 'Gluten Free', isGreen: true },
      ],
      calories: item.nutrition.calories,
      protein: item.nutrition.protein,
      allergens: ['Sesame'],
      quantity,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* ================= LEFT COLUMN ================= */}
          <div className={styles.leftCol}>
            {/* Main Dish Hero Image */}
            <div className={styles.mainImageCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={selectedImg}
                  alt={item.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 580px"
                  className={styles.mainImg}
                />
              </div>

              {/* Floating Back Button */}
              <Link href="/menu" className={styles.backBtn} aria-label="Go Back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </Link>

              {/* Floating Heart Button */}
              <button
                className={styles.heartBtn}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? '#ef4444' : 'none'} stroke={isFavorite ? '#ef4444' : '#ef4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className={styles.thumbnailsRow}>
              {gallery.map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => setSelectedImg(thumb.src)}
                  className={`${styles.thumbBtn} ${selectedImg === thumb.src ? styles.thumbActive : ''}`}
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    width={100}
                    height={72}
                    className={styles.thumbImg}
                  />
                  {thumb.isVideo && (
                    <div className={styles.videoBadge}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Interactive Allergen Safety Checker Card */}
            <div className={styles.allergenFilterSection}>
              <div className={styles.checkerHeader}>
                <h4 className={styles.checkerTitle}>
                  <span>🛡️</span> Check Your Allergies &amp; Sensitivities
                </h4>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>
                Tap your dietary restrictions to preview live safety indicators:
              </p>
              <div className={styles.chipsContainer}>
                {allergenSensitivityOptions.map((chip) => {
                  const isActive = activeAllergies.includes(chip.id);
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      className={`${styles.allergyChip} ${isActive ? styles.allergyChipActive : ''}`}
                      onClick={() => toggleAllergyFilter(chip.id)}
                    >
                      {isActive ? '✓ ' : '+ '}
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* Status Box */}
              <div
                className={`${styles.allergyStatusBox} ${
                  allergenStatus.safe ? styles.allergyStatusSafe : styles.allergyStatusWarn
                }`}
              >
                <span>{allergenStatus.safe ? '🟢' : '⚠️'}</span>
                <span>{allergenStatus.text}</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className={styles.rightCol}>
            {/* Header: Title and Price */}
            <div className={styles.titlePriceRow}>
              <h1 className={styles.title}>{item.name}</h1>
              <span className={styles.price}>₹{item.price}</span>
            </div>

            {/* Rating & Prep Time */}
            <div className={styles.ratingRow}>
              <span className={styles.star}>★</span>
              <span className={styles.ratingScore}>{item.rating}</span>
              <span className={styles.reviewsCount}>({item.reviewsCount} reviews)</span>
              <span style={{ margin: '0 8px', color: '#cbd5e1' }}>•</span>
              <span style={{ color: '#059669', fontWeight: 600, fontSize: '13px' }}>⏱ {item.prepTime}</span>
            </div>

            {/* Description */}
            <p className={styles.description}>{item.description}</p>

            {/* Dietary Badges */}
            <div className={styles.tagsRow} style={{ flexWrap: 'wrap' }}>
              {item.dietaryBadges.map((badge) => (
                <span
                  key={badge.id}
                  style={{
                    backgroundColor: badge.bg,
                    color: badge.color,
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Ingredients Information Section (Live Clickable Ingredients) */}
            <div className={styles.ingredientsSection}>
              <div className={styles.ingredientsHeader}>
                <h3 className={styles.ingredientsTitle}>
                  Interactive Ingredient Breakdown
                </h3>
                <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                  Tap any ingredient for source &amp; benefits
                </span>
              </div>

              {/* Circular Ingredient Items */}
              <div className={styles.ingredientsRow}>
                {item.ingredients.map((ing) => {
                  const isSelected = selectedIngredient?.id === ing.id;
                  return (
                    <div key={ing.id} className={styles.ingredientItem}>
                      <button
                        type="button"
                        className={styles.ingredientCircleBtn}
                        onClick={() => setSelectedIngredient(ing)}
                      >
                        <div
                          className={`${styles.ingredientCircle} ${
                            isSelected ? styles.ingredientActive : ''
                          }`}
                        >
                          <span className={styles.ingredientEmoji}>{ing.icon}</span>
                        </div>
                        <span className={styles.ingredientName}>{ing.name}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Expanded Selected Ingredient Card */}
              {selectedIngredient && (
                <div className={styles.activeIngredientCard}>
                  <div className={styles.activeIngHeader}>
                    <h4 className={styles.activeIngTitle}>
                      <span>{selectedIngredient.icon}</span>
                      {selectedIngredient.name}
                    </h4>
                    <span className={styles.activeIngCategory}>
                      {selectedIngredient.category}
                    </span>
                  </div>

                  <p className={styles.activeIngBenefit}>
                    {selectedIngredient.benefit}
                  </p>

                  <div className={styles.activeIngMeta}>
                    <div className={styles.activeIngOrigin}>
                      <span>📍 Origin:</span> {selectedIngredient.origin}
                    </div>
                    <div>
                      ⚡ {selectedIngredient.calories} kcal • {selectedIngredient.protein}g protein
                    </div>
                    {selectedIngredient.certifications?.map((c, i) => (
                      <span key={i} className={styles.certBadge}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accordions */}
            <div className={styles.accordions}>
              {/* Nutrition Information Accordion */}
              <div className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => setNutritionOpen(!nutritionOpen)}
                  aria-expanded={nutritionOpen}
                >
                  <span className={styles.accordionTitle}>
                    Detailed Nutrition Facts ({item.nutrition.servingSize})
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={nutritionOpen ? styles.arrowOpen : styles.arrow}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {nutritionOpen && (
                  <div className={styles.accordionContent}>
                    {/* Macro Cards */}
                    <div className={styles.macroBarsRow}>
                      <div className={styles.macroCard}>
                        <span className={styles.macroName}>Calories</span>
                        <span className={styles.macroValue}>{item.nutrition.calories} kcal</span>
                      </div>
                      <div className={styles.macroCard}>
                        <span className={styles.macroName}>Protein</span>
                        <span className={styles.macroValue}>{item.nutrition.protein}g</span>
                      </div>
                      <div className={styles.macroCard}>
                        <span className={styles.macroName}>Carbs</span>
                        <span className={styles.macroValue}>{item.nutrition.carbs}g</span>
                      </div>
                      <div className={styles.macroCard}>
                        <span className={styles.macroName}>Healthy Fats</span>
                        <span className={styles.macroValue}>{item.nutrition.fats}g</span>
                      </div>
                    </div>

                    <p style={{ margin: '6px 0', fontSize: '12.5px', color: '#475569' }}>
                      Dietary Fiber: <strong>{item.nutrition.fiber}g</strong> • Sodium: <strong>{item.nutrition.sodium}mg</strong> • Natural Sugars: <strong>{item.nutrition.sugar}g</strong>
                    </p>

                    {/* Micronutrient grid */}
                    <div className={styles.microGrid}>
                      {item.nutrition.micronutrients.map((micro, idx) => (
                        <div key={idx} className={styles.microItem}>
                          <span className={styles.microName}>{micro.name}</span>
                          <span className={styles.microVal}>
                            {micro.value} ({micro.dv})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Allergen Information Accordion */}
              <div className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => setAllergenOpen(!allergenOpen)}
                  aria-expanded={allergenOpen}
                >
                  <span className={styles.accordionTitle}>
                    Allergen Matrix &amp; Cross-Contact Policy
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={allergenOpen ? styles.arrowOpen : styles.arrow}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {allergenOpen && (
                  <div className={styles.accordionContent}>
                    <div className={styles.allergenBoxesContainer}>
                      <div className={styles.allergenGroup}>
                        <span className={styles.allergenGroupTitle}>⚠️ Contains Allergens</span>
                        <div className={styles.allergenBadgesList}>
                          {item.allergens.contains.map((c, idx) => (
                            <span key={idx} className={styles.badgeContains}>
                              {c.icon} {c.name} ({c.note})
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.allergenGroup}>
                        <span className={styles.allergenGroupTitle}>🛡️ 100% Free From</span>
                        <div className={styles.allergenBadgesList}>
                          {item.allergens.freeFrom.map((f, idx) => (
                            <span key={idx} className={styles.badgeFreeFrom}>
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className={styles.allergenNotice}>
                        {item.allergens.crossContactNote}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Stepper, Add to Cart & Food Customization Flow */}
            <div className={styles.actionsRow}>
              {/* Quantity Stepper */}
              <div className={styles.stepper}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className={styles.stepperBtn}
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className={styles.stepperValue}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className={styles.stepperBtn}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add Standard Bowl to Cart */}
              <button
                type="button"
                onClick={handleQuickAddToCart}
                className={styles.addToCartBtn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Add • ₹{totalPrice}</span>
              </button>

              {/* Customize Flow Button */}
              <button
                type="button"
                className={styles.customizeBtn}
                onClick={() => setIsCustomizerOpen(true)}
              >
                <span>✨ Customize Bowl</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Customization Modal / Drawer */}
      <FoodCustomizationModal
        item={item}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />

      {/* Floating Add to Cart Toast */}
      {showToast && (
        <div className={styles.addedToast}>
          <span>✓ Added to cart!</span>
          <Link href="/checkout" style={{ color: '#86efac', textDecoration: 'underline', marginLeft: '6px' }}>
            View Cart →
          </Link>
        </div>
      )}
    </section>
  );
}
