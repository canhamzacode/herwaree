'use client';
import { Calendar } from '@/components';
import React, { useEffect } from 'react';
import { useAuthState } from '../Auth/context';
import { COLORS } from '@/constants';
import { IoCreateOutline } from 'react-icons/io5';
import { CiBellOn } from 'react-icons/ci';
import Link from 'next/link';

const Reminder = () => {
  const { getUserInfo, authUser } = useAuthState();

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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col w-full gap-5 px-5 mt-5 overflow-x-hidden">
      <div className="flex justify-between items-center gap-4">
        <div className="text-3xl font-bold">
          Good Morning, <br />{' '}
          <span className="text-[#DA498D] capitalize">{authUser?.username}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/reminder/create">
            <button className="bg-[#D9D9D96E] h-7 w-7 rounded-full flex items-center justify-center">
              <IoCreateOutline size={20} />
            </button>
          </Link>

          <button className="bg-[#D9D9D96E] h-7 w-7 rounded-full flex items-center justify-center">
            <CiBellOn size={20} />
          </button>
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
    </div>
  );
};

export default Reminder;
