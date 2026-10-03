'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './OrderTracking.module.css';

const sidebarNav = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'explore' },
  { id: 'orders', label: 'Orders', icon: 'orders', active: true },
  { id: 'favorites', label: 'Favorites', icon: 'favorites' },
  { id: 'wallet', label: 'Wallet', icon: 'wallet' },
  { id: 'offers', label: 'Offers', icon: 'offers' },
  { id: 'help', label: 'Help', icon: 'help' },
];

function NavIcon({ type }) {
  if (type === 'home') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (type === 'explore') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }
  if (type === 'orders') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }
  if (type === 'favorites') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  }
  if (type === 'wallet') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    );
  }
  if (type === 'offers') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    );
  }
  if (type === 'help') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    );
  }
  return null;
}

export default function OrderTracking() {
  const [activeNav, setActiveNav] = useState('orders');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.layoutWrapper}>
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className={styles.sidebar}>
          <nav className={styles.sideNav}>
            {sidebarNav.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <span className={styles.navIcon}>
                    <NavIcon type={item.icon} />
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Promo Card */}
          <div className={styles.promoCard}>
            <Image
              src="/sidebar-promo.jpg"
              alt="Good Food Promo"
              fill
              className={styles.promoBg}
            />
            <div className={styles.promoContent}>
              <h4 className={styles.promoHeading}>
                Good Food.<br />Clear Choices.
              </h4>
              <button className={styles.promoBtn}>
                Order Now →
              </button>
            </div>
          </div>
        </aside>

        {/* ================= CENTER MAIN TRACKING ================= */}
        <main className={styles.mainContent}>
          {/* Header */}
          <div className={styles.orderHeader}>
            <button className={styles.backBtn} aria-label="Go Back">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div>
              <h1 className={styles.orderTitle}>Order #CB12345</h1>
              <p className={styles.orderTime}>Placed on 3 Oct 2026, 12:30 PM</p>
            </div>
          </div>

          {/* Status Title */}
          <div className={styles.statusBox}>
            <h2 className={styles.statusTitle}>Preparing Your Order</h2>
            <p className={styles.statusSubtitle}>The restaurant is preparing your food.</p>
          </div>

          {/* Stepper Timeline */}
          <div className={styles.timelineWrapper}>
            <div className={styles.timeline}>
              {/* Step 1: Confirmed */}
              <div className={`${styles.timelineStep} ${styles.stepCompleted}`}>
                <div className={styles.stepCircle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepName}>Confirmed</span>
                  <span className={styles.stepTime}>12:30 PM</span>
                </div>
              </div>

              {/* Connector 1 */}
              <div className={`${styles.connector} ${styles.connectorActive}`}></div>

              {/* Step 2: Preparing */}
              <div className={`${styles.timelineStep} ${styles.stepActive}`}>
                <div className={styles.stepCircle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 13h12" />
                    <path d="M4 17h16" />
                    <circle cx="12" cy="7" r="3" />
                  </svg>
                </div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepName}>Preparing</span>
                  <span className={styles.stepTime}>12:35 PM</span>
                </div>
              </div>

              {/* Connector 2 */}
              <div className={styles.connector}></div>

              {/* Step 3: On the way */}
              <div className={styles.timelineStep}>
                <div className={`${styles.stepCircle} ${styles.circlePending}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="5.5" cy="17.5" r="3.5" />
                    <circle cx="18.5" cy="17.5" r="3.5" />
                    <path d="M15 6h4l3 6.5-3.5 5" />
                    <path d="M2 17.5h7" />
                    <path d="M9 17.5l2-9h4" />
                  </svg>
                </div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepName}>On the way</span>
                </div>
              </div>

              {/* Connector 3 */}
              <div className={styles.connector}></div>

              {/* Step 4: Delivered */}
              <div className={styles.timelineStep}>
                <div className={`${styles.stepCircle} ${styles.circlePending}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepName}>Delivered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live Map Card */}
          <div className={styles.mapCard}>
            <Image
              src="/tracking-map.jpg"
              alt="Live Delivery Map"
              fill
              priority
              className={styles.mapImage}
            />

            {/* Recenter / Target Button */}
            <button className={styles.recenterBtn} aria-label="Recenter map">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="6" y1="12" x2="2" y2="12" />
                <line x1="12" y1="6" x2="12" y2="2" />
                <line x1="12" y1="22" x2="12" y2="18" />
              </svg>
            </button>
          </div>

          {/* Rider Profile Card */}
          <div className={styles.riderCard}>
            <div className={styles.riderLeft}>
              <div className={styles.riderAvatarWrapper}>
                <Image
                  src="/tracking-rider.jpg"
                  alt="Ravi Kumar"
                  width={56}
                  height={56}
                  className={styles.riderAvatar}
                />
              </div>
              <div className={styles.riderInfo}>
                <h3 className={styles.riderName}>Ravi Kumar</h3>
                <div className={styles.riderRating}>
                  <span className={styles.star}>★</span>
                  <span className={styles.ratingScore}>4.8</span>
                  <span className={styles.reviewCount}>(500+)</span>
                </div>
                <p className={styles.riderStatus}>Your rider is on the way</p>
              </div>
            </div>

            <div className={styles.riderActions}>
              <button className={styles.riderActionBtn} aria-label="Call Rider">
                <div className={styles.actionIconCircle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className={styles.actionBtnLabel}>Call</span>
              </button>

              <button className={styles.riderActionBtn} aria-label="Chat with Rider">
                <div className={styles.actionIconCircle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className={styles.actionBtnLabel}>Chat</span>
              </button>
            </div>
          </div>
        </main>

        {/* ================= RIGHT COLUMN: ORDER DETAILS ================= */}
        <aside className={styles.rightSidebar}>
          <div className={styles.detailsCard}>
            <h2 className={styles.detailsTitle}>Order Details</h2>

            {/* Restaurant Info */}
            <div className={styles.restaurantRow}>
              <div className={styles.restaurantThumbWrapper}>
                <Image
                  src="/quinoa-power-bowl.jpg"
                  alt="The Green Bowl"
                  width={52}
                  height={52}
                  className={styles.restaurantThumb}
                />
              </div>
              <div className={styles.restaurantInfo}>
                <h3 className={styles.restaurantName}>The Green Bowl</h3>
                <p className={styles.restaurantLocation}>Banjara Hills, Hyderabad</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {/* Order Items */}
            <div className={styles.itemsList}>
              <div className={styles.itemRow}>
                <div className={styles.itemImgWrapper}>
                  <Image
                    src="/quinoa-power-bowl.jpg"
                    alt="Quinoa Power Bowl"
                    width={48}
                    height={48}
                    className={styles.itemImg}
                  />
                </div>
                <div className={styles.itemMeta}>
                  <h4 className={styles.itemName}>Quinoa Power Bowl</h4>
                  <span className={styles.itemSub}>1 × Regular</span>
                </div>
                <span className={styles.itemPrice}>₹249</span>
              </div>

              <div className={styles.itemRow}>
                <div className={styles.itemImgWrapper}>
                  <Image
                    src="/checkout-lime-soda.jpg"
                    alt="Fresh Lime Soda"
                    width={48}
                    height={48}
                    className={styles.itemImg}
                  />
                </div>
                <div className={styles.itemMeta}>
                  <h4 className={styles.itemName}>Fresh Lime Soda</h4>
                  <span className={styles.itemSub}>1 × Regular</span>
                </div>
                <span className={styles.itemPrice}>₹89</span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className={styles.costBreakdown}>
              <div className={styles.costRow}>
                <span>Item Total</span>
                <span className={styles.costVal}>₹338</span>
              </div>
              <div className={styles.costRow}>
                <span>Delivery Fee</span>
                <span className={styles.costVal}>₹30</span>
              </div>
              <div className={styles.costRow}>
                <span className={styles.discountLabel}>Discount</span>
                <span className={styles.discountVal}>- ₹30</span>
              </div>
            </div>

            {/* Total Paid */}
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total Paid</span>
              <span className={styles.totalVal}>₹338</span>
            </div>
          </div>

          {/* Need Help Card */}
          <div className={styles.helpCard}>
            <div className={styles.helpLeft}>
              <div className={styles.helpIconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div>
                <h4 className={styles.helpTitle}>Need Help?</h4>
                <p className={styles.helpSubtitle}>We&apos;re here for you.</p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </aside>
      </div>
    </div>
  );
}
