import Navbar from '@/components/Navbar';
import OrderTracking from '@/components/OrderTracking';

export const metadata = {
  title: 'Track Order #CB12345 - ClearBite',
  description: 'Live order tracking with real-time status and delivery map on ClearBite.',
};

export default function TrackingPage() {
  const user = {
    name: 'Deepak',
    avatar: '/user-deepak.jpg',
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafcfb' }}>
      {/* Top Navbar with user profile */}
      <Navbar user={user} />

      {/* Main Order Tracking View with Sidebar, Map, and Order Details */}
      <OrderTracking />
    </main>
  );
}
