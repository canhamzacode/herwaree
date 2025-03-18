import { BlogCard, Header } from '@/components';
import React from 'react';

const blogData = [
  {
    title: 'Yoga for Breast Health',
    description:
      'Yoga enhances breast health by improving circulation, reducing stress, balancing hormones, boosting immunity, and promoting lymphatic drainage through gentle movements.',
    slug: 'yoga-for-breast-health'
  },
  {
    title: 'Yoga for Breast Health',
    description:
      'Yoga enhances breast health by improving circulation, reducing stress, balancing hormones, boosting immunity, and promoting lymphatic drainage through gentle movements.',
    slug: 'yoga-for-breast-health'
  },
  {
    title: 'Yoga for Breast Health',
    description:
      'Yoga enhances breast health by improving circulation, reducing stress, balancing hormones, boosting immunity, and promoting lymphatic drainage through gentle movements.',
    slug: 'yoga-for-breast-health'
  },
  {
    title: 'Yoga for Breast Health',
    description:
      'Yoga enhances breast health by improving circulation, reducing stress, balancing hormones, boosting immunity, and promoting lymphatic drainage through gentle movements.',
    slug: 'yoga-for-breast-health'
  }
];

const Blogs = () => {
  return (
    <div className="flex flex-col w-full gap-5 px-5 overflow-x-hidden py-6">
      <Header />
      <div className="">
        <h3 className="text-xl text-primary font-bold">Explore Lifestyle Tips</h3>
      </div>
      <div className="w-ful flex flex-col gap-4">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            description={blog.description}
            slug={blog.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
