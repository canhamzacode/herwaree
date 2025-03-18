'use client';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

interface IHeaderProps {
  title?: string;
  hasBackButton?: boolean;
  showProfile?: boolean;
  rightComponent?: ReactNode;
}

const Header = ({
  title,
  hasBackButton = true,
  showProfile = true,
  rightComponent
}: IHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full flex items-center justify-between">
      {hasBackButton && (
        <button
          onClick={handleBack}
          className="w-[45px] h-[45px] rounded-xl border border-primary flex items-center justify-center text-primary"
        >
          <IoMdArrowRoundBack />
        </button>
      )}
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      {showProfile && (
        <div className="w-[43px] h-[43px] rounded-[43px] bg-red-300">
          <Image
            src="/avatar1.png"
            alt="profile"
            width={43}
            height={43}
            className="rounded-[43px]"
          />
        </div>
      )}
      {rightComponent}
    </div>
  );
};

export default Header;
