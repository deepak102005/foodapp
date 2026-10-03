import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExploreByCategory from '@/components/ExploreByCategory';
import ClearInfoSection from '@/components/ClearInfoSection';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ExploreByCategory />
      <ClearInfoSection />
    </main>
  );
}
