'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

const categories = [
  { id: 'all', label: 'All', icon: '🍽️', isAll: true },
  { id: 'indian', label: 'Indian', icon: '/categories/indian.jpg' },
  { id: 'chinese', label: 'Chinese', icon: '/categories/chinese.jpg' },
  { id: 'healthy', label: 'Healthy', icon: '/categories/healthy.jpg' },
  { id: 'pizza', label: 'Pizza', icon: '/categories/pizza.jpg' },
  { id: 'burgers', label: 'Burgers', icon: '/categories/burgers.jpg' },
  { id: 'desserts', label: 'Desserts', icon: '/categories/desserts.jpg' },
];

const slides = [
  {
    id: 1,
    badge: 'SPECIAL OFFER',
    title: 'Up to',
    highlight: '40% OFF',
    subtitle: 'On selected restaurants',
    cta: 'Order Now',
    bgColor: '#1d5c33',
  },
  {
    id: 2,
    badge: 'LIMITED TIME',
    title: 'Free Delivery',
    highlight: 'Today Only',
    subtitle: 'On your first order',
    cta: 'Order Now',
    bgColor: '#1d5c33',
  },
  {
    id: 3,
    badge: 'NEW ARRIVAL',
    title: 'Explore',
    highlight: 'New Cuisines',
    subtitle: 'Discover fresh flavors near you',
    cta: 'Explore Now',
    bgColor: '#1d5c33',
  },
];

export default function HeroSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        {/* ---- LEFT CONTENT ---- */}
        <div className={styles.heroLeft}>
          <h1 className={styles.heroHeading}>
            Good Food.<br />
            Clear <span className={styles.heroOrange}>Choices.</span>
          </h1>
          <p className={styles.heroSubtext}>
            Explore a wide variety of cuisines, discover top restaurants{' '}
            and order your favorite meals with confidence.
          </p>

          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
              <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="#888" strokeWidth="1.8"/>
                <path d="M13 13l3.5 3.5" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search for dishes, restaurants..."
                className={styles.searchInput}
                aria-label="Search for dishes and restaurants"
              />
              <button className={styles.filterBtn} aria-label="Filter options">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M1 1h16M4 7h10M7 13h4" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <button className={styles.searchBtn}>Search</button>
          </div>

          {/* Category Pills */}
          <div className={styles.categories}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.catItem} ${activeCategory === cat.id ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-label={`Filter by ${cat.label}`}
              >
                <span className={`${styles.catIconWrapper} ${cat.isAll ? styles.catIconAll : ''} ${activeCategory === cat.id && cat.isAll ? styles.catIconAllActive : ''}`}>
                  {cat.isAll ? (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="1" y="1" width="8" height="8" rx="2" fill={activeCategory === cat.id ? 'white' : '#1d7a3a'} />
                      <rect x="13" y="1" width="8" height="8" rx="2" fill={activeCategory === cat.id ? 'white' : '#1d7a3a'} />
                      <rect x="1" y="13" width="8" height="8" rx="2" fill={activeCategory === cat.id ? 'white' : '#1d7a3a'} />
                      <rect x="13" y="13" width="8" height="8" rx="2" fill={activeCategory === cat.id ? 'white' : '#1d7a3a'} />
                    </svg>
                  ) : (
                    <span className={styles.catEmoji}>{getCategoryEmoji(cat.id)}</span>
                  )}
                </span>
                <span className={styles.catLabel}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---- RIGHT CAROUSEL ---- */}
        <div className={styles.heroRight}>
          <div className={styles.carousel}>
            {/* Prev Arrow */}
            <button
              className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M8.5 1.5L1.5 8l7 6.5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Slide */}
            <div className={styles.slide} style={{ background: slides[activeSlide].bgColor }}>
              {/* Decorative leaves */}
              <div className={styles.leafTopLeft}></div>
              <div className={styles.leafTopRight}></div>

              {/* Text Content */}
              <div className={styles.slideContent}>
                <p className={styles.slideBadge}>
                  <span className={styles.slideBadgeLine}></span>
                  {slides[activeSlide].badge}
                </p>
                <h2 className={styles.slideTitle}>{slides[activeSlide].title}</h2>
                <h2 className={styles.slideHighlight}>{slides[activeSlide].highlight}</h2>
                <p className={styles.slideSubtitle}>{slides[activeSlide].subtitle}</p>
                <Link href="/restaurants" className={styles.slideCta}>
                  {slides[activeSlide].cta} &rarr;
                </Link>
              </div>

              {/* Food Image */}
              <div className={styles.slideImageWrapper}>
                <Image
                  src="/hero-food.jpg"
                  alt="Delicious food offer"
                  fill
                  sizes="(max-width: 480px) 140px, (max-width: 768px) 170px, 210px"
                  className={styles.slideImage}
                  priority
                />
              </div>

              {/* Floating Leaves */}
              <div className={styles.floatingLeaf1}>🌿</div>
              <div className={styles.floatingLeaf2}>🍃</div>
              <div className={styles.floatingLeaf3}>🌿</div>
            </div>

            {/* Next Arrow */}
            <button
              className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M1.5 1.5l7 6.5-7 6.5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dots */}
            <div className={styles.carouselDots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${activeSlide === i ? styles.dotActive : ''}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getCategoryEmoji(id) {
  const map = {
    indian: '🍛',
    chinese: '🥡',
    healthy: '🥗',
    pizza: '🍕',
    burgers: '🍔',
    desserts: '🍰',
  };
  return map[id] || '🍽️';
}
