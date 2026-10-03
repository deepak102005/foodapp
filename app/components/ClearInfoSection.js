import Image from 'next/image';
import styles from './ClearInfoSection.module.css';

const allergens = [
  { icon: '🥚', label: 'Egg' },
  { icon: '🌾', label: 'Gluten' },
  { icon: '🫘', label: 'Soy' },
];

const nutrition = [
  { label: 'Protein', value: '12g' },
  { label: 'Carbs',   value: '45g' },
  { label: 'Fat',     value: '10g' },
];

export default function ClearInfoSection() {
  return (
    <section className={styles.section}>
      {/* Decorative background blob */}
      <div className={styles.blobLeft}></div>
      <div className={styles.blobRight}></div>

      <div className={styles.container}>
        {/* ---- LEFT: text content ---- */}
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Clear Information<br />
            for <span className={styles.orange}>Better Choices</span>
          </h2>
          <p className={styles.body}>
            We provide all the details you need — ingredients,
            allergens, nutrition, preparation time and more,
            so you can order with confidence.
          </p>

          {/* Primary CTA */}
          <button className={styles.downloadBtn}>
            Download the App
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Store badges */}
          <div className={styles.storeBadges}>
            {/* App Store */}
            <button className={styles.badge} aria-label="Download on the App Store">
              <span className={styles.badgeIcon}>
                <svg width="22" height="26" viewBox="0 0 22 26" fill="white">
                  <path d="M18.12 13.84c-.02-3.17 2.6-4.7 2.72-4.77-1.49-2.17-3.79-2.47-4.6-2.5-1.96-.2-3.83 1.15-4.82 1.15-.99 0-2.52-1.12-4.15-1.09-2.13.03-4.1 1.23-5.2 3.12-2.22 3.84-.57 9.52 1.59 12.63 1.06 1.52 2.32 3.23 3.97 3.17 1.59-.07 2.2-1.03 4.13-1.03 1.93 0 2.47 1.03 4.16.99 1.72-.03 2.81-1.55 3.86-3.08.95-1.38 1.68-2.93 1.94-3.75C21.72 18.68 18.14 16.99 18.12 13.84zM14.92 4.35C15.8 3.27 16.4 1.78 16.22.26c-1.3.06-2.88.87-3.81 1.93-.83.94-1.57 2.47-1.37 3.93 1.44.11 2.92-.73 3.88-1.77z"/>
                </svg>
              </span>
              <span className={styles.badgeText}>
                <span className={styles.badgeSmall}>Download on the</span>
                <span className={styles.badgeBig}>App Store</span>
              </span>
            </button>

            {/* Google Play */}
            <button className={styles.badge} aria-label="Get it on Google Play">
              <span className={styles.badgeIcon}>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                  <path d="M1 1.27L12.66 12 1 22.73V1.27z" fill="#4FC3F7"/>
                  <path d="M16.74 8.27L4.04 1.03 13.42 10.4l3.32-2.13z" fill="#81C784"/>
                  <path d="M16.74 15.73L4.04 22.97 13.42 13.6l3.32 2.13z" fill="#F44336"/>
                  <path d="M17.67 9.67L14.46 12l3.21 2.33c.66-.43.91-.9.91-2.33s-.25-1.9-.91-2.33z" fill="#FFC107"/>
                </svg>
              </span>
              <span className={styles.badgeText}>
                <span className={styles.badgeSmall}>GET IT ON</span>
                <span className={styles.badgeBig}>Google Play</span>
              </span>
            </button>
          </div>
        </div>

        {/* ---- RIGHT: food image + floating cards ---- */}
        <div className={styles.right}>
          {/* Decorative leaves */}
          <div className={styles.leaf1}>🍃</div>
          <div className={styles.leaf2}>🌿</div>
          <div className={styles.leaf3}>🍃</div>

          {/* Food image */}
          <div className={styles.foodImgWrapper}>
            <Image
              src="/info-noodle-bowl.jpg"
              alt="Noodle bowl with fresh vegetables"
              fill
              className={styles.foodImg}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Floating: Contains card */}
          <div className={styles.containsCard}>
            <p className={styles.containsTitle}>Contains</p>
            <ul className={styles.allergenList}>
              {allergens.map((a) => (
                <li key={a.label} className={styles.allergenItem}>
                  <span className={styles.allergenIcon}>{a.icon}</span>
                  <span className={styles.allergenLabel}>{a.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Floating: Nutrition card */}
          <div className={styles.nutritionCard}>
            <p className={styles.nutritionTitle}>Nutrition (per serving)</p>
            <p className={styles.kcal}>320 kcal</p>
            <div className={styles.nutritionDivider}></div>
            {nutrition.map((n) => (
              <div key={n.label} className={styles.nutritionRow}>
                <span className={styles.nutritionLabel}>{n.label}</span>
                <span className={styles.nutritionValue}>{n.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
