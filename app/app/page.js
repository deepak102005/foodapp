import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExploreByCategory from '@/components/ExploreByCategory';
import TopRestaurantsSection from '@/components/TopRestaurantsSection';
import ClearInfoSection from '@/components/ClearInfoSection';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ExploreByCategory />
      <TopRestaurantsSection />
      <ClearInfoSection />
    </main>
  );
}
