'use client';

import React from 'react';
import Image from 'next/image';
import { OnboardingButton } from '@/components';

interface SuccessModalProps {
  username: string;
  selectedImage: string;
  closeModal: () => void;
}

const SuccessModal = ({ username, selectedImage, closeModal }: SuccessModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
      <div className="bg-white px-6 rounded-[30px] text-center shadow-lg w-[270px] min-h-[292px] flex items-center justify-center flex-col gap-3.5">
        {selectedImage && (
          <div className="mt-4">
            <Image
              src={selectedImage}
              alt="Selected Avatar"
              width={89}
              height={89}
              className="rounded-full mx-auto"
            />
          </div>
        )}
        <p className="text-xs">
          Congratulations <span className="text-primary">{username}</span> you have successfully
          picked your avatar! You’re all set🚀
        </p>
        <OnboardingButton type="submit" onClick={closeModal}>
          Next
        </OnboardingButton>
      </div>
    </div>
  );
};

export default SuccessModal;
