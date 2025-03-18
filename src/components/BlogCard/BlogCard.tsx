import Link from 'next/link';
import React from 'react';

interface IBlogCardProps {
  title: string;
  description: string;
  slug: string;
}

const BlogCard = ({ title, description, slug }: IBlogCardProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full h-[98px] bg-red-300 rounded-xl"></div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-sm text-primary">{title}</h3>
        <p className="text-[10px] text-[#818181]">{description.slice(0, 100)}.....</p>
        <Link className="text-[10px] text-primary" href={`/blogs/${slug}`}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
