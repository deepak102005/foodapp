'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './IngredientsDetail.module.css';

const gallery = [
  { id: 1, src: '/quinoa-power-bowl.jpg', alt: 'Quinoa Power Bowl' },
  { id: 2, src: '/chicken-protein-bowl.jpg', alt: 'Chicken Bowl' },
  { id: 3, src: '/dark-bowl-salad.jpg', alt: 'Dark Bowl Salad' },
  { id: 4, src: '/mediterranean-bowl.jpg', alt: 'Mediterranean Bowl' },
  { id: 5, src: '/hero-food.jpg', alt: 'Preparation Video', isVideo: true },
];

const ingredientsList = [
  { id: 1, name: 'Quinoa', icon: '🥣' },
  { id: 2, name: 'Avocado', icon: '🥑' },
  { id: 3, name: 'Broccoli', icon: '🥦' },
  { id: 4, name: 'Carrot', icon: '🥕' },
  { id: 5, name: 'Cherry Tomatoes', icon: '🍅' },
  { id: 6, name: 'Seeds', icon: '🌰' },
  { id: 7, name: 'Mixed Greens', icon: '🥬' },
];

export default function IngredientsDetail() {
  const [selectedImg, setSelectedImg] = useState('/quinoa-power-bowl.jpg');
  const [isFavorite, setIsFavorite] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [allergenOpen, setAllergenOpen] = useState(false);

  const pricePerItem = 249;
  const totalPrice = pricePerItem * quantity;

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
                  alt="Quinoa Power Bowl"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 580px"
                  className={styles.mainImg}
                />
              </div>

              {/* Floating Back Button */}
              <button className={styles.backBtn} aria-label="Go Back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>

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
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className={styles.rightCol}>
            {/* Header: Title and Price */}
            <div className={styles.titlePriceRow}>
              <h1 className={styles.title}>Quinoa Power Bowl</h1>
              <span className={styles.price}>₹{pricePerItem}</span>
            </div>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <span className={styles.star}>★</span>
              <span className={styles.ratingScore}>4.6</span>
              <span className={styles.reviewsCount}>(320 reviews)</span>
            </div>

            {/* Description */}
            <p className={styles.description}>
              A nutritious bowl with quinoa, roasted vegetables, avocado, seeds and house dressing.
            </p>

            {/* Dietary Tags */}
            <div className={styles.tagsRow}>
              <span className={styles.tagVegan}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-9 9-9 4.5 0 7 2 7 7a7 7 0 0 1-9 9z" />
                  <path d="M12 10a4 4 0 0 0-4 4" />
                </svg>
                Vegan
              </span>
              <span className={styles.tagGluten}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Gluten Free
              </span>
              <span className={styles.tagFiber}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h20" />
                  <path d="M20 12v8H4v-8" />
                  <path d="M12 2a5 5 0 0 0-5 5v5h10V7a5 5 0 0 0-5-5z" />
                </svg>
                High Fiber
              </span>
            </div>

            {/* Ingredients Section */}
            <div className={styles.ingredientsSection}>
              <div className={styles.ingredientsHeader}>
                <h3 className={styles.ingredientsTitle}>Ingredients</h3>
                <a href="#" className={styles.viewAllIngredients}>
                  <span>View All</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* Circular Ingredient Items */}
              <div className={styles.ingredientsRow}>
                {ingredientsList.map((ing) => (
                  <div key={ing.id} className={styles.ingredientItem}>
                    <div className={styles.ingredientCircle}>
                      <span className={styles.ingredientEmoji}>{ing.icon}</span>
                    </div>
                    <span className={styles.ingredientName}>{ing.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordions */}
            <div className={styles.accordions}>
              {/* Nutrition Information */}
              <div className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => setNutritionOpen(!nutritionOpen)}
                  aria-expanded={nutritionOpen}
                >
                  <span className={styles.accordionTitle}>Nutrition Information</span>
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
                    <p>Calories: 450 kcal • Protein: 18g • Carbs: 52g • Healthy Fats: 14g</p>
                  </div>
                )}
              </div>

              {/* Allergen Information */}
              <div className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => setAllergenOpen(!allergenOpen)}
                  aria-expanded={allergenOpen}
                >
                  <span className={styles.accordionTitle}>Allergen Information</span>
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
                    <p>Contains: Sesame seeds. Free from Dairy, Gluten, and Peanuts.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Stepper and Add to Cart */}
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

              {/* Add to Cart Button */}
              <button className={styles.addToCartBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Add to Cart • ₹{totalPrice}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
