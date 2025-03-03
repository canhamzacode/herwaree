import { INavProps } from '@/types';
import Link from 'next/link';
import React from 'react';

interface INavigation {
  routes: INavProps[];
  pathname: string;
}

const Navigation = ({ routes, pathname }: INavigation) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-[375px] mx-auto flex justify-around items-center px-4 h-[75px]">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={`flex flex-col items-center gap-1 text-sm transition-all h-[48px] w-[48px] justify-center ${
              pathname === route.path
                ? 'text-primary font-bold bg-[#DA498D33] rounded-[48px]'
                : 'text-gray-500'
            }`}
          >
            {route.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
