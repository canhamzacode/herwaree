import Link from 'next/link';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiThunderball } from 'react-icons/gi';
import { LuClock10 } from 'react-icons/lu';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const links = [
  {
    title: 'Cyle Length',
    icon: <GiThunderball size={18} />,
    link: '/cycle-length'
  },
  {
    title: 'Reminder',
    icon: <LuClock10 size={18} />,
    link: '/reminder'
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`absolute inset-0 bg-black/30 bg-opacity-40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`absolute top-0 right-0 h-full w-[250px] bg-primary text-white z-50 p-5 flex flex-col gap-8 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleSidebar}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col gap-5 text-sm">
          {links.map((link, index) => (
            <Link href={link.link} key={index} className="flex items-center gap-3">
              {link.icon}
              <p>{link.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
