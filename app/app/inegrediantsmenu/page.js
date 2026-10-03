import Navbar from '@/components/Navbar';
import IngredientsDetail from '@/components/IngredientsDetail';
import IngredientsRecommendations from '@/components/IngredientsRecommendations';

export const metadata = {
  title: 'Quinoa Power Bowl - Ingredients & Nutrition | ClearBite',
  description:
    'Fresh quinoa, roasted vegetables, avocado, and healthy seeds with complete allergen and nutritional breakdown.',
};

export default function IngredientsMenuPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Reference Navbar */}
      <Navbar />

      {/* Main Quinoa Power Bowl with Ingredients & Nutrition Accordion */}
      <IngredientsDetail />

      {/* Recommendations Carousel/Grid */}
      <IngredientsRecommendations />
    </main>
  );
}
