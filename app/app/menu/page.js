import Navbar from '@/components/Navbar';
import MenuHeroSection from '@/components/MenuHeroSection';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';

export const metadata = {
  title: 'The Green Bowl - ClearBite Menu',
  description:
    'Explore delicious and healthy options from The Green Bowl. High protein bowls, fresh salads, and nutritious wraps.',
};

export default function MenuPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Reference Navbar */}
      <Navbar />

      {/* Hero Dish & Restaurant Detail Section */}
      <MenuHeroSection />

      {/* Recommended Items Grid */}
      <YouMayAlsoLike />
    </main>
  );
}
