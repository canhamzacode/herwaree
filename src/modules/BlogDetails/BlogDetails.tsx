import { Header } from '@/components';
import React from 'react';

const BlogDetails = () => {
  return (
    <div className="flex flex-col w-full gap-5 px-5 overflow-x-hidden py-6">
      <Header showProfile={false} />
      <div className="flex flex-col gap-3">
        <h3 className="text-xl text-primary font-bold">Yoga for Breast Health</h3>
        <p className="text-sm text-gray-500 mt-2">
          Yoga enhances breast health by improving circulation, reducing stress, balancing hormones,
          boosting immunity, and promoting lymphatic drainage through gentle movements.
        </p>
        <div className="w-full h-[167px] bg-red-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default BlogDetails;
