import { avatars } from '@/constants';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

interface IAvatarSelectionProps {
  selectedAvatar: string;
  setSelectedAvatar: Dispatch<SetStateAction<string>>;
}

const AvatarSelection = ({ selectedAvatar, setSelectedAvatar }: IAvatarSelectionProps) => {
  return (
    <div className="flex flex-col gap-10 mt-[225px]">
      <h1 className="text-primary text-xl font-bold text-center">Please Select Your Avatar</h1>
      <div className="w-full grid grid-cols-4 gap-5">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className={`w-[75px] h-[75px] bg-gray-500 rounded-full cursor-pointer 
              ${selectedAvatar === avatar.id ? 'border-2 border-primary' : ''}`}
            onClick={() => setSelectedAvatar(avatar.id)}
          >
            <Image
              src={avatar.src}
              alt="avatar"
              className="w-full h-full rounded-full"
              width={75}
              height={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelection;
