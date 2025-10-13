import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function CustomButton({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'font-secondary text-sm tracking-wide uppercase px-8 py-4 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-primary text-dark-black border-2 border-primary hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl',
    secondary:
      'bg-white text-dark-black border-2 border-dark-black hover:bg-gray-50 hover:scale-105 shadow-md hover:shadow-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
