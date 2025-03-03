import React from 'react';
import { FeedCard } from '../FeedCard';
import { IFeedCard } from '@/types';

interface IFeedProps {
  data: IFeedCard[];
}

const Feeds = ({ data }: IFeedProps) => {
  return (
    <div className="grid gap-3 grid-cols-2">
      {data.map((item, index) => (
        <FeedCard {...item} key={index} />
      ))}
    </div>
  );
};

export default Feeds;
