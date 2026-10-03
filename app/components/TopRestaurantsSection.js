'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './TopRestaurantsSection.module.css';

const allRestaurants = [
  {
    id: 1,
    name: 'The Green Bowl',
    image: '/hd-restaurant-the-green-bowl.jpg',
    rating: 4.5,
    reviews: '2k+',
    deliveryTime: '30–40 mins',
    cuisines: ['Healthy', 'Vegan', 'Continental'],
    category: 'healthy',
    offer: 'Flat 30% OFF',
  },
  {
    id: 2,
    name: 'Spice Route',
    image: '/hd-restaurant-spice-route.jpg',
    rating: 4.3,
    reviews: '1k+',
    deliveryTime: '25–35 mins',
    cuisines: ['Indian', 'North Indian', 'Chinese'],
    category: 'indian',
    offer: 'Up to 40% OFF',
  },
  {
    id: 3,
    name: 'La Pizzeria',
    image: '/hd-restaurant-la-pizzeria.jpg',
    rating: 4.6,
    reviews: '3k+',
    deliveryTime: '30–45 mins',
    cuisines: ['Pizza', 'Italian', 'Fast Food'],
    category: 'pizza',
    offer: 'Flat 25% OFF',
  },
  {
    id: 4,
    name: 'Burger Hub',
    image: '/hd-restaurant-burger-hub.jpg',
    rating: 4.4,
    reviews: '2k+',
    deliveryTime: '20–30 mins',
    cuisines: ['Burgers', 'Fast Food', 'American'],
    category: 'burgers',
    offer: 'Up to 35% OFF',
  },
  {
    id: 5,
    name: 'Urban Asia',
    image: '/hd-restaurant-urban-asia.jpg',
    rating: 4.5,
    reviews: '1k+',
    deliveryTime: '25–40 mins',
    cuisines: ['Chinese', 'Thai', 'Asian'],
    category: 'chinese',
    offer: 'Flat 30% OFF',
  },
  {
    id: 6,
    name: 'Tandoor Tales',
    image: '/hd-restaurant-tandoor-tales.jpg',
    rating: 4.4,
    reviews: '800+',
    deliveryTime: '30–45 mins',
    cuisines: ['Indian', 'Tandoor', 'North Indian'],
    category: 'indian',
    offer: 'Up to 40% OFF',
  },
  {
    id: 7,
    name: 'Healthy Bites',
    image: '/hd-restaurant-healthy-bites.jpg',
    rating: 4.6,
    reviews: '1k+',
    deliveryTime: '20–30 mins',
    cuisines: ['Healthy', 'Salads', 'Continental'],
    category: 'healthy',
    offer: 'Flat 25% OFF',
  },
  {
    id: 8,
    name: 'Sweet Cravings',
    image: '/hd-restaurant-sweet-cravings.jpg',
    rating: 4.7,
    reviews: '1k+',
    deliveryTime: '15–25 mins',
    cuisines: ['Desserts', 'Bakery', 'Cafe'],
    category: 'desserts',
    offer: 'Up to 30% OFF',
  },
];

export default function TopRestaurantsSection({ activeCategory = 'all', searchQuery = '', sortBy = 'relevance' }) {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter restaurants based on category and search query
  let filtered = allRestaurants.filter((rest) => {
    const matchesCategory =
      activeCategory === 'all' ||
      rest.category === activeCategory ||
      rest.cuisines.some((c) => c.toLowerCase().includes(activeCategory.toLowerCase()));

    const matchesSearch =
      !searchQuery.trim() ||
      rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.cuisines.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Sort restaurants
  if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'delivery') {
    filtered = [...filtered].sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
  } else if (sortBy === 'offers') {
    filtered = [...filtered].sort((a, b) => (b.offer > a.offer ? 1 : -1));
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Top Restaurants</h2>
          <a href="#" className={styles.seeAll}>
            <span>See All</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.seeAllArrow}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Restaurants Grid */}
        <div className={styles.grid}>
          {filtered.map((restaurant) => {
            const isFav = !!favorites[restaurant.id];
            return (
              <article key={restaurant.id} className={styles.card}>
                {/* Image Container */}
                <div className={styles.imageContainer}>
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    width={436}
                    height={150}
                    className={styles.restaurantImage}
                    priority={restaurant.id <= 4}
                  />

                  {/* Delivery Badge */}
                  <div className={styles.deliveryBadge}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0d5733"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.scooterIcon}
                    >
                      <circle cx="5.5" cy="17.5" r="3.5" />
                      <circle cx="18.5" cy="17.5" r="3.5" />
                      <path d="M15 6h4l3 6.5-3.5 5" />
                      <path d="M2 17.5h7" />
                      <path d="M9 17.5l2-9h4" />
                    </svg>
                    <span>{restaurant.deliveryTime}</span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    className={`${styles.favoriteBtn} ${isFav ? styles.favoriteActive : ''}`}
                    onClick={(e) => toggleFavorite(restaurant.id, e)}
                    aria-label={`Save ${restaurant.name} to wishlist`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={isFav ? '#e11d48' : 'none'}
                      stroke={isFav ? '#e11d48' : '#be123c'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  {/* Title */}
                  <h3 className={styles.cardTitle}>{restaurant.name}</h3>

                  {/* Rating */}
                  <div className={styles.ratingRow}>
                    <span className={styles.star}>★</span>
                    <span className={styles.ratingNumber}>{restaurant.rating}</span>
                    <span className={styles.reviewsCount}>({restaurant.reviews})</span>
                  </div>

                  {/* Cuisines */}
                  <div className={styles.cuisinesList}>
                    {restaurant.cuisines.map((cuisine, idx) => (
                      <span key={idx} className={styles.cuisineTag}>
                        {cuisine}
                      </span>
                    ))}
                  </div>

                  {/* Offer Banner */}
                  <div className={styles.offerBanner}>
                    <div className={styles.offerLeft}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={styles.tagIcon}
                      >
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                      </svg>
                      <span className={styles.offerText}>{restaurant.offer}</span>
                    </div>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.offerArrow}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
