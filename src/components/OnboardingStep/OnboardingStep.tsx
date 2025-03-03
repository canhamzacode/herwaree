import Image from 'next/image';
import { ReactNode } from 'react';

interface OnboardingStepProps {
  image?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  bgImage?: string;
  textStyle?: string;
  step: number;
}

const OnboardingStep = ({
  image,
  title,
  description,
  action,
  bgImage,
  textStyle,
  step
}: OnboardingStepProps) => {
  return (
    <div
      className="pb-[78px] flex flex-col gap-[113px] min-h-screen justify-center relative"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : {}
      }
    >
      {/* Image Section */}
      <div className={`flex items-center justify-center mt-[${step === 0 ? '130px' : '85px'}]`}>
        {image && <Image src={image} alt={`Step ${step + 1}`} width={375} height={298} />}
      </div>

      {/* Text & Button Section */}
      <div className="px-2 flex flex-col gap-9 text-center items-center absolute bottom-[82px] w-full">
        <div className="flex flex-col gap-4">
          <div
            className={`flex items-center gap-2 text-2xl font-bold ${textStyle || 'text-primary'}`}
          >
            <h3 className="mx-auto">{title}</h3>
            {step === 0 && <Image src="/icon.png" alt="icon" width={81} height={26} />}
          </div>
          {description && <p>{description}</p>}
        </div>

        <div className="mt-auto px-5 pb-5 w-full">{action}</div>
      </div>
    </div>
  );
};

export default OnboardingStep;
