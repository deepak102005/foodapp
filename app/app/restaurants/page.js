'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import RestaurantsHero from '@/components/RestaurantsHero';
import TopRestaurantsSection from '@/components/TopRestaurantsSection';

function RestaurantsContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('search') || searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'all';

  const [customCategory, setCustomCategory] = useState(null);
  const [customSearchQuery, setCustomSearchQuery] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');

  const activeCategory = customCategory ?? urlCategory;
  const searchQuery = customSearchQuery ?? urlQuery;

  const handleSelectCategory = (categoryId) => {
    setCustomCategory(categoryId);
  };

  const handleSearchChange = (query) => {
    setCustomSearchQuery(query);
  };

  const handleSearchSubmit = (query) => {
    setCustomSearchQuery(query);
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

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#ffffff' }} />}>
      <RestaurantsContent />
    </Suspense>
  );
}

