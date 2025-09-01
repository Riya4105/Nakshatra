import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, X, Smartphone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handleCheckout = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    setShowCheckout(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would integrate with payment gateway
    alert('Payment successful! You will receive confirmation emails shortly.');
    clearCart();
    setShowCheckout(false);
    navigate('/profile');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-300 mb-8">
            Discover amazing astronomy events and add them to your cart to get started.
          </p>
          <button
            onClick={() => navigate('/events')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-gray-300">Review your selected events before checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-2xl font-bold text-purple-300 mb-4">
                      ₹{item.price}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 p-2 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-300">
                  <span>{item.title} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="border-slate-600" />
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-4 border border-red-500/30 text-red-400 hover:bg-red-500/20 py-3 px-6 rounded-xl font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-purple-300">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-300">
                      <span>{item.title} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <hr className="border-slate-600" />
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Choose Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-slate-600 bg-slate-700/30 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Card Payment</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-slate-600 bg-slate-700/30 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">UPI Payment</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                      />
                      <p className="text-xs text-gray-400 mt-1">Enter 16-digit card number</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          required
                          maxLength={5}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">Format: MM/YY</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          required
                          maxLength={4}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">3-4 digit code</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                      />
                      <p className="text-xs text-gray-400 mt-1">Name as it appears on card</p>
                    </div>
                  </>
                )}

                {paymentMethod === 'upi' && (
                  <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                        UPI ID *
                  </label>
                      <input
                        type="text"
                        placeholder="yourname@paytm"
                        required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                      />
                      <p className="text-xs text-gray-400 mt-1">Enter your UPI ID (e.g., user@paytm, user@phonepe)</p>
                </div>

                    {/* Popular UPI Apps */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Popular UPI Apps:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">Google Pay</span>
                        <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">PhonePe</span>
                        <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">Paytm</span>
                        <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">BHIM</span>
                    </div>
                    </div>
                  </>
                )}

                {/* Security Notice */}
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-green-300 text-sm font-medium mb-1">Secure Payment</p>
                      <p className="text-green-200 text-xs">
                        Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Pay ₹{getTotalPrice()}
                  </button>
                </div>
              </form>

              {/* Payment Gateway Info */}
              <div className="mt-6 pt-4 border-t border-slate-600">
                <p className="text-xs text-gray-400 text-center">
                  Powered by {paymentMethod === 'card' ? 'Stripe' : 'Razorpay'} • 
                  Payments are processed securely • 
                  No payment details are stored
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;