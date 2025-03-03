'use client';
import { Feeds } from '@/components';
import React from 'react';
import { CiBellOn, CiSearch } from 'react-icons/ci';
import { MdFilterList } from 'react-icons/md';

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
        'Empower Women Through Crypto Donation: Support Breast Cancer Research and  Support Programs',
      slug: '/breast-cancer-prevention',
      image: '/SOL.png'
    }
  ];

  return (
    <div className="flex flex-col w-full gap-5 px-5">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[43px] h-[43px] rounded-[43px] bg-red-300"></div>
          <div>
            <h1 className="text-sm font-semibold">Hi, Amira</h1>
            <p className="text-[10px] text-gray-500">How are you today?</p>
          </div>
        </div>
        <div className="w-[40px] h-[40px] rounded-[40px] border border-[#C9C9C9] flex items-center justify-center">
          <CiBellOn size={20} />
        </div>
      </div>
      <div className="w-full px-2 h-[33px] text-[#C9C9C9] flex items-center border border-[#C9C9C9] rounded-[100px] text-sm justify-between">
        <div className="flex items-center w-full gap-2">
          <CiSearch size={20} />
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-full bg-transparent outline-none text-xs "
          />
        </div>
        <button className="bg-primary h-[25px] w-[25px] text-white flex items-center justify-center rounded-[25px]">
          <MdFilterList size={15} />
        </button>
      </div>
      <Feeds data={data} />
    </div>
  );
};

export default Home;
