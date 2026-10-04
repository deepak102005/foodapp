'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getFoodItemById, getRestaurantById, foodItems } from '@/lib/foodData';
import { useCart } from '@/context/CartContext';
import FoodCustomizationModal from './FoodCustomizationModal';
import styles from './IngredientsDetail.module.css';

const allergenSensitivityOptions = [
  { id: 'sesame', label: 'Sesame' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'dairy', label: 'Dairy / Lactose' },
  { id: 'nuts', label: 'Tree Nuts & Peanuts' },
  { id: 'soy', label: 'Soy' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'garlic', label: 'Onion & Garlic' },
  { id: 'shellfish', label: 'Shellfish / Fish' },
];

function IngredientsDetailInner() {
  const searchParams = useSearchParams();
  const itemParam = searchParams.get('item') || searchParams.get('id') || 'quinoa-power-bowl';
  
  const item = getFoodItemById(itemParam) || foodItems[0];
  const restaurant = getRestaurantById(item.restaurantId || 'the-green-bowl');

  const { addItem } = useCart();

  const [selectedImg, setSelectedImg] = useState(item.image);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [nutritionOpen, setNutritionOpen] = useState(true);
  const [allergenOpen, setAllergenOpen] = useState(true);

  // Live Ingredient selection
  const [selectedIngredient, setSelectedIngredient] = useState(
    item.ingredients && item.ingredients.length > 0 ? item.ingredients[0] : null
  );

  // Interactive Allergen Safety Checker State
  const [activeAllergies, setActiveAllergies] = useState([]);

  // Food Customization Flow Modal
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Sync state when item changes
  useEffect(() => {
    setSelectedImg(item.image);
    setSelectedIngredient(item.ingredients && item.ingredients.length > 0 ? item.ingredients[0] : null);
    setQuantity(1);
  }, [item]);

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
    const itemContainsNames = (item.allergens?.contains || []).map((c) => c.name.toLowerCase());

    activeAllergies.forEach((allergy) => {
      if (allergy === 'sesame' && itemContainsNames.some((n) => n.includes('sesame'))) {
        conflicts.push('Sesame (in dressing/garnishes)');
      }
      if (allergy === 'gluten' && (itemContainsNames.some((n) => n.includes('gluten') || n.includes('wheat')) || !item.dietaryFlags?.isGlutenFree)) {
        conflicts.push('Gluten / Wheat');
      }
      if (allergy === 'dairy' && (itemContainsNames.some((n) => n.includes('dairy') || n.includes('milk') || n.includes('cheese') || n.includes('ghee') || n.includes('paneer')) || !item.dietaryFlags?.isDairyFree)) {
        conflicts.push('Dairy / Milk Products');
      }
      if (allergy === 'nuts' && (itemContainsNames.some((n) => n.includes('nut') || n.includes('cashew') || n.includes('walnut') || n.includes('peanut')) || !item.dietaryFlags?.isNutFree)) {
        conflicts.push('Tree Nuts / Peanuts');
      }
      if (allergy === 'soy' && itemContainsNames.some((n) => n.includes('soy'))) {
        conflicts.push('Soy Sauce / Edamame');
      }
      if (allergy === 'eggs' && itemContainsNames.some((n) => n.includes('egg'))) {
        conflicts.push('Eggs');
      }
      if (allergy === 'shellfish' && itemContainsNames.some((n) => n.includes('shellfish') || n.includes('fish'))) {
        conflicts.push('Shellfish');
      }
      if (allergy === 'garlic' && itemContainsNames.some((n) => n.includes('garlic') || n.includes('onion'))) {
        conflicts.push('Onion & Garlic');
      }
    });

    if (conflicts.length > 0) {
      return {
        safe: false,
        text: `Notice: This dish contains ${conflicts.join(', ')}. Use our Customizer to swap or omit ingredients!`,
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
      id: `ing_${item.id}`,
      baseId: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      desc: item.tagline || item.description,
      image: item.image,
      tags: item.dietaryBadges?.map((b) => ({ text: b.label, isGreen: true })) || [
        { text: 'Fresh Prep', isGreen: true },
      ],
      calories: item.nutrition?.calories,
      protein: item.nutrition?.protein,
      quantity,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Gallery items
  const gallery = [
    { id: 1, src: item.image, alt: item.name },
    ...(restaurant.galleryImages ? restaurant.galleryImages.slice(1, 4) : []),
    { id: 99, src: '/hero-food.jpg', alt: 'Kitchen Prep Video', isVideo: true },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Breadcrumb Row */}
        <nav className={styles.breadcrumb} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
          <span>&gt;</span>
          <Link href="/restaurants" style={{ color: '#64748b', textDecoration: 'none' }}>Restaurants</Link>
          <span>&gt;</span>
          <Link href={`/menu?restaurant=${restaurant.id}`} style={{ color: '#64748b', textDecoration: 'none' }}>
            {restaurant.name}
          </Link>
          <span>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>{item.name}</span>
        </nav>

        <div className={styles.grid}>
          {/* ================= LEFT COLUMN ================= */}
          <div className={styles.leftCol}>
            {/* Main Dish Hero Image */}
            <div className={styles.mainImageCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={selectedImg || item.image}
                  alt={item.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 580px"
                  className={styles.mainImg}
                />
              </div>

              {/* Floating Back Button */}
              <Link
                href={`/menu?restaurant=${restaurant.id}`}
                className={styles.backBtn}
                aria-label={`Back to ${restaurant.name} Menu`}
              >
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
              <div>
                <h1 className={styles.title}>{item.name}</h1>
                <Link
                  href={`/menu?restaurant=${restaurant.id}`}
                  style={{ fontSize: '13px', color: '#059669', fontWeight: 600, textDecoration: 'none' }}
                >
                  📍 by {restaurant.name} ({restaurant.cuisines?.join(', ')})
                </Link>
              </div>
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
              {(item.dietaryBadges || []).map((badge) => (
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
            {item.ingredients && item.ingredients.length > 0 && (
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
            )}

            {/* Accordions */}
            <div className={styles.accordions}>
              {/* Nutrition Information Accordion */}
              {item.nutrition && (
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
                      {item.nutrition.micronutrients && (
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
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Allergen Information Accordion */}
              {item.allergens && (
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
                        {item.allergens.contains && item.allergens.contains.length > 0 && (
                          <div className={styles.allergenGroup}>
                            <span className={styles.allergenGroupTitle}>⚠️ Contains Allergens</span>
                            <div className={styles.allergenBadgesList}>
                              {item.allergens.contains.map((c, idx) => (
                                <span key={idx} className={styles.badgeContains}>
                                  {c.icon} {c.name} {c.note ? `(${c.note})` : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.allergens.freeFrom && item.allergens.freeFrom.length > 0 && (
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
                        )}

                        <p className={styles.allergenNotice}>
                          {item.allergens.crossContactNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
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

              {/* Add Standard Dish to Cart */}
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
                <span>✨ Customize Dish</span>
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

export default function IngredientsDetail() {
  return (
    <Suspense fallback={<div style={{ minHeight: '600px', backgroundColor: '#ffffff' }} />}>
      <IngredientsDetailInner />
    </Suspense>
  );
}
