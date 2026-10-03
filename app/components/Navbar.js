'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Image
            src="/logo.jpeg"
            alt="ClearBite Logo"
            width={48}
            height={48}
            className={styles.logoImg}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <div className={styles.logoText}>
            <span className={styles.logoBrand}>
              <span className={styles.logoGreen}>Clear</span>
              <span className={styles.logoDark}>Bite</span>
            </span>
            <span className={styles.logoTagline}>Clear choices. Better bites.</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navLinks}>
          <a href="#" className={`${styles.navLink} ${styles.navLinkActive}`}>Home</a>
          <a href="#" className={styles.navLink}>Restaurants</a>
          <a href="#" className={styles.navLink}>Offers</a>
          <a href="#" className={styles.navLink}>About</a>
          <a href="#" className={styles.navLink}>Contact</a>
        </nav>

        {/* Right Section */}
        <div className={styles.navRight}>
          {/* Location */}
          <div className={styles.location}>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M7 0C4.239 0 2 2.239 2 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5zm0 7.5c-1.381 0-2.5-1.119-2.5-2.5S5.619 2.5 7 2.5 9.5 3.619 9.5 5 8.381 7.5 7 7.5z" fill="#1a1a1a"/>
            </svg>
            <span className={styles.locationText}>Hyderabad</span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1l5 5 5-5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Icons */}
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#1a1a1a" strokeWidth="1.8"/>
              <path d="M13 13l3.5 3.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 15.5s-7-4.5-7-9A4 4 0 019 4.5 4 4 0 0116 6.5c0 4.5-7 9-7 9z" stroke="#1a1a1a" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Cart" style={{position:'relative'}}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1h2.5l1.8 9h8.2l2-7H4.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="15" r="1.2" fill="#1a1a1a"/>
              <circle cx="13" cy="15" r="1.2" fill="#1a1a1a"/>
            </svg>
            <span className={styles.cartBadge}>2</span>
          </button>

          {/* CTA */}
          <button className={styles.signInBtn}>Sign In / Sign Up</button>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={menuOpen ? `${styles.bar} ${styles.barOpen1}` : styles.bar}></span>
            <span className={menuOpen ? `${styles.bar} ${styles.barOpen2}` : styles.bar}></span>
            <span className={menuOpen ? `${styles.bar} ${styles.barOpen3}` : styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className={styles.mobileMenu}>
          <a href="#" className={`${styles.mobileLink} ${styles.mobileLinkActive}`} onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Explore</a>
          <a href="#" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Offers</a>
          <a href="#" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</a>
          <a href="#" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</a>
          <div className={styles.mobileDivider}></div>
          <button className={styles.mobileSignIn}>Sign In / Sign Up</button>
        </nav>
      )}
    </header>
  );
}
