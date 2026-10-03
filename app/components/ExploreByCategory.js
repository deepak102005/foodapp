'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ExploreByCategory.module.css';

import Link from 'next/link';

const cuisines = [
  { id: 'indian',      label: 'Indian',      image: '/cuisine-indian.jpg' },
  { id: 'chinese',     label: 'Chinese',     image: '/cuisine-chinese.jpg' },
  { id: 'continental', label: 'Continental', image: '/cuisine-continental.jpg' },
  { id: 'healthy',     label: 'Healthy',     image: '/cuisine-healthy.jpg' },
  { id: 'fastfood',    label: 'Fast Food',   image: '/cuisine-fastfood.jpg' },
  { id: 'desserts',    label: 'Desserts',    image: '/cuisine-desserts.jpg' },
];

export default function ExploreByCategory() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: 'smooth' });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header row */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Explore by Cuisine</h2>
          <Link href="/restaurants" className={styles.viewAll}>
            View All
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M1 6h14M9 1l6 5-6 5" stroke="#1d7a3a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Scroll track */}
        <div className={styles.trackWrapper}>
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
            >
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                <path d="M7.5 1.5L1.5 7.5l6 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Cards */}
          <div
            className={styles.track}
            ref={scrollRef}
            onScroll={updateScrollState}
          >
            {cuisines.map((c) => (
              <Link
                key={c.id}
                href={`/restaurants?category=${c.id}`}
                className={styles.card}
                aria-label={`Explore ${c.label} cuisine`}
              >
                <div className={styles.imgWrapper}>
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    className={styles.img}
                    sizes="(max-width: 480px) 45vw, (max-width: 768px) 33vw, 170px"
                  />
                </div>
                <span className={styles.label}>{c.label}</span>
              </Link>
            ))}
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => scroll(1)}
              aria-label="Scroll right"
            >
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                <path d="M1.5 1.5l6 6-6 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
