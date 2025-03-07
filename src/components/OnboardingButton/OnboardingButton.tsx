import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const OnboardingButton = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  type = 'button'
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`h-[41px] w-full rounded-[30px] font-bold flex items-center justify-center ${
        variant === 'primary' ? 'bg-primary text-white' : 'border border-primary text-primary'
      }`}
    >
      {children}
    </button>
  );
};

export default OnboardingButton;
