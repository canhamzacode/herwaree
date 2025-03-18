import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className}  h-[41px] w-full rounded-[30px] font-bold flex items-center justify-center ${
        variant === 'primary' ? 'bg-primary text-white' : 'border border-primary text-primary'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
