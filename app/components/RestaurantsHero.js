'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './RestaurantsHero.module.css';

const categories = [
  { id: 'all', label: 'All', icon: 'grid' },
  { id: 'indian', label: 'Indian', icon: 'indian' },
  { id: 'chinese', label: 'Chinese', icon: 'chinese' },
  { id: 'pizza', label: 'Pizza', icon: 'pizza' },
  { id: 'burgers', label: 'Burgers', icon: 'burgers' },
  { id: 'healthy', label: 'Healthy', icon: 'healthy' },
  { id: 'desserts', label: 'Desserts', icon: 'desserts' },
];

const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'rating', label: 'Rating: High to Low' },
  { id: 'delivery', label: 'Delivery Time' },
  { id: 'offers', label: 'Great Offers' },
];

function CategoryIcon({ type }) {
  if (type === 'grid') {
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" rx="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" />
      </svg>
    );
  }
  if (type === 'indian') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2v8a3 3 0 0 1-3 3h-2" />
        <path d="M15 2v8" />
        <path d="M12 2v8a3 3 0 0 0 3 3" />
        <path d="M15 13v9" />
        <path d="M6 2v20" />
        <path d="M6 2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4" />
      </svg>
    );
  }
  if (type === 'chinese') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11c0 5 4 9 9 9s9-4 9-9H3z" />
        <path d="M7 11V6" />
        <path d="M12 11V4" />
        <path d="M17 11V7" />
        <line x1="2" y1="2" x2="20" y2="8" />
      </svg>
    );
  }
  if (type === 'pizza') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 11h.01M11 15h.01M16 16h.01" />
        <path d="M2 16.5c4-2 16-2 20 0L12 2 2 16.5z" />
      </svg>
    );
  }
  if (type === 'burgers') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a8 8 0 0 1 16 0H4z" />
        <rect x="2" y="14" width="20" height="2" rx="1" />
        <path d="M4 19a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1H4v1z" />
      </svg>
    );
  }
  if (type === 'healthy') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-9 9-9 4.5 0 7 2 7 7a7 7 0 0 1-9 9z" />
        <path d="M12 10a4 4 0 0 0-4 4" />
      </svg>
    );
  }
  if (type === 'desserts') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6" />
        <path d="M3 14c1.5 2 4.5 2 6 0 1.5 2 4.5 2 6 0 1.5 2 4.5 2 6 0" />
        <path d="M5 14V9a7 7 0 0 1 14 0v5" />
        <circle cx="12" cy="4" r="1.5" />
      </svg>
    );
  }
  return null;
}

export default function RestaurantsHero({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  sortBy,
  onSortChange,
}) {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(searchQuery);
  };

  return (
    <section className={styles.heroSection}>
      {/* Top Banner with mint gradient and background scenery */}
      <div className={styles.bannerWrapper}>
        {/* Floating Leaves Decoration */}
        <div className={styles.leafLeftWrapper}>
          <Image
            src="/hd-hero-leaf-left.png"
            alt="Leaf decoration"
            width={75}
            height={110}
            className={styles.leafLeft}
            priority
          />
        </div>

        {/* Ambient Floating Leaf Top */}
        <div className={styles.leafTopWrapper}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className={styles.leafSvg}>
            <path
              d="M12 2C6.5 2 2 6.5 2 12c0 5 4.5 9 10 9 6.5 0 10-5.5 10-10C22 5.5 17.5 2 12 2z"
              fill="rgba(58, 142, 85, 0.22)"
            />
            <path
              d="M12 2c0 8 4 12 10 9"
              stroke="rgba(46, 125, 71, 0.4)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className={styles.bannerContainer}>
          {/* Left Text & Search */}
          <div className={styles.leftContent}>
            <h1 className={styles.heading}>Restaurants Near You</h1>
            <p className={styles.subtitle}>
              Discover the best restaurants with great food, ratings and offers.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <div className={styles.searchBar}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={styles.searchIcon}
                >
                  <circle cx="9" cy="9" r="6.5" stroke="#1e293b" strokeWidth="1.8" />
                  <path
                    d="M14 14l4.5 4.5"
                    stroke="#1e293b"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search restaurants or cuisines"
                />
                <button type="submit" className={styles.searchBtn}>
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Right Terrace Image */}
          <div className={styles.rightContent}>
            <div className={styles.terraceImageWrapper}>
              <Image
                src="/hd-hero-terrace.jpg"
                alt="Charming restaurant terrace with warm lights and greenery"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                className={styles.terraceImage}
                priority
              />
              <div className={styles.imageFadeOverlay}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className={styles.filterBarContainer}>
        <div className={styles.categoriesTrack}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ''}`}
                aria-pressed={isActive}
              >
                <span className={styles.categoryIcon}>
                  <CategoryIcon type={cat.icon} />
                </span>
                <span className={styles.categoryLabel}>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className={styles.sortWrapper}>
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className={styles.sortBtn}
            aria-expanded={sortDropdownOpen}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <span>Sort by</span>
            <svg
              width="11"
              height="6"
              viewBox="0 0 12 7"
              fill="none"
              className={sortDropdownOpen ? styles.chevronOpen : styles.chevron}
            >
              <path
                d="M1 1l5 5 5-5"
                stroke="#1e293b"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {sortDropdownOpen && (
            <div className={styles.sortMenu}>
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onSortChange(opt.id);
                    setSortDropdownOpen(false);
                  }}
                  className={`${styles.sortMenuItem} ${sortBy === opt.id ? styles.sortMenuItemActive : ''}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
