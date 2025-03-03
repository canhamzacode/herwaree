import Image from 'next/image';
import React from 'react';

const SplashScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="w-[194px] h-[183px]">
        <Image src="/splashLogo.png" alt="Splash Logo" width={194} height={183} />
      </div>
      <div className="w-full absolute bottom-0 left-0">
        <Image src="/splashFooter.png" alt="Splash Footer" width={375} height={375} />
      </div>
    </div>
  );
};

export default SplashScreen;
