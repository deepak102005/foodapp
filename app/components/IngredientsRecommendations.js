'use client';

import Image from 'next/image';
import Link from 'next/link';
import { foodItems } from '@/lib/foodData';
import { useCart } from '@/context/CartContext';
import styles from './IngredientsRecommendations.module.css';

export default function IngredientsRecommendations() {
  const { addItem } = useCart();
  const recommendedItems = foodItems.slice(0, 5);

  const handleAdd = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `rec_${item.id}`,
      baseId: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      desc: item.tagline || item.description,
      image: item.image,
      tags: [{ text: 'Chef Favorite', isGreen: true }],
      quantity: 1,
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>You May Also Like</h2>
          <Link href="/restaurants" className={styles.seeAll}>
            <span>See All</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.seeAllArrow}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* 5 Cards Grid */}
        <div className={styles.grid}>
          {recommendedItems.map((item) => (
            <Link
              key={item.id}
              href={`/inegrediantsmenu?item=${item.id}`}
              className={styles.card}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={240}
                  height={150}
                  className={styles.cardImg}
                />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{item.name}</h3>

                <div className={styles.ratingRow}>
                  <span className={styles.star}>★</span>
                  <span className={styles.ratingScore}>{item.rating}</span>
                  <span className={styles.reviewsCount}>({item.reviewsCount})</span>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.price}>₹{item.price}</span>
                  <button
                    className={styles.addBtn}
                    aria-label={`Add ${item.name} to cart`}
                    onClick={(e) => handleAdd(e, item)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
