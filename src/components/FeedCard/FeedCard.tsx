import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IFeedCard {
  title: string;
  description: string;
  slug: string;
  image: string;
}

const FeedCard = ({ title, description, slug, image }: IFeedCard) => {
  return (
    <div className="bg-[#DA498D33] pt-6 flex flex-col gap-5 rounded-[20px] overflow-hidden justify-between min-w-[159px]">
      <div className="flex flex-col gap-1.5 px-2.5">
        <h1 className="text-primary font-bold">{title}</h1>
        <p className="text-[10px]">{description}</p>
        <Link href={`/${slug}`} className="text-primary text-[10px] z-10">
          Learn more
        </Link>
      </div>
      <div className="w-full h-[90px] flex items-end justify-end ">
        <Image src={image} alt="lifestyle" width={150} height={70} />
      </div>
    </div>
  );
};

export default FeedCard;
