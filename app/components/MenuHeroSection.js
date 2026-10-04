'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getRestaurantById, getFoodItemsByRestaurant, getFoodItemById } from '@/lib/foodData';
import { useCart } from '@/context/CartContext';
import FoodCustomizationModal from './FoodCustomizationModal';
import styles from './MenuHeroSection.module.css';

const defaultFeatures = [
  {
    id: 1,
    title: 'Fresh Ingredients',
    desc: 'Farm-sourced & pesticide-free',
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
    desc: 'Transparent macro & calorie counts',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#ea580c" stroke="#ea580c" strokeWidth="1">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Allergen Safe',
    desc: 'Clearly marked allergen matrices',
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
    desc: 'Swap proteins, bases & dressings',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Express Delivery',
    desc: 'Hot & fresh in 25–35 mins',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#ea580c">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

function MenuHeroSectionInner() {
  const searchParams = useSearchParams();
  const restaurantParam = searchParams.get('restaurant') || searchParams.get('id') || 'the-green-bowl';
  
  const restaurant = getRestaurantById(restaurantParam);
  const restaurantMenuItems = getFoodItemsByRestaurant(restaurant.id);

  const { addItem } = useCart();
  const [selectedImg, setSelectedImg] = useState(
    restaurant.galleryImages?.[0]?.src || restaurant.image || '/quinoa-power-bowl.jpg'
  );
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [customizingItem, setCustomizingItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Sync selected image when restaurant changes
  useEffect(() => {
    setSelectedImg(restaurant.galleryImages?.[0]?.src || restaurant.image || '/quinoa-power-bowl.jpg');
    setActiveCategory('all');
  }, [restaurant]);

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 1;
    addItem({
      id: `menu_${item.id}`,
      baseId: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      desc: item.tagline || item.description,
      image: item.image,
      tags: item.dietaryBadges?.map((b) => ({ text: b.label, isGreen: true })) || [
        { text: 'Fresh Prep', isGreen: true },
      ],
      quantity: qty,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  const handleOpenCustomize = (menuItem) => {
    const detailed = getFoodItemById(menuItem.id) || menuItem;
    setCustomizingItem(detailed);
  };

  const filteredMenuItems = restaurantMenuItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const featuredDish = restaurantMenuItems[0] || null;

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        {/* Breadcrumb Row */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <Link href="/restaurants" className={styles.breadcrumbLink}>Restaurants</Link>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>{restaurant.name}</span>
          {featuredDish && (
            <>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <Link href={`/inegrediantsmenu?item=${featuredDish.id}`} className={styles.breadcrumbLink}>
                {featuredDish.name}
              </Link>
            </>
          )}
        </nav>

        {/* Main Two-Column Layout */}
        <div className={styles.mainGrid}>
          {/* ================= LEFT COLUMN ================= */}
          <div className={styles.leftColumn}>
            {/* Big Hero Image */}
            <div className={styles.heroImageCard}>
              <Link
                href={featuredDish ? `/inegrediantsmenu?item=${featuredDish.id}` : '#'}
                className={styles.heroImageWrapper}
                title="Click to explore full ingredient breakdown"
              >
                <Image
                  src={selectedImg}
                  alt={restaurant.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 560px"
                  className={styles.heroMainImage}
                />
              </Link>

              {/* Floating Action Buttons */}
              <Link href="/restaurants" className={styles.backButton} aria-label="Go Back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </Link>

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
                <button
                  className={styles.actionCircleBtn}
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 2000);
                    }
                  }}
                  aria-label="Share restaurant"
                >
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
              {(restaurant.galleryImages || []).map((img) => (
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
              {defaultFeatures.map((feat) => (
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
              <h1 className={styles.restaurantName}>{restaurant.name}</h1>
              <div className={styles.ratingBadge}>
                <span className={styles.starIcon}>★</span>
                <span className={styles.ratingScore}>{restaurant.rating}</span>
                <span className={styles.ratingCount}>({restaurant.reviews})</span>
              </div>
            </div>

            {/* Cuisines Tagline */}
            <div className={styles.metaRow}>
              {restaurant.cuisines?.map((c, i) => (
                <span key={i} className={styles.metaItem}>
                  {i > 0 && <span className={styles.metaDot} style={{ marginRight: '6px' }}>•</span>}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-9 9-9 4.5 0 7 2 7 7a7 7 0 0 1-9 9z" />
                    <path d="M12 10a4 4 0 0 0-4 4" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>

            {/* Delivery Info */}
            <div className={styles.deliveryInfoRow}>
              <span className={styles.deliveryItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {restaurant.deliveryTime}
              </span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.deliveryItem}>{restaurant.priceForTwo}</span>
              {restaurant.offer && (
                <>
                  <span className={styles.metaDot}>•</span>
                  <span style={{ color: '#059669', fontWeight: 700, fontSize: '13px' }}>
                    🏷️ {restaurant.offer}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className={styles.description}>
              {restaurant.description}
            </p>

            {/* Section Tabs */}
            <div className={styles.tabsRow}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'menu' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                Menu ({restaurantMenuItems.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'about' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About &amp; Sourcing
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({restaurant.reviews})
              </button>
            </div>

            {/* Menu Tab Content */}
            {activeTab === 'menu' && (
              <>
                {/* Categories Track */}
                <div className={styles.categoriesTrack}>
                  {(restaurant.menuCategories || ['all']).map((cat) => (
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
                      <Link
                        href={`/inegrediantsmenu?item=${item.id}`}
                        className={styles.itemImgWrapper}
                        title="View ingredients & nutrition"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={86}
                          height={86}
                          className={styles.itemImg}
                        />
                      </Link>

                      {/* Dish Info */}
                      <div className={styles.itemContent}>
                        <div className={styles.itemTitleRow}>
                          <Link href={`/inegrediantsmenu?item=${item.id}`} className={styles.itemName}>
                            {item.name}
                          </Link>
                          <span className={styles.itemPrice}>₹{item.price}</span>
                        </div>
                        <p className={styles.itemDesc}>{item.tagline || item.description}</p>

                        {/* Dietary Tags */}
                        <div className={styles.tagsRow}>
                          {item.dietaryBadges?.map((badge, i) => (
                            <span
                              key={i}
                              style={{
                                backgroundColor: badge.bg || '#f1f5f9',
                                color: badge.color || '#334155',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                              }}
                            >
                              <span>{badge.icon || '●'}</span>
                              {badge.label}
                            </span>
                          ))}
                          <Link
                            href={`/inegrediantsmenu?item=${item.id}`}
                            style={{
                              fontSize: '11px',
                              color: '#059669',
                              fontWeight: 700,
                              textDecoration: 'none',
                              marginLeft: '4px',
                            }}
                          >
                            Explore Ingredients →
                          </Link>
                        </div>
                      </div>

                      {/* Right Actions: Stepper + Customize + Add to Cart */}
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

                        <button
                          type="button"
                          className={styles.customizeItemBtn}
                          onClick={() => handleOpenCustomize(item)}
                        >
                          ✨ Customize
                        </button>

                        <button
                          type="button"
                          className={styles.addToCartBtn}
                          onClick={() => handleAddToCart(item)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* About Tab Content */}
            {activeTab === 'about' && (
              <div className={styles.aboutContainer}>
                {/* Food Philosophy & Sourcing */}
                <div className={styles.aboutCard}>
                  <h3 className={styles.aboutTitle}>
                    <span>🥗</span> Kitchen Philosophy &amp; Sourcing
                  </h3>
                  <p className={styles.aboutText}>
                    {restaurant.about?.philosophy || restaurant.description}
                  </p>

                  <div className={styles.aboutHighlightGrid}>
                    <div className={styles.aboutHighlightItem}>
                      <span className={styles.aboutHighlightIcon}>🌱</span>
                      <div>
                        <h4 className={styles.aboutHighlightName}>100% Traceable Sourcing</h4>
                        <p className={styles.aboutHighlightDesc}>
                          {restaurant.about?.sourcing || 'Direct farm procurement with batch testing.'}
                        </p>
                      </div>
                    </div>

                    <div className={styles.aboutHighlightItem}>
                      <span className={styles.aboutHighlightIcon}>🛡️</span>
                      <div>
                        <h4 className={styles.aboutHighlightName}>Kitchen Hygiene &amp; Safety</h4>
                        <p className={styles.aboutHighlightDesc}>
                          {restaurant.about?.kitchenCert || 'FSSAI 5-Star Certified Kitchen'} (Score: {restaurant.about?.hygieneScore || '98/100'})
                        </p>
                      </div>
                    </div>

                    <div className={styles.aboutHighlightItem}>
                      <span className={styles.aboutHighlightIcon}>✨</span>
                      <div>
                        <h4 className={styles.aboutHighlightName}>Quality Certifications</h4>
                        <p className={styles.aboutHighlightDesc}>
                          {restaurant.about?.certifications?.join(' • ') || 'Non-GMO, Zero Palm Oil'}
                        </p>
                      </div>
                    </div>

                    <div className={styles.aboutHighlightItem}>
                      <span className={styles.aboutHighlightIcon}>⏱️</span>
                      <div>
                        <h4 className={styles.aboutHighlightName}>Made Fresh to Order</h4>
                        <p className={styles.aboutHighlightDesc}>
                          Prepared fresh in hygienic workstations with individual allergen isolation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/inegrediantsmenu?item=${featuredDish?.id || 'quinoa-power-bowl'}`}
                    className={styles.exploreIngredientsBtn}
                  >
                    <span>Explore Full Ingredient Breakdown &amp; Nutrition for {featuredDish?.name || 'Signature Dish'} →</span>
                  </Link>
                </div>

                {/* Operations & Hygiene */}
                <div className={styles.aboutCard}>
                  <h3 className={styles.aboutTitle}>
                    <span>📍</span> Location &amp; Operational Details
                  </h3>
                  <div className={styles.aboutInfoGrid}>
                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>Kitchen Location</span>
                      <span className={styles.infoValue}>Madhapur / Hitech City, Hyderabad</span>
                    </div>
                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>Operating Hours</span>
                      <span className={styles.infoValue}>10:00 AM – 11:30 PM (Daily)</span>
                    </div>
                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>FSSAI License</span>
                      <span className={styles.infoValue}>#13624014000{restaurant.numericId || '392'} (Grade A+)</span>
                    </div>
                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>Kitchen Support</span>
                      <span className={styles.infoValue}>+91 40 4852 901{restaurant.numericId || '2'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab Content */}
            {activeTab === 'reviews' && (
              <div className={styles.reviewsContainer}>
                {/* Rating Summary */}
                <div className={styles.ratingsSummaryCard}>
                  <div className={styles.ratingScoreBlock}>
                    <span className={styles.ratingBigNumber}>{restaurant.rating}</span>
                    <span style={{ color: '#f59e0b', fontSize: '16px' }}>★★★★★</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{restaurant.reviews} verified reviews</span>
                  </div>

                  <div className={styles.ratingBars}>
                    <div className={styles.ratingBarRow}>
                      <span>5 ★</span>
                      <div className={styles.ratingProgressTrack}>
                        <div className={styles.ratingProgressFill} style={{ width: '86%' }} />
                      </div>
                      <span>86%</span>
                    </div>
                    <div className={styles.ratingBarRow}>
                      <span>4 ★</span>
                      <div className={styles.ratingProgressTrack}>
                        <div className={styles.ratingProgressFill} style={{ width: '10%' }} />
                      </div>
                      <span>10%</span>
                    </div>
                    <div className={styles.ratingBarRow}>
                      <span>3 ★</span>
                      <div className={styles.ratingProgressTrack}>
                        <div className={styles.ratingProgressFill} style={{ width: '3%' }} />
                      </div>
                      <span>3%</span>
                    </div>
                    <div className={styles.ratingBarRow}>
                      <span>2 ★</span>
                      <div className={styles.ratingProgressTrack}>
                        <div className={styles.ratingProgressFill} style={{ width: '1%' }} />
                      </div>
                      <span>1%</span>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className={styles.reviewsList}>
                  <div className={styles.reviewItemCard}>
                    <div className={styles.reviewItemHeader}>
                      <div className={styles.reviewerInfo}>
                        <div className={styles.reviewerAvatar}>PK</div>
                        <div>
                          <span className={styles.reviewerName}>Pooja Kapoor</span>
                          <div className={styles.reviewDate}>Reviewed 2 days ago • Verified Order</div>
                        </div>
                      </div>
                      <span className={styles.reviewStars}>★★★★★</span>
                    </div>
                    <p className={styles.reviewComment}>
                      The {restaurantMenuItems[0]?.name || 'food'} was exceptionally fresh and flavorful! Loving the full transparency on ingredients.
                    </p>
                  </div>

                  <div className={styles.reviewItemCard}>
                    <div className={styles.reviewItemHeader}>
                      <div className={styles.reviewerInfo}>
                        <div className={styles.reviewerAvatar}>AR</div>
                        <div>
                          <span className={styles.reviewerName}>Ananya Reddy</span>
                          <div className={styles.reviewDate}>Reviewed 4 days ago • Verified Order</div>
                        </div>
                      </div>
                      <span className={styles.reviewStars}>★★★★★</span>
                    </div>
                    <p className={styles.reviewComment}>
                      Real-time allergen check saved me so much hassle. Customizing toppings and protein was smooth and accurate.
                    </p>
                  </div>

                  <div className={styles.reviewItemCard}>
                    <div className={styles.reviewItemHeader}>
                      <div className={styles.reviewerInfo}>
                        <div className={styles.reviewerAvatar}>VK</div>
                        <div>
                          <span className={styles.reviewerName}>Vikram Kumar</span>
                          <div className={styles.reviewDate}>Reviewed 1 week ago • Verified Order</div>
                        </div>
                      </div>
                      <span className={styles.reviewStars}>★★★★★</span>
                    </div>
                    <p className={styles.reviewComment}>
                      Prompt delivery in {restaurant.deliveryTime}. Everything arrived piping hot and neatly packaged.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Customization Modal */}
      {customizingItem && (
        <FoodCustomizationModal
          item={customizingItem}
          isOpen={Boolean(customizingItem)}
          onClose={() => setCustomizingItem(null)}
        />
      )}

      {/* Toast */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0d3822',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          <span>✓ Added to cart!</span>
          <Link href="/checkout" style={{ color: '#86efac', textDecoration: 'underline' }}>
            View Cart →
          </Link>
        </div>
      )}
    </section>
  );
}

export default function MenuHeroSection() {
  return (
    <Suspense fallback={<div style={{ minHeight: '600px', backgroundColor: '#ffffff' }} />}>
      <MenuHeroSectionInner />
    </Suspense>
  );
}
