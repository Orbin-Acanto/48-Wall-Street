'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Tag,
  Calendar,
  Send,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CustomButton from './CustomButton';
import ContactFormModal from './ContactFormModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const {
    cart,
    summary,
    appliedPromo,
    updateQuantity,
    updateRentalDays,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput);
    setPromoMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });

    if (result.success) {
      setPromoInput('');
      setTimeout(() => setPromoMessage(null), 3000);
    }
  };

  const handleOpenContactForm = () => {
    if (cart.length === 0) return;
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  const handleSubmitProposal = async (contactInfo: ContactInfo) => {
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const proposalData = {
        items: cart,
        summary,
        appliedPromo,
        contactInfo,
        timestamp: new Date().toISOString(),
      };

      const webhookUrl = '/api/rental';

      if (!webhookUrl) {
        console.error('Webhook URL not configured');
        alert('Configuration error. Please contact support.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert(
        'Proposal submitted successfully! Our team will contact you shortly.'
      );
      clearCart();
      setShowContactForm(false);
      onClose();
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert(
        'There was an error submitting your proposal. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-gray-800 bg-gray-900 p-6">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6 text-white" />
                  <h2 className="font-primary text-2xl text-white uppercase">
                    Your Cart
                  </h2>
                  {cart.length > 0 && (
                    <span className="bg-primary text-dark-black flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-800"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ShoppingCart className="mb-4 h-20 w-20 text-gray-300" />
                    <h3 className="font-secondary text-dark-black mb-2 text-xl font-bold">
                      Your cart is empty
                    </h3>
                    <p className="font-secondary text-gray-600">
                      Add some rental items to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        {/* Image */}
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-primary text-dark-black text-lg uppercase">
                                {item.name}
                              </h3>
                              <p className="font-secondary text-sm text-gray-500">
                                ${item.price} per day
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="cursor-pointer text-gray-400 transition-colors hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mb-2 flex items-center gap-2">
                            <span className="font-secondary text-xs text-gray-600 uppercase">
                              Qty:
                            </span>
                            <div className="text-dark-black flex items-center gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="cursor-pointer border border-gray-300 p-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-secondary w-8 text-center text-sm text-gray-600">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="cursor-pointer border border-gray-300 p-1 transition-colors hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Rental Days */}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-600" />
                            <span className="font-secondary text-xs text-gray-600">
                              Rental Days:
                            </span>
                            <input
                              type="number"
                              min="1"
                              value={item.rentalDays}
                              onChange={(e) =>
                                updateRentalDays(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="font-secondary focus:ring-primary w-16 border border-gray-300 px-2 py-1 text-sm text-gray-600 focus:outline-none"
                            />
                            {item.rentalDays >= 3 && (
                              <span className="bg-primary/20 text-primary font-secondary px-2 py-0.5 text-xs font-bold">
                                {item.rentalDays >= 14
                                  ? '15% OFF'
                                  : item.rentalDays >= 7
                                    ? '10% OFF'
                                    : '5% OFF'}
                              </span>
                            )}
                          </div>

                          {/* Item Total */}
                          <div className="mt-2 text-right">
                            <span className="font-primary text-primary text-xl font-bold">
                              $
                              {(
                                item.price *
                                item.quantity *
                                item.rentalDays
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Clear Cart Button */}
                    {cart.length > 0 && (
                      <CustomButton
                        onClick={clearCart}
                        className="hover:bg-primary/80 w-full text-white"
                      >
                        Clear All Items
                      </CustomButton>
                    )}
                  </div>
                )}
              </div>

              {/* Footer - Summary & Checkout */}
              {cart.length > 0 && (
                <div className="border-t-2 border-gray-200 bg-gray-50 p-6">
                  {/* Promo Code */}
                  <div className="mb-4">
                    <label className="font-secondary mb-2 block text-xs font-bold text-gray-600 uppercase">
                      Promo Code
                    </label>
                    {appliedPromo ? (
                      <div className="bg-primary/10 flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                          <Tag className="text-primary h-4 w-4" />
                          <span className="font-secondary text-dark-black text-sm font-bold">
                            {appliedPromo.code}
                          </span>
                          <span className="font-secondary text-xs text-gray-600">
                            - {appliedPromo.description}
                          </span>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="cursor-pointer text-gray-600 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === 'Enter' && handleApplyPromo()
                          }
                          placeholder="Enter code"
                          className="font-secondary focus:ring-primary flex-1 border border-gray-300 px-3 py-2 text-sm text-gray-600 uppercase focus:ring-2 focus:outline-none"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="bg-dark-black font-secondary text-whitesmoke hover:bg-primary cursor-pointer px-4 text-sm font-semibold transition-all"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {promoMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-2 flex items-center gap-2 text-sm ${
                          promoMessage.type === 'success'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        <AlertCircle className="h-4 w-4" />
                        {promoMessage.text}
                      </motion.div>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="font-secondary mb-4 space-y-2 border-t border-gray-300 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-bold text-gray-600">
                        ${summary.subtotal.toFixed(2)}
                      </span>
                    </div>
                    {summary.multiDayDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Multi-day Discount:</span>
                        <span className="font-bold">
                          -${summary.multiDayDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {summary.promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount:</span>
                        <span className="font-bold">
                          -${summary.promoDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8.75%):</span>
                      <span className="font-bold text-gray-600">
                        ${summary.tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-primary flex justify-between border-t-2 pt-2 text-lg">
                      <span className="font-bold">Total:</span>
                      <span className="text-primary font-primary text-2xl font-bold">
                        ${summary.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleOpenContactForm}
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 font-secondary flex w-full cursor-pointer items-center justify-center gap-2 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                    Submit for Proposal
                  </button>
                  <p className="font-secondary mt-2 text-center text-xs text-gray-600">
                    Our team will review and contact you within 24 hours
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={showContactForm}
        onClose={handleCloseContactForm}
        onSubmit={handleSubmitProposal}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
