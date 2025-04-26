import React from 'react';
import { Button } from '../Button';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../Header';
import ReactMarkdown from 'react-markdown';

interface IAcessmentResultProps {
  suggestion: string;
}

const AcessmentResult = ({ suggestion }: IAcessmentResultProps) => {
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
        <div className="flex flex-col gap-3 text-left text-sm">
          <ReactMarkdown>{suggestion}</ReactMarkdown>
        </div>
        <Link href="/" className="w-full">
          <Button className="mt-6 text-sm">Go back to homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default AcessmentResult;
