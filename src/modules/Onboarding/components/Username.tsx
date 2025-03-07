import { Input } from '@/components';
import React from 'react';

const Username = () => {
  return (
    <div className="flex flex-col gap-5 mt-[225px]">
      <h1 className="text-primary text-xl font-bold text-center">
        What will you like us to call you?
      </h1>
      <Input name="username" placeholder="Input your desired name" className="text-center" />
    </div>
  );
};

export default Username;
