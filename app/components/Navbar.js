'use client';

import { useState, useRef, useEffect, useMemo, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { foodItems } from '@/lib/foodData';

function subscribeLocation(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('clearbite_location_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('clearbite_location_change', callback);
  };
}

function getLocationSnapshot() {
  if (typeof window === 'undefined') return 'Banjara Hills, Hyderabad';
  try {
    return localStorage.getItem('clearbite_location') || 'Banjara Hills, Hyderabad';
  } catch {
    return 'Banjara Hills, Hyderabad';
  }
}

function getLocationServerSnapshot() {
  return 'Banjara Hills, Hyderabad';
}

const HYDERABAD_LOCALITIES = [
  { id: 'banjara', name: 'Banjara Hills', area: 'Road No. 1, 10 & 12', time: '20-25 mins' },
  { id: 'jubilee', name: 'Jubilee Hills', area: 'Road No. 36 & 45', time: '25-30 mins' },
  { id: 'madhapur', name: 'Madhapur', area: 'Hitech City & Cyber Towers', time: '15-20 mins' },
  { id: 'gachibowli', name: 'Gachibowli', area: 'Financial District & ISB Rd', time: '20-30 mins' },
  { id: 'kondapur', name: 'Kondapur', area: 'Botanical Garden Rd', time: '20-25 mins' },
  { id: 'begumpet', name: 'Begumpet', area: 'Prakash Nagar & Mayur Marg', time: '30-35 mins' },
  { id: 'somajiguda', name: 'Somajiguda', area: 'Raj Bhavan Road', time: '25-30 mins' },
  { id: 'kukatpally', name: 'Kukatpally', area: 'KPHB Colony Phase 1-6', time: '30-40 mins' },
  { id: 'ameerpet', name: 'Ameerpet', area: 'Metro Hub & SR Nagar', time: '25-35 mins' },
  { id: 'secunderabad', name: 'Secunderabad', area: 'Clock Tower & Paradise Circle', time: '35-45 mins' },
];

const SEARCH_RESTAURANTS = [
  { id: 'green-bowl', name: 'The Green Bowl', cuisine: 'Healthy • Vegan • Continental', rating: 4.5, time: '30 mins', image: '/hd-restaurant-the-green-bowl.jpg' },
  { id: 'spice-route', name: 'Spice Route', cuisine: 'Indian • North Indian • Biryani', rating: 4.3, time: '25 mins', image: '/hd-restaurant-spice-route.jpg' },
  { id: 'la-pizzeria', name: 'La Pizzeria', cuisine: 'Artisan Pizza • Italian', rating: 4.6, time: '35 mins', image: '/hd-restaurant-la-pizzeria.jpg' },
  { id: 'burger-hub', name: 'Burger Hub', cuisine: 'Gourmet Burgers • Fast Food', rating: 4.4, time: '25 mins', image: '/hd-restaurant-burger-hub.jpg' },
  { id: 'urban-asia', name: 'Urban Asia', cuisine: 'Pan-Asian • Dimsums • Thai', rating: 4.5, time: '30 mins', image: '/hd-restaurant-urban-asia.jpg' },
  { id: 'healthy-bites', name: 'Healthy Bites', cuisine: 'Salads • Fresh Juices • Organic', rating: 4.7, time: '20 mins', image: '/hd-restaurant-healthy-bites.jpg' },
];

const POPULAR_SEARCH_TAGS = [
  'Quinoa Bowl',
  'Avocado Wrap',
  'Falafel Salad',
  'Vegan Pizza',
  'High Protein',
  'Gluten-Free',
  'The Green Bowl',
];

export default function Navbar({ user: propUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user: authUser, logout } = useAuth();
  const { cartCount, addToCart } = useCart();

  const currentUser = authUser || propUser;

  // Modals & Dropdowns State
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Location State
  const selectedLocation = useSyncExternalStore(
    subscribeLocation,
    getLocationSnapshot,
    getLocationServerSnapshot
  );
  const [locationFilter, setLocationFilter] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Refs for Outside Click
  const dropdownRef = useRef(null);
  const locationRef = useRef(null);
  const mobileLocRef = useRef(null);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K to search, Esc to close)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setLocationOpen(false);
        setDropdownOpen(false);
        setContactOpen(false);
        setWishlistOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        (!mobileLocRef.current || !mobileLocRef.current.contains(event.target))
      ) {
        setLocationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Hyderabad localities
  const filteredLocalities = useMemo(() => {
    if (!locationFilter.trim()) return HYDERABAD_LOCALITIES;
    const term = locationFilter.toLowerCase();
    return HYDERABAD_LOCALITIES.filter(
      (loc) => loc.name.toLowerCase().includes(term) || loc.area.toLowerCase().includes(term)
    );
  }, [locationFilter]);

  // Handle Locality Selection
  const handleSelectLocality = (locality) => {
    const locString = `${locality.name}, Hyderabad`;
    try {
      localStorage.setItem('clearbite_location', locString);
      window.dispatchEvent(new Event('clearbite_location_change'));
    } catch {
      // ignore
    }
    setLocationOpen(false);
    setLocationFilter('');
  };

  // Detect GPS / Live Location
  const handleDetectLocation = () => {
    const liveLoc = 'Madhapur (Hitech City), Hyderabad';
    try {
      localStorage.setItem('clearbite_location', liveLoc);
      window.dispatchEvent(new Event('clearbite_location_change'));
    } catch {
      // ignore
    }
    setLocationOpen(false);
  };

  // Filter Search Items (Dishes and Restaurants)
  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) return foodItems.slice(0, 3);
    const q = searchQuery.toLowerCase();
    return foodItems.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        (d.description && d.description.toLowerCase().includes(q))
    ).slice(0, 4);
  }, [searchQuery]);

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) return SEARCH_RESTAURANTS.slice(0, 3);
    const q = searchQuery.toLowerCase();
    return SEARCH_RESTAURANTS.filter(
      (r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
    ).slice(0, 3);
  }, [searchQuery]);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    } else {
      router.push('/restaurants');
      setSearchOpen(false);
    }
  };

  const handleQuickTagClick = (tag) => {
    setSearchQuery(tag);
    router.push(`/restaurants?search=${encodeURIComponent(tag)}`);
    setSearchOpen(false);
  };

  // Send Quick Contact Message
  const handleSendContact = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactMessage('');
      setContactSubmitted(false);
      setContactOpen(false);
    }, 1800);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* ================= Logo (Crisp & High Clarity) ================= */}
        <Link href="/" className={styles.logo} aria-label="ClearBite Home">
          <div className={styles.logoEmblem}>
            <Image
              src="/clearbite-logo.svg"
              alt="ClearBite Emblem"
              width={44}
              height={44}
              priority
              unoptimized
              className={styles.logoImg}
            />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoBrand}>
              <span className={styles.logoGreen}>Clear</span>
              <span className={styles.logoDark}>Bite</span>
            </span>
            <span className={styles.logoTagline}>Clear choices. Better bites.</span>
          </div>
        </Link>

        {/* ================= Desktop Navigation ================= */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}
          >
            Home
          </Link>
          <Link
            href="/restaurants"
            className={`${styles.navLink} ${pathname.startsWith('/restaurants') ? styles.navLinkActive : ''}`}
          >
            Restaurants
          </Link>
          <Link
            href="/checkout"
            className={`${styles.navLink} ${pathname.startsWith('/checkout') ? styles.navLinkActive : ''}`}
          >
            Orders
          </Link>
          <Link
            href="/tractingpage"
            className={`${styles.navLink} ${pathname.startsWith('/tractingpage') ? styles.navLinkActive : ''}`}
          >
            Track Order
          </Link>
          <button
            type="button"
            className={styles.navLink}
            onClick={() => setContactOpen(true)}
          >
            Contact
          </button>
        </nav>

        {/* ================= Right Section ================= */}
        <div className={styles.navRight}>
          {/* Hyderabad Location Dropdown */}
          <div className={styles.locationWrapper} ref={locationRef}>
            <button
              type="button"
              className={`${styles.locationBtn} ${locationOpen ? styles.locationBtnOpen : ''}`}
              onClick={() => setLocationOpen(!locationOpen)}
              aria-expanded={locationOpen}
              aria-label={`Delivery location: ${selectedLocation}`}
            >
              <span className={styles.locationIcon}>
                <svg width="15" height="17" viewBox="0 0 14 16" fill="currentColor">
                  <path d="M7 0C4.239 0 2 2.239 2 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5zm0 7.5c-1.381 0-2.5-1.119-2.5-2.5S5.619 2.5 7 2.5 9.5 3.619 9.5 5 8.381 7.5 7 7.5z" />
                </svg>
              </span>
              <div className={styles.locationContent}>
                <span className={styles.locationLabel}>Delivery to</span>
                <span className={styles.locationValue}>
                  {selectedLocation.split(',')[0]}
                </span>
              </div>
              <svg
                width="11"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                className={`${styles.locationChevron} ${locationOpen ? styles.locationChevronOpen : ''}`}
              >
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Location Dropdown Menu */}
            {locationOpen && (
              <div className={styles.locationDropdown}>
                <div className={styles.locationHeader}>
                  <span className={styles.locationHeaderTitle}>Select Delivery Area</span>
                  <span className={styles.locationCityBadge}>Hyderabad</span>
                </div>

                {/* Filter Input */}
                <div className={styles.locationSearchBox}>
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="#94a3b8" strokeWidth="1.8"/>
                    <path d="M13 13l3.5 3.5" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Hyderabad locality, street..."
                    className={styles.locationSearchInput}
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    autoFocus
                  />
                  {locationFilter && (
                    <button
                      type="button"
                      onClick={() => setLocationFilter('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '12px' }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Detect GPS Option */}
                <button
                  type="button"
                  className={styles.detectLocationBtn}
                  onClick={handleDetectLocation}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.detectGpsIcon}>
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <div className={styles.detectText}>
                    <span>Use Current Location</span>
                  </div>
                  <span className={styles.detectBadge}>GPS Instant</span>
                </button>

                <div className={styles.locationDivider} />
                <div className={styles.locationListTitle}>Popular Localities</div>

                {/* List of Hyderabad Localities */}
                <div className={styles.locationList}>
                  {filteredLocalities.length === 0 ? (
                    <div style={{ padding: '12px 8px', fontSize: '12.5px', color: '#94a3b8', textAlign: 'center' }}>
                      No areas matching &ldquo;{locationFilter}&rdquo;
                    </div>
                  ) : (
                    filteredLocalities.map((loc) => {
                      const isSelected = selectedLocation.startsWith(loc.name);
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          className={`${styles.localityItem} ${isSelected ? styles.localityItemActive : ''}`}
                          onClick={() => handleSelectLocality(loc)}
                        >
                          <div className={styles.localityLeft}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.localityPin}>
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <div className={styles.localityDetails}>
                              <span className={styles.localityName}>{loc.name}</span>
                              <span className={styles.localityArea}>{loc.area}</span>
                            </div>
                          </div>
                          <div className={styles.localityRight}>
                            <span className={styles.localityTime}>⚡ {loc.time}</span>
                            {isSelected && (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Search Button */}
          <button
            type="button"
            className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ''}`}
            aria-label="Search dishes and restaurants (Ctrl+K)"
            onClick={() => setSearchOpen(true)}
            title="Search dishes & restaurants (Ctrl+K)"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Saved favorites"
            onClick={() => setWishlistOpen(true)}
            title="Favorites"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 15.5s-7-4.5-7-9A4 4 0 019 4.5 4 4 0 0116 6.5c0 4.5-7 9-7 9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Cart Icon Link */}
          <Link
            href="/checkout"
            className={styles.iconBtn}
            aria-label={`Cart with ${cartCount} items`}
            title="View Cart & Checkout"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1h2.5l1.8 9h8.2l2-7H4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="15" r="1.2" fill="currentColor"/>
              <circle cx="13" cy="15" r="1.2" fill="currentColor"/>
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
                    width={32}
                    height={32}
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

          {/* Hamburger Menu */}
          <button
            type="button"
            className={styles.hamburger}
            aria-label="Toggle Mobile Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={menuOpen ? `${styles.bar} ${styles.barOpen1}` : styles.bar}></span>
            <span className={menuOpen ? `${styles.bar} ${styles.barOpen2}` : styles.bar}></span>
            <span className={menuOpen ? `${styles.bar} ${styles.barOpen3}` : styles.bar}></span>
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu Drawer ================= */}
      {menuOpen && (
        <nav className={styles.mobileMenu}>
          {/* Quick Search in Mobile */}
          <button
            type="button"
            className={styles.mobileSearchBtn}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>Search dishes, restaurants...</span>
          </button>

          {/* Mobile Location Selector */}
          <button
            type="button"
            className={styles.mobileLocationBtn}
            onClick={() => {
              setLocationOpen(true);
              setMenuOpen(false);
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                <path d="M7 0C4.239 0 2 2.239 2 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5zm0 7.5c-1.381 0-2.5-1.119-2.5-2.5S5.619 2.5 7 2.5 9.5 3.619 9.5 5 8.381 7.5 7 7.5z" />
              </svg>
              <span>Delivering to {selectedLocation.split(',')[0]}</span>
            </span>
            <span style={{ fontSize: '11px', textDecoration: 'underline' }}>Change</span>
          </button>

          <Link
            href="/"
            className={`${styles.mobileLink} ${pathname === '/' ? styles.mobileLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/restaurants"
            className={`${styles.mobileLink} ${pathname.startsWith('/restaurants') ? styles.mobileLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Restaurants
          </Link>
          <Link
            href="/checkout"
            className={`${styles.mobileLink} ${pathname.startsWith('/checkout') ? styles.mobileLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Cart &amp; Orders
          </Link>
          <Link
            href="/tractingpage"
            className={`${styles.mobileLink} ${pathname.startsWith('/tractingpage') ? styles.mobileLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Track Order
          </Link>
          <button
            type="button"
            className={styles.mobileLink}
            onClick={() => {
              setMenuOpen(false);
              setContactOpen(true);
            }}
          >
            Contact Support
          </button>

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
                <div>
                  <span style={{ display: 'block', fontWeight: 700 }}>{currentUser.name}</span>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>{currentUser.email}</span>
                </div>
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

      {/* ================= Live Search Modal ================= */}
      {searchOpen && (
        <div
          className={styles.searchBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div className={styles.searchModal} role="dialog" aria-modal="true" aria-label="Search dishes and restaurants">
            {/* Search Input Bar */}
            <form className={styles.searchHeader} onSubmit={handleSearchSubmit}>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" className={styles.searchIconInput}>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2"/>
                <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search dishes (e.g. Quinoa, Salad), restaurants or cuisines..."
                className={styles.modalSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.searchClearBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear query"
                >
                  ✕
                </button>
              )}
              <span className={styles.searchEscKey}>ESC</span>
            </form>

            {/* Suggestions Chips */}
            <div className={styles.searchSuggestions}>
              <div className={styles.suggestionsTitle}>Popular Searches</div>
              <div className={styles.suggestionsChips}>
                {POPULAR_SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={styles.suggestionChip}
                    onClick={() => handleQuickTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Area */}
            <div className={styles.searchResultsArea}>
              {/* Dishes Section */}
              {filteredDishes.length > 0 && (
                <div>
                  <div className={styles.resultSectionTitle}>
                    <span>Dishes &amp; Bowls</span>
                    <span style={{ fontSize: '11px', color: '#15803d' }}>With Nutrition Info</span>
                  </div>
                  <div className={styles.resultsList}>
                    {filteredDishes.map((dish) => (
                      <Link
                        key={dish.id}
                        href={`/menu`}
                        className={styles.resultCard}
                        onClick={() => setSearchOpen(false)}
                      >
                        <div className={styles.resultImageWrapper}>
                          <Image
                            src={dish.image || '/quinoa-power-bowl.jpg'}
                            alt={dish.name}
                            fill
                            sizes="52px"
                            className={styles.resultImage}
                          />
                        </div>
                        <div className={styles.resultInfo}>
                          <div className={styles.resultTitleRow}>
                            <span className={styles.resultTitle}>{dish.name}</span>
                            <span className={styles.resultPrice}>₹{dish.price}</span>
                          </div>
                          <div className={styles.resultMetaRow}>
                            {dish.dietaryBadges?.[0] && (
                              <span className={styles.resultBadge}>{dish.dietaryBadges[0].label}</span>
                            )}
                            <span className={styles.resultSubtitle}>
                              {dish.nutrition?.calories ? `${dish.nutrition.calories} kcal • ` : ''}
                              {dish.prepTime || '15-20 mins'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Restaurants Section */}
              {filteredRestaurants.length > 0 && (
                <div>
                  <div className={styles.resultSectionTitle}>
                    <span>Top Restaurants</span>
                    <span style={{ fontSize: '11px', color: '#15803d' }}>Hyderabad</span>
                  </div>
                  <div className={styles.resultsList}>
                    {filteredRestaurants.map((res) => (
                      <Link
                        key={res.id}
                        href={`/restaurants?search=${encodeURIComponent(res.name)}`}
                        className={styles.resultCard}
                        onClick={() => setSearchOpen(false)}
                      >
                        <div className={styles.resultImageWrapper}>
                          <Image
                            src={res.image}
                            alt={res.name}
                            fill
                            sizes="52px"
                            className={styles.resultImage}
                          />
                        </div>
                        <div className={styles.resultInfo}>
                          <div className={styles.resultTitleRow}>
                            <span className={styles.resultTitle}>{res.name}</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>
                              ★ {res.rating}
                            </span>
                          </div>
                          <div className={styles.resultMetaRow}>
                            <span className={styles.resultSubtitle}>
                              {res.cuisine} • ⚡ {res.time}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredDishes.length === 0 && filteredRestaurants.length === 0 && (
                <div className={styles.searchEmptyState}>
                  <span className={styles.emptyEmoji}>🔍</span>
                  <p style={{ fontWeight: 600, color: '#0f172a' }}>No direct matches for &ldquo;{searchQuery}&rdquo;</p>
                  <p style={{ fontSize: '12.5px', marginTop: '4px' }}>Try searching &ldquo;Quinoa&rdquo;, &ldquo;Healthy&rdquo;, or &ldquo;Pizza&rdquo;</p>
                </div>
              )}
            </div>

            {/* Footer with Search CTA */}
            <div className={styles.searchFooter}>
              <span className={styles.searchFooterHint}>
                Press <strong>Enter</strong> to explore full restaurant listings
              </span>
              <button
                type="button"
                className={styles.searchAllBtn}
                onClick={handleSearchSubmit}
              >
                Search All Restaurants →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Contact Support Modal ================= */}
      {contactOpen && (
        <div
          className={styles.searchBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setContactOpen(false);
          }}
        >
          <div className={styles.contactModal} role="dialog" aria-modal="true" aria-label="Contact ClearBite Support">
            <div className={styles.contactHeader}>
              <h2 className={styles.contactTitle}>ClearBite Support</h2>
              <p className={styles.contactSubtitle}>We&apos;re here to assist your transparent dining experience 24x7</p>
              <button
                type="button"
                className={styles.contactCloseBtn}
                onClick={() => setContactOpen(false)}
                aria-label="Close contact modal"
              >
                ✕
              </button>
            </div>

            <div className={styles.contactBody}>
              <div className={styles.contactCardGrid}>
                <a href="tel:+914048592026" className={styles.contactInfoCard}>
                  <span className={styles.contactCardLabel}>Customer Helpline</span>
                  <span className={styles.contactCardValue}>+91 40 4859 2026</span>
                  <span className={styles.contactCardSub}>Tap to Call • Toll Free</span>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactInfoCard}
                >
                  <span className={styles.contactCardLabel}>WhatsApp Chat</span>
                  <span className={styles.contactCardValue}>+91 98765 43210</span>
                  <span className={styles.contactCardSub}>Quick Response • 24x7</span>
                </a>

                <a href="mailto:support@clearbite.in" className={styles.contactInfoCard}>
                  <span className={styles.contactCardLabel}>Email Inquiries</span>
                  <span className={styles.contactCardValue}>support@clearbite.in</span>
                  <span className={styles.contactCardSub}>Guaranteed Reply &lt; 2 hrs</span>
                </a>

                <div className={styles.contactInfoCard}>
                  <span className={styles.contactCardLabel}>Operating Hours</span>
                  <span className={styles.contactCardValue}>7:00 AM – 2:00 AM</span>
                  <span className={styles.contactCardSub}>Hyderabad Delivery Active</span>
                </div>
              </div>

              <div className={styles.contactLocationBox}>
                <div className={styles.contactLocationTitle}>📍 Hyderabad Operational HQ</div>
                <div className={styles.contactLocationAddress}>
                  Plot 42, Mindspace Junction, Hitech City Main Road, Madhapur, Hyderabad, Telangana 500081
                </div>
              </div>

              {/* Quick Message Form */}
              <form onSubmit={handleSendContact} className={styles.quickMessageForm}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>
                  Send Quick Support Request
                </div>
                <input
                  type="text"
                  placeholder="How can we assist you with your order?"
                  className={styles.quickInput}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  disabled={contactSubmitted}
                  required
                />
                <button
                  type="submit"
                  className={styles.quickSubmitBtn}
                  disabled={contactSubmitted}
                >
                  {contactSubmitted ? '✓ Message Sent! Support is connecting...' : 'Send Message to Team'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= Wishlist / Favorites Modal ================= */}
      {wishlistOpen && (
        <div
          className={styles.searchBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setWishlistOpen(false);
          }}
        >
          <div className={styles.wishlistModal} role="dialog" aria-modal="true" aria-label="Saved Favorite Dishes">
            <div className={styles.wishlistHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>❤️</span>
                <span className={styles.wishlistTitle}>Your Saved Favorites</span>
                <span className={styles.wishlistCount}>3 Saved</span>
              </div>
              <button
                type="button"
                className={styles.searchClearBtn}
                onClick={() => setWishlistOpen(false)}
                aria-label="Close favorites"
              >
                ✕
              </button>
            </div>

            <div className={styles.wishlistList}>
              {foodItems.slice(0, 3).map((item) => (
                <div key={item.id} className={styles.wishlistItem}>
                  <Image
                    src={item.image || '/quinoa-power-bowl.jpg'}
                    alt={item.name}
                    width={48}
                    height={48}
                    className={styles.wishlistItemImage}
                  />
                  <div className={styles.wishlistItemInfo}>
                    <div className={styles.wishlistItemName}>{item.name}</div>
                    <div className={styles.wishlistItemPrice}>₹{item.price}</div>
                  </div>
                  <button
                    type="button"
                    className={styles.wishlistAddBtn}
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      });
                    }}
                  >
                    + Add to Cart
                  </button>
                </div>
              ))}
            </div>

            <div style={{ padding: '12px 18px', background: '#fafcfb', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Curated clean label meals</span>
              <Link
                href="/menu"
                className={styles.searchAllBtn}
                onClick={() => setWishlistOpen(false)}
                style={{ textDecoration: 'none' }}
              >
                View Full Menu →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
