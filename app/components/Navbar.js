'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar({ user: propUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user: authUser, logout } = useAuth();
  const { cartCount } = useCart();

  const currentUser = authUser || propUser;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
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
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>Home</Link>
          <Link href="/restaurants" className={styles.navLink}>Restaurants</Link>
          <Link href="/checkout" className={styles.navLink}>Orders</Link>
          <Link href="/tractingpage" className={styles.navLink}>Track Order</Link>
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
          <Link href="/checkout" className={styles.iconBtn} aria-label="Cart" style={{position:'relative'}}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1h2.5l1.8 9h8.2l2-7H4.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="15" r="1.2" fill="#1a1a1a"/>
              <circle cx="13" cy="15" r="1.2" fill="#1a1a1a"/>
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>

          {/* CTA or User Profile with Dropdown */}
          {currentUser ? (
            <div className={styles.profileContainer} ref={dropdownRef}>
              <button
                type="button"
                className={styles.userProfile}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User account menu"
              >
                <div className={styles.userAvatarWrapper}>
                  <Image
                    src={currentUser.avatar || '/user-deepak.jpg'}
                    alt={currentUser.name || 'User'}
                    width={34}
                    height={34}
                    className={styles.userAvatar}
                  />
                </div>
                <span className={styles.userName}>{currentUser.name}</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  style={{
                    transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <path d="M1 1l4 4 4-4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownName}>{currentUser.name}</span>
                    <span className={styles.dropdownEmail}>{currentUser.email || 'Member'}</span>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link
                    href="/tractingpage"
                    className={styles.dropdownItem}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Track Active Order
                  </Link>
                  <Link
                    href="/checkout"
                    className={styles.dropdownItem}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                    </svg>
                    Cart &amp; Checkout
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <button
                    type="button"
                    className={styles.dropdownLogout}
                    onClick={async () => {
                      setDropdownOpen(false);
                      await logout();
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authActions}>
              <Link href="/signin" className={styles.signInBtn}>
                Sign In
              </Link>
              <Link href="/signup" className={styles.signUpBtn}>
                Sign Up
              </Link>
            </div>
          )}

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
          <Link href="/" className={`${styles.mobileLink} ${styles.mobileLinkActive}`} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/restaurants" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Restaurants</Link>
          <Link href="/checkout" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Cart &amp; Orders</Link>
          <Link href="/tractingpage" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Track Order</Link>
          <a href="#" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</a>
          <div className={styles.mobileDivider}></div>

          {currentUser ? (
            <div className={styles.mobileUserSection}>
              <div className={styles.mobileUserInfo}>
                <Image
                  src={currentUser.avatar || '/user-deepak.jpg'}
                  alt={currentUser.name}
                  width={32}
                  height={32}
                  className={styles.userAvatar}
                />
                <span>{currentUser.name}</span>
              </div>
              <button
                className={styles.mobileLogoutBtn}
                onClick={async () => {
                  setMenuOpen(false);
                  await logout();
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuthRow}>
              <Link href="/signin" className={styles.mobileSignIn} onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/signup" className={styles.mobileSignUp} onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
