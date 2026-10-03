'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './MenuHeroSection.module.css';

const galleryImages = [
  { id: 1, src: '/quinoa-power-bowl.jpg', alt: 'Quinoa Power Bowl Main View' },
  { id: 2, src: '/grilled-chicken-salad.jpg', alt: 'Grilled Chicken Salad' },
  { id: 3, src: '/dark-bowl-salad.jpg', alt: 'Dark Bowl Salad' },
  { id: 4, src: '/mediterranean-bowl.jpg', alt: 'Mediterranean Bowl' },
  { id: 5, src: '/hero-food.jpg', alt: 'Food Preparation Video', isVideo: true },
];

const features = [
  {
    id: 1,
    title: 'Fresh Ingredients',
    desc: 'Made with natural, quality ingredients',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-9 9-9 4.5 0 7 2 7 7a7 7 0 0 1-9 9z" />
        <path d="M12 10a4 4 0 0 0-4 4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Healthy Choices',
    desc: 'Nutritious and balanced meals',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#ea580c" stroke="#ea580c" strokeWidth="1">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Allergen Info',
    desc: 'Clearly marked allergens',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#16a34a">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Customizable',
    desc: 'Make it your way',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Quick Delivery',
    desc: '25–35 mins',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#ea580c">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

const initialMenuItems = [
  {
    id: 1,
    name: 'Quinoa Power Bowl',
    price: 249,
    desc: 'Quinoa, roasted veggies, avocado, seeds.',
    image: '/quinoa-power-bowl.jpg',
    category: 'bowls',
    tags: [
      { text: 'Vegan', type: 'vegan' },
      { text: 'Gluten Free', type: 'glutenFree' },
    ],
  },
  {
    id: 2,
    name: 'Grilled Chicken Salad',
    price: 269,
    desc: 'Chicken, mixed greens, cherry tomatoes, olive oil.',
    image: '/grilled-chicken-salad.jpg',
    category: 'salads',
    tags: [
      { text: 'High Protein', type: 'highProtein' },
      { text: 'Nut Free', type: 'nutFree' },
    ],
  },
  {
    id: 3,
    name: 'Avocado Wrap',
    price: 199,
    desc: 'Avocado, fresh greens, hummus, whole wheat wrap.',
    image: '/avocado-wrap.jpg',
    category: 'wraps',
    tags: [
      { text: 'Vegan', type: 'vegan' },
      { text: 'Dairy Free', type: 'dairyFree' },
    ],
  },
];

export default function MenuHeroSection() {
  const [selectedImg, setSelectedImg] = useState('/quinoa-power-bowl.jpg');
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('all');
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1 });

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const filteredMenuItems = initialMenuItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        {/* Breadcrumb Row */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <a href="#" className={styles.breadcrumbLink}>Home</a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <a href="/restaurants" className={styles.breadcrumbLink}>Restaurants</a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <a href="#" className={styles.breadcrumbLink}>The Green Bowl</a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>Quinoa Power Bowl</span>
        </nav>

        {/* Main Two-Column Layout */}
        <div className={styles.mainGrid}>
          {/* ================= LEFT COLUMN ================= */}
          <div className={styles.leftColumn}>
            {/* Big Hero Image */}
            <div className={styles.heroImageCard}>
              <div className={styles.heroImageWrapper}>
                <Image
                  src={selectedImg}
                  alt="Selected dish preview"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 560px"
                  className={styles.heroMainImage}
                />
              </div>

              {/* Floating Action Buttons */}
              <button className={styles.backButton} aria-label="Go Back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>

              <div className={styles.topRightActions}>
                <button
                  className={`${styles.actionCircleBtn} ${isLiked ? styles.liked : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                  aria-label="Save to favorites"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? '#ef4444' : 'none'} stroke={isLiked ? '#ef4444' : '#1f2937'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <button className={styles.actionCircleBtn} aria-label="Share dish">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className={styles.thumbnailsRow}>
              {galleryImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImg(img.src)}
                  className={`${styles.thumbBtn} ${selectedImg === img.src ? styles.thumbActive : ''}`}
                  aria-label={img.alt}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={96}
                    height={68}
                    className={styles.thumbImg}
                  />
                  {img.isVideo && (
                    <div className={styles.playOverlay}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Feature Highlights Badges */}
            <div className={styles.featuresRow}>
              {features.map((feat) => (
                <div key={feat.id} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feat.icon}</div>
                  <h4 className={styles.featureTitle}>{feat.title}</h4>
                  <p className={styles.featureDesc}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className={styles.rightColumn}>
            {/* Title & Rating Header */}
            <div className={styles.restaurantHeader}>
              <h1 className={styles.restaurantName}>The Green Bowl</h1>
              <div className={styles.ratingBadge}>
                <span className={styles.starIcon}>★</span>
                <span className={styles.ratingScore}>4.5</span>
                <span className={styles.ratingCount}>(2K+)</span>
              </div>
            </div>

            {/* Cuisines Tagline */}
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-9 9-9 4.5 0 7 2 7 7a7 7 0 0 1-9 9z" />
                  <path d="M12 10a4 4 0 0 0-4 4" />
                </svg>
                Healthy
              </span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                Continental
              </span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h20" />
                  <path d="M20 12v8H4v-8" />
                  <path d="M12 2a5 5 0 0 0-5 5v5h10V7a5 5 0 0 0-5-5z" />
                </svg>
                Salad
              </span>
            </div>

            {/* Delivery Info */}
            <div className={styles.deliveryInfoRow}>
              <span className={styles.deliveryItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                25–35 mins
              </span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.deliveryItem}>₹300 for two</span>
            </div>

            {/* Description */}
            <p className={styles.description}>
              A fresh and nutritious bowl packed with quinoa, grilled chicken, avocado, colorful
              vegetables and house dressing. Perfect for a healthy and balanced meal.
            </p>

            {/* Section Tabs */}
            <div className={styles.tabsRow}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'menu' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                Menu
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'about' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (2K+)
              </button>
            </div>

            {/* Categories Pills */}
            <div className={styles.categoriesTrack}>
              {['all', 'salads', 'bowls', 'wraps', 'drinks'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.categoryPill} ${activeCategory === cat ? styles.categoryPillActive : ''}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <div className={styles.menuItemsList}>
              {filteredMenuItems.map((item) => (
                <div key={item.id} className={styles.menuItemCard}>
                  {/* Dish Thumbnail */}
                  <div className={styles.itemImgWrapper}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={86}
                      height={86}
                      className={styles.itemImg}
                    />
                  </div>

                  {/* Dish Info */}
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitleRow}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <span className={styles.itemPrice}>₹{item.price}</span>
                    </div>
                    <p className={styles.itemDesc}>{item.desc}</p>

                    {/* Dietary Tags */}
                    <div className={styles.tagsRow}>
                      {item.tags.map((tag, i) => {
                        const isGreen = tag.type === 'vegan' || tag.type === 'glutenFree';
                        return (
                          <span
                            key={i}
                            className={isGreen ? styles.tagGreen : styles.tagOrange}
                          >
                            <span className={styles.tagDot}>●</span>
                            {tag.text}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Actions: Stepper + Add to Cart */}
                  <div className={styles.itemActions}>
                    <div className={styles.stepper}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className={styles.stepperBtn}
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className={styles.stepperValue}>{quantities[item.id] || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className={styles.stepperBtn}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button className={styles.addToCartBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
