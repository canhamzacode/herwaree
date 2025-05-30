'use client';
import { Calendar, Feeds, Sidebar } from '@/components';
import { COLORS } from '@/constants';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAuthState } from '../Auth/context';

const Home = () => {
  const { getUserInfo, authUser } = useAuthState();

  console.log('authUser', authUser);

  const data = [
    {
      title: 'Lifestyle Tips',
      description:
        'Discover simple lifestyle changes that can significantly reduce your breast cancer risk.',
      slug: 'lifestyle-tips',
      image: '/lifeStyle.svg'
    },
    {
      title: 'Mammogram',
      description: 'Learn about the symptoms of breast cancer and when to see a doctor.',
      slug: 'breast-cancer-symptoms',
      image: '/mammogram.png'
    },
    {
      title: 'Community',
      description: 'Connect with Community to Share Your Story and Find Support.',
      slug: 'breast-cancer-prevention',
      image: '/community.png'
    },
    {
      title: 'Community',
      description:
        'Empower Women Through Crypto Donation: Support Breast Cancer Research and Support Programs',
      slug: 'breast-cancer-prevention',
      image: '/SOL.png'
    }
  ];

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

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col w-full gap-5 px-5 overflow-x-hidden relative">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[43px] h-[43px] rounded-[43px]">
            <Image
              src="/avatar1.png"
              alt="profile"
              width={43}
              height={43}
              className="rounded-[43px]"
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold">
              Hi, <span className="capitalize">{authUser?.username}</span>
            </h1>
            <p className="text-[10px] text-gray-500">How are you today?</p>
          </div>
        </div>
        <button onClick={toggleModal}>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>
      {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={toggleModal} />}

      <Calendar />

      <div className="my-3 grid gap-3">
        {upComingActivities.map((item, index) => {
          const eventColor = COLORS.find((c) => c.type === item.type)?.color;
          return (
            <div
              key={index}
              className={`w-full bg-${eventColor} flex items-center justify-between p-3 text-sm rounded-md`}
              style={{ backgroundColor: eventColor }}
            >
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>

      <Feeds data={data} />
    </div>
  );
};

export default Home;
