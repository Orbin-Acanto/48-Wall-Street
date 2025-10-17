'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Phone, Mail } from 'lucide-react';

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contactInfo: ContactInfo) => Promise<void>;
  isSubmitting: boolean;
}

export default function ContactFormModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: ContactFormModalProps) {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setContactInfo({ name: '', phone: '', email: '' });
      setFormErrors({});
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const errors: { name?: string; phone?: string; email?: string } = {};

    if (!contactInfo.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!contactInfo.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s\-()]+$/.test(contactInfo.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!contactInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      errors.email = 'Invalid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    await onSubmit(contactInfo);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-md bg-white shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b-2 border-gray-800 bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-primary text-xl text-white uppercase">
                  Contact Information
                </h3>
                <button
                  onClick={handleClose}
                  className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              <p className="font-secondary mt-2 text-sm text-gray-400">
                Please provide your details so we can contact you
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4 p-6">
              {/* Name Field */}
              <div>
                <label className="font-secondary mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                  <User className="h-4 w-4" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className={`font-secondary w-full border px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:outline-none ${
                    formErrors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-primary border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="font-secondary mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                  className={`font-secondary w-full border px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:outline-none ${
                    formErrors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-primary border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="font-secondary mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className={`font-secondary w-full border px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:outline-none ${
                    formErrors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-primary border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="font-secondary flex-1 cursor-pointer border-2 border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 font-secondary flex flex-1 cursor-pointer items-center justify-center gap-2 py-3 text-sm font-bold tracking-wider text-white uppercase transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: 'linear',
                        }}
                        className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
