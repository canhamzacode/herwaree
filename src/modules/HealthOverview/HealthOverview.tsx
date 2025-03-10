import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const HealthOverview = () => {
  const overViews = [
    {
      title: 'Self examination guide',
      link: '/self-examination'
    },
    {
      title: 'Diet recommendation',
      link: '/diet-recommendation'
    },
    {
      title: 'Virtual connect with Doctors',
      link: '/virtual-connect'
    },
    {
      title: 'Risk prediction',
      link: '/risk-prediction'
    }
  ];

  return (
    <div className="w-full mt-9 flex flex-col gap-16">
      <div className="w-full max-w-[238px] mx-auto flex flex-col gap-3.5">
        <div className="flex items-center justify-center">
          <div className="w-[111px] h-[88px] bg-red-200 rounded-[10px]">
            <Image src="/overview.png" width={111} height={88} alt="health-overview" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[31px]">
          <h3 className="text-xl text-primary font-bold text-center">Breast Health Overview</h3>
          <Link
            href="/blogs"
            className="w-[81px] h-[28px] text-xs border-primary border text-primary flex items-center rounded-2xl bg-primary/25 justify-center"
          >
            Tips
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        {overViews.map((item, index) => (
          <Link href={item.link} key={index}>
            <div className="w-full flex items-center justify-between border-b border-b-[#C4C4C4]">
              <h3 className="text-[13px] text-[#818181] font-medium">{item.title}</h3>
              <FaChevronRight size={13} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HealthOverview;
