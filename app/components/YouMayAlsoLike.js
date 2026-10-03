'use client';

import Image from 'next/image';
import styles from './YouMayAlsoLike.module.css';

const recommendations = [
  {
    id: 1,
    name: 'Mediterranean Bowl',
    price: 239,
    image: '/mediterranean-bowl.jpg',
  },
  {
    id: 2,
    name: 'Chicken Protein Bowl',
    price: 259,
    image: '/chicken-protein-bowl.jpg',
  },
  {
    id: 3,
    name: 'Falafel Salad',
    price: 229,
    image: '/falafel-salad.jpg',
  },
  {
    id: 4,
    name: 'Greek Salad',
    price: 219,
    image: '/greek-salad.jpg',
  },
  {
    id: 5,
    name: 'Pesto Pasta',
    price: 249,
    image: '/pesto-pasta.jpg',
  },
  {
    id: 6,
    name: 'Mango Smoothie',
    price: 149,
    image: '/mango-smoothie.jpg',
  },
];

export default function YouMayAlsoLike() {
  return (
    <section className={styles.section}>
      {/* Decorative Mint Leaves */}
      <div className={styles.decorLeafLeft}>
        <Image
          src="/hd-hero-leaf-left.png"
          alt="Decorative leaf"
          width={65}
          height={95}
          className={styles.leafImg}
        />
      </div>
      <div className={styles.decorLeafRight}>
        <Image
          src="/hd-hero-leaf-left.png"
          alt="Decorative leaf"
          width={75}
          height={110}
          className={styles.leafImgRight}
        />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>You May Also Like</h2>
          <a href="#" className={styles.viewAll}>
            <span>View All</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.viewAllArrow}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* 6 Items Horizontal Grid */}
        <div className={styles.grid}>
          {recommendations.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={220}
                  height={130}
                  className={styles.cardImg}
                />
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardName}>{item.name}</h3>
                  <span className={styles.cardPrice}>₹{item.price}</span>
                </div>

                <button className={styles.addBtn} aria-label={`Add ${item.name} to cart`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
