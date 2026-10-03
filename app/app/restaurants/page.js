'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import RestaurantsHero from '@/components/RestaurantsHero';
import TopRestaurantsSection from '@/components/TopRestaurantsSection';

export default function RestaurantsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Reference Navbar */}
      <Navbar />

      {/* Hero Section with Search, Scenery, and Category Filters */}
      <RestaurantsHero
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      {/* Top Restaurants Grid */}
      <TopRestaurantsSection
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        sortBy={sortBy}
      />
    </main>
  );
}
