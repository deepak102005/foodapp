'use client';

import Image from 'next/image';
import styles from './IngredientsRecommendations.module.css';

const recommendations = [
  {
    id: 1,
    name: 'Mediterranean Bowl',
    rating: 4.5,
    reviews: 220,
    price: 229,
    image: '/mediterranean-bowl.jpg',
  },
  {
    id: 2,
    name: 'Avocado Salad',
    rating: 4.4,
    reviews: 180,
    price: 199,
    image: '/avocado-wrap.jpg',
  },
  {
    id: 3,
    name: 'Grilled Veg Bowl',
    rating: 4.6,
    reviews: 275,
    price: 239,
    image: '/grilled-chicken-salad.jpg',
  },
  {
    id: 4,
    name: 'Protein Bowl',
    rating: 4.7,
    reviews: 310,
    price: 259,
    image: '/dark-bowl-salad.jpg',
  },
  {
    id: 5,
    name: 'Thai Veg Bowl',
    rating: 4.3,
    reviews: 190,
    price: 219,
    image: '/chicken-protein-bowl.jpg',
  },
];

export default function IngredientsRecommendations() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>You May Also Like</h2>
          <a href="#" className={styles.seeAll}>
            <span>See All</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.seeAllArrow}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* 5 Cards Grid */}
        <div className={styles.grid}>
          {recommendations.map((item) => (
            <article key={item.id} className={styles.card}>
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
                  <span className={styles.reviewsCount}>({item.reviews})</span>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.price}>₹{item.price}</span>
                  <button className={styles.addBtn} aria-label={`Add ${item.name} to cart`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
