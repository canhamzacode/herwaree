'use client';
import { Calendar, Feeds } from '@/components';
import { COLORS } from '@/constants';
import Image from 'next/image';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Home = () => {
  const data = [
    {
      title: 'Lifestyle Tips',
      description:
        'Discover simple lifestyle changes that can significantly reduce your breast cancer risk.',
      slug: '/lifestyle-tips',
      image: '/lifeStyle.png'
    },
    {
      title: 'Mammogram',
      description: 'Learn about the symptoms of breast cancer and when to see a doctor.',
      slug: '/breast-cancer-symptoms',
      image: '/mammogram.png'
    },
    {
      title: 'Community',
      description: 'Connect with Community to Share Your Story and Find Support.',
      slug: '/breast-cancer-prevention',
      image: '/community.png'
    },
    {
      title: 'Community',
      description:
        'Empower Women Through Crypto Donation: Support Breast Cancer Research and Support Programs',
      slug: '/breast-cancer-prevention',
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

  return (
    <div className="flex flex-col w-full gap-5 px-5 overflow-x-hidden">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[43px] h-[43px] rounded-[43px] bg-red-300">
            <Image
              src="/avatar1.png"
              alt="profile"
              width={43}
              height={43}
              className="rounded-[43px]"
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Hi, Amira</h1>
            <p className="text-[10px] text-gray-500">How are you today?</p>
          </div>
        </div>
        <div>
          <BsThreeDotsVertical size={20} />
        </div>
      </div>

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
