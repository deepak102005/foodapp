import Navbar from '@/components/Navbar';
import CheckoutSection from '@/components/CheckoutSection';

export const metadata = {
  title: 'Your Cart - ClearBite Checkout',
  description: 'Review your order and proceed to checkout with secure payment options on ClearBite.',
};

export default function CheckoutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafdfa' }}>
      {/* Reference Navbar */}
      <Navbar />

      {/* Checkout Section */}
      <CheckoutSection />
    </main>
  );
}
