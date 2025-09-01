import React, { useState } from 'react';
import { CreditCard, X, Smartphone, QrCode } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: () => void;
  eventTitle?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onPaymentSuccess,
  eventTitle = 'Event Registration'
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const [upiData, setUpiData] = useState({
    upiId: '',
    upiMethod: 'id', // 'id' or 'qr'
  });

  // Validation functions
  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      return 'Card number must be 16 digits';
    }
    return '';
  };

  const validateExpiryDate = (expiryDate: string) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return 'Expiry date must be in MM/YY format';
    }
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return 'Card has expired';
    }
    
    return '';
  };

  const validateCVV = (cvv: string) => {
    if (!/^\d{3,4}$/.test(cvv)) {
      return 'CVV must be 3 or 4 digits';
    }
    return '';
  };

  const validateUpiId = (upiId: string) => {
    if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      return 'Please enter a valid UPI ID (e.g., user@paytm)';
    }
    return '';
  };

  // Format functions
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.substring(0, 16);
    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const formatCVV = (value: string) => {
    return value.replace(/\D/g, '').substring(0, 4);
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let error = '';

    switch (name) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        error = validateCardNumber(formattedValue);
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(value);
        error = validateExpiryDate(formattedValue);
        break;
      case 'cvv':
        formattedValue = formatCVV(value);
        error = validateCVV(formattedValue);
        break;
      case 'cardholderName':
        if (value.length < 2) {
          error = 'Cardholder name must be at least 2 characters';
        }
        break;
    }

    setCardData({
      ...cardData,
      [name]: formattedValue,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleUpiInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'upiId') {
      error = validateUpiId(value);
    }

    setUpiData({
      ...upiData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before processing
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'card') {
      newErrors.cardNumber = validateCardNumber(cardData.cardNumber);
      newErrors.expiryDate = validateExpiryDate(cardData.expiryDate);
      newErrors.cvv = validateCVV(cardData.cvv);
      if (cardData.cardholderName.length < 2) {
        newErrors.cardholderName = 'Cardholder name must be at least 2 characters';
      }
    } else if (paymentMethod === 'upi') {
      if (upiData.upiMethod === 'id') {
        newErrors.upiId = validateUpiId(upiData.upiId);
      }
    }

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    alert(`Payment of ₹${amount} successful! Registration confirmed for ${eventTitle}.`);
    onPaymentSuccess();
    onClose();
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-300">Secure Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
          <h3 className="font-semibold text-white mb-2">{eventTitle}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Amount to Pay:</span>
            <span className="text-2xl font-bold text-purple-300">₹{amount}</span>
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
                  name="cardNumber"
                  required
                  value={cardData.cardNumber}
                  onChange={handleCardInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-colors ${
                    errors.cardNumber ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400'
                  }`}
                />
                {errors.cardNumber && (
                  <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Enter 16-digit card number</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    required
                    value={cardData.expiryDate}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.expiryDate ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400'
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Format: MM/YY</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    required
                    value={cardData.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.cvv ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400'
                    }`}
                  />
                  {errors.cvv && (
                    <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">3-4 digit security code</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  required
                  value={cardData.cardholderName}
                  onChange={handleCardInputChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-colors ${
                    errors.cardholderName ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400'
                  }`}
                />
                {errors.cardholderName && (
                  <p className="text-red-400 text-sm mt-1">{errors.cardholderName}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Name as it appears on card</p>
              </div>

              {/* Accepted Cards */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-400">Accepted cards:</span>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                  <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                  <div className="w-8 h-5 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">DISC</div>
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'upi' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  UPI Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setUpiData({ ...upiData, upiMethod: 'id' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      upiData.upiMethod === 'id'
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-slate-600 bg-slate-700/30 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">UPI ID</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiData({ ...upiData, upiMethod: 'qr' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      upiData.upiMethod === 'qr'
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-slate-600 bg-slate-700/30 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">QR Code</span>
                  </button>
                </div>
              </div>

              {upiData.upiMethod === 'id' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    required
                    value={upiData.upiId}
                    onChange={handleUpiInputChange}
                    placeholder="yourname@paytm"
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.upiId ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400'
                    }`}
                  />
                  {errors.upiId && (
                    <p className="text-red-400 text-sm mt-1">{errors.upiId}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Enter your UPI ID (e.g., user@paytm, user@phonepe)</p>
                </div>
              )}

              {upiData.upiMethod === 'qr' && (
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <QrCode className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Scan QR Code to Pay</p>
                  <p className="text-sm text-gray-400">
                    Open any UPI app and scan the QR code to complete payment
                  </p>
                  <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-purple-300 text-sm font-medium">Amount: ₹{amount}</p>
                  </div>
                </div>
              )}

              {/* Popular UPI Apps */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Popular UPI Apps:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">Google Pay</span>
                  <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">PhonePe</span>
                  <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">Paytm</span>
                  <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">BHIM</span>
                  <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">Amazon Pay</span>
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

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {paymentMethod === 'upi' && upiData.upiMethod === 'qr' ? 'Waiting for Payment...' : 'Processing...'}
                </>
              ) : (
                <>
                  {paymentMethod === 'card' ? (
                    <CreditCard className="w-4 h-4" />
                  ) : (
                    <Smartphone className="w-4 h-4" />
                  )}
                  Pay ₹{amount}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Payment Gateway Info */}
        <div className="mt-6 pt-4 border-t border-slate-600">
          <p className="text-xs text-gray-400 text-center">
            Powered by {paymentMethod === 'card' ? 'Stripe' : 'Razorpay'} • 
            Payments are processed securely • 
            No card details are stored
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;