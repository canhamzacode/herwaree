import React from 'react';
import { Button } from '../Button';
import { ResultData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../Header';

interface IAcessmentResultProps {
  resultData: ResultData;
}

const AcessmentResult = ({ resultData }: IAcessmentResultProps) => {
  const result = [resultData.riskLevel, resultData.recommendation, resultData.details];
  return (
    <div>
      <Header
        showProfile={false}
        hasBackButton={false}
        rightComponent={
          <div className="flex items-end justify-end w-full">
            <Button className="!w-[124px] text-xs !h-[29px]" variant="outline">
              Set Reminder
            </Button>
          </div>
        }
      />
      <div className="flex flex-col gap-4 items-center justify-center mt-10 text-center">
        <div className="">
          <Image alt="result" src="/result.png" width={285} height={202} />
        </div>
        <h2 className="text-lg font-bold text-primary text-center">
          SCREENING PLAN : <br /> INCREASED SCREENING RECOMMENDED
        </h2>
        <p className="text-sm text-gray-600">
          This is based on the answers you gave in the screening quiz that indicated :
        </p>
        <div className="flex flex-col gap-3">
          {result.map((item, index) => (
            <div key={index} className="w-full flex gap-4 items-center text-left">
              <div>
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              </div>
              <p key={index} className="text-sm text-gray-600">
                {item}
              </p>
            </div>
          ))}
        </div>
        <Link href="/" className="w-full">
          <Button className="mt-6 text-sm">Go back to homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default AcessmentResult;
