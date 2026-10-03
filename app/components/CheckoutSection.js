'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './CheckoutSection.module.css';

const initialCart = [
  {
    id: 1,
    name: 'Quinoa Power Bowl',
    price: 249,
    desc: 'Quinoa, roasted veggies, avocado, seeds.',
    image: '/quinoa-power-bowl.jpg',
    tags: [
      { text: 'Vegan', isGreen: true },
      { text: 'Gluten Free', isGreen: true },
    ],
    quantity: 1,
  },
  {
    id: 2,
    name: 'Fresh Lime Soda',
    price: 89,
    desc: 'Refreshing lime soda with a hint of mint.',
    image: '/checkout-lime-soda.jpg',
    tags: [],
    quantity: 1,
  },
];

const crossSellItems = [
  { id: 101, name: 'Chocolate Brownie', price: 129, image: '/checkout-brownie.jpg' },
  { id: 102, name: 'Peri Peri Fries', price: 149, image: '/checkout-fries.jpg' },
  { id: 103, name: 'Tomato Soup', price: 119, image: '/checkout-soup.jpg' },
  { id: 104, name: 'Mango Smoothie', price: 149, image: '/checkout-smoothie.jpg' },
];

export default function CheckoutSection() {
  const [cart, setCart] = useState(initialCart);
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [address, setAddress] = useState('Flat 203, Sri Sai Residency, Madhapur, Hyderabad - 500081');
  const [isChangingAddress, setIsChangingAddress] = useState(false);

  // Cart operations
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addItemToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) => (x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x));
      }
      return [...prev, { ...item, desc: 'Popular add-on item', tags: [], quantity: 1 }];
    });
  };

  // Calculations
  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const taxes = cart.length > 0 ? 32 : 0;
  const grandTotal = itemTotal + deliveryFee + taxes;
  const savings = 60;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className={styles.section}>
      {/* Decorative Mint Leaves in background */}
      <div className={styles.decorLeafTopRight}>
        <Image src="/hd-hero-leaf-left.png" alt="Leaf" width={85} height={120} className={styles.leafImg} />
      </div>
      <div className={styles.decorLeafBottomLeft}>
        <Image src="/hd-hero-leaf-left.png" alt="Leaf" width={95} height={130} className={styles.leafImg} />
      </div>

      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <a href="#" className={styles.breadcrumbLink}>Home</a>
          <span className={styles.breadcrumbSep}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>Your Cart</span>
        </nav>

        {/* Two-Column Checkout Layout */}
        <div className={styles.checkoutLayout}>
          {/* ================= LEFT COLUMN ================= */}
          <div className={styles.leftColumn}>
            {/* Header: Back Button + Title */}
            <div className={styles.cartHeader}>
              <button className={styles.backBtn} aria-label="Go Back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <div>
                <h1 className={styles.cartTitle}>Your Cart</h1>
                <p className={styles.cartSubtitle}>
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} • Delivering to Hyderabad
                </p>
              </div>
            </div>

            {/* Cart Items Box */}
            <div className={styles.cartBox}>
              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    {/* Item Image */}
                    <div className={styles.itemImgWrapper}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={90}
                        height={90}
                        className={styles.itemImg}
                      />
                    </div>

                    {/* Item Details */}
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <span className={styles.itemPrice}>₹{item.price}</span>
                      <p className={styles.itemDesc}>{item.desc}</p>

                      {item.tags && item.tags.length > 0 && (
                        <div className={styles.tagsRow}>
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className={styles.itemTag}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-9 9-9 4.5 0 7 2 7 7a7 7 0 0 1-9 9z" />
                                <path d="M12 10a4 4 0 0 0-4 4" />
                              </svg>
                              {tag.text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quantity Stepper & Trash */}
                    <div className={styles.itemActions}>
                      <div className={styles.stepper}>
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className={styles.stepperBtn}
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className={styles.stepperQty}>{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className={styles.stepperBtn}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.trashBtn}
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Special Instructions Input */}
              <div className={styles.instructionsWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.instructIcon}>
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <input
                  type="text"
                  placeholder="Add special instructions (optional)"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value.slice(0, 200))}
                  className={styles.instructionsInput}
                />
                <span className={styles.instructCounter}>{instructions.length}/200</span>
              </div>
            </div>

            {/* Frequently Bought Together Box */}
            <div className={styles.frequentlyBox}>
              <div className={styles.frequentlyHeader}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0d3822" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2v8a3 3 0 0 1-3 3h-2" />
                  <path d="M15 2v8" />
                  <path d="M12 2v8a3 3 0 0 0 3 3" />
                  <path d="M15 13v9" />
                  <path d="M6 2v20" />
                  <path d="M6 2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4" />
                </svg>
                <h3 className={styles.frequentlyTitle}>Frequently Bought Together</h3>
              </div>

              <div className={styles.frequentlyGrid}>
                {crossSellItems.map((item) => (
                  <div key={item.id} className={styles.crossSellCard}>
                    <div className={styles.crossSellImgWrapper}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={140}
                        height={85}
                        className={styles.crossSellImg}
                      />
                    </div>
                    <div className={styles.crossSellFooter}>
                      <div className={styles.crossSellInfo}>
                        <span className={styles.crossSellName}>{item.name}</span>
                        <span className={styles.crossSellPrice}>₹{item.price}</span>
                      </div>
                      <button
                        onClick={() => addItemToCart(item)}
                        className={styles.crossSellAddBtn}
                        aria-label={`Add ${item.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
          <div className={styles.rightColumn}>
            <div className={styles.summaryCard}>
              {/* Header */}
              <div className={styles.summaryHeader}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
              </div>

              {/* Price Breakdown */}
              <div className={styles.breakdownList}>
                <div className={styles.breakdownRow}>
                  <span>Item Total</span>
                  <span className={styles.rowVal}>₹{itemTotal}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Delivery Fee</span>
                  <span className={styles.rowVal}>₹{deliveryFee}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Taxes &amp; Charges</span>
                  <span className={styles.rowVal}>₹{taxes}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalVal}>₹{grandTotal}</span>
              </div>

              {/* Savings Alert */}
              <div className={styles.savingsBadge}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={styles.tagIcon}>
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span>You are saving ₹{savings} on this order!</span>
              </div>

              {/* Delivering to section */}
              <div className={styles.deliverySection}>
                <div className={styles.sectionTitleRow}>
                  <div className={styles.sectionTitleLeft}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className={styles.sectionHeading}>Delivering to</span>
                  </div>
                  <button onClick={() => setIsChangingAddress(!isChangingAddress)} className={styles.changeBtn}>
                    Change
                  </button>
                </div>
                {isChangingAddress ? (
                  <div className={styles.addressEdit}>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={styles.addressInput}
                    />
                    <button onClick={() => setIsChangingAddress(false)} className={styles.saveAddressBtn}>
                      Save
                    </button>
                  </div>
                ) : (
                  <p className={styles.addressText}>{address}</p>
                )}
              </div>

              {/* Payment Method section */}
              <div className={styles.paymentSection}>
                <div className={styles.sectionTitleRow}>
                  <div className={styles.sectionTitleLeft}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <span className={styles.sectionHeading}>Payment Method</span>
                  </div>
                  <button className={styles.changeBtn}>Change</button>
                </div>

                {/* Radio list */}
                <div className={styles.radioList}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className={styles.radioInput}
                    />
                    <span className={styles.customRadio}></span>
                    <span className={styles.radioText}>UPI (Google Pay, PhonePe, Paytm)</span>
                  </label>

                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className={styles.radioInput}
                    />
                    <span className={styles.customRadio}></span>
                    <span className={styles.radioText}>Credit / Debit Card</span>
                  </label>

                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className={styles.radioInput}
                    />
                    <span className={styles.customRadio}></span>
                    <span className={styles.radioText}>Cash on Delivery</span>
                  </label>

                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                      className={styles.radioInput}
                    />
                    <span className={styles.customRadio}></span>
                    <span className={styles.radioText}>Wallet</span>
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <button className={styles.checkoutBtn}>
                <span>Proceed to Checkout</span>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {/* 100% Secure Payments trust */}
              <div className={styles.trustBadge}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <span>100% Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
