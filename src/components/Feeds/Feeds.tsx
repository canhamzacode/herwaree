'use client';
import React, { useRef, useState, useEffect } from 'react';
import { FeedCard } from '../FeedCard';
import { IFeedCard } from '@/types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface IFeedProps {
  data: IFeedCard[];
}

const Feeds = ({ data }: IFeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="relative">
      {!isAtStart && (
        <button
          onClick={() => scroll(-200)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white bg-opacity-75  w-[40px] h-[40px] flex items-center justify-center rounded-full shadow-lg z-10"
        >
          <FiChevronLeft size={20} />
        </button>
      )}
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto scroll-snap-x-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {data.map((item, index) => (
          <FeedCard {...item} key={index} />
        ))}
      </div>
      {!isAtEnd && (
        <button
          onClick={() => scroll(200)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white bg-opacity-75  w-[40px] h-[40px] flex items-center justify-center rounded-full shadow-lg z-10"
        >
          <FiChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Feeds;
