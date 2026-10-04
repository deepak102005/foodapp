'use client';

import Image from 'next/image';
import Link from 'next/link';
import { foodItems } from '@/lib/foodData';
import { useCart } from '@/context/CartContext';
import styles from './YouMayAlsoLike.module.css';

export default function YouMayAlsoLike() {
  const { addItem } = useCart();
  const recommendations = foodItems.slice(0, 6);

  const handleAdd = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `like_${item.id}`,
      baseId: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      desc: item.tagline || item.description,
      image: item.image,
      tags: [{ text: 'Chef Special', isGreen: true }],
      quantity: 1,
    });
  };

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
          <Link href="/restaurants" className={styles.viewAll}>
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
          </Link>
        </div>

        {/* 6 Items Horizontal Grid */}
        <div className={styles.grid}>
          {recommendations.map((item) => (
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

                <button
                  className={styles.addBtn}
                  aria-label={`Add ${item.name} to cart`}
                  onClick={(e) => handleAdd(e, item)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
