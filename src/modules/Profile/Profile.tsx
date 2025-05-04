'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '../Auth/context';
import { COLORS } from '@/constants';
import { Sidebar } from '@/components';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ProfilePage = () => {
  const { getUserInfo, authUser, logout } = useAuthState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const upComingActivities = [
    {
      type: 'period',
      title: 'Your self breast examination date is scheduled for March 11'
    },
    {
      type: 'ovulation',
      title: 'Your ovulation date is on March 15'
    },
    {
      type: 'breast-test',
      title: 'Your period is likely to start on or around March 11'
    }
  ];

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-full gap-6 px-5 py-6 overflow-x-hidden relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden border">
            <Image
              src="/avatar1.png"
              alt="profile"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold capitalize">{authUser?.username || 'User'}</h2>
            <p className="text-xs text-gray-600">{authUser?.email || 'No email provided'}</p>
          </div>
        </div>
        <button onClick={toggleModal}>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>
      {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={toggleModal} />}

      {/* Activity Section */}
      <div>
        <h3 className="text-md font-semibold mb-2">Upcoming Activities</h3>
        <div className="grid gap-3">
          {upComingActivities.map((item, index) => {
            const eventColor = COLORS.find((c) => c.type === item.type)?.color;
            return (
              <div
                key={index}
                className="w-full flex items-center justify-between p-3 text-sm rounded-md"
                style={{ backgroundColor: eventColor || '#f0f0f0' }}
              >
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
