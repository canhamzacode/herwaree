'use client';
import { usePrivy } from '@privy-io/react-auth';
import React from 'react';

const Home = () => {
  const { user, logout } = usePrivy();
  console.log('User', user);
  return (
    <div>
      <h1>Welcome To Herwaree {user?.email?.address}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
