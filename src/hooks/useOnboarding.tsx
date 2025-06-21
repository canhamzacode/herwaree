'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingButton } from '@/components';

export function useOnboarding() {
  const router = useRouter();

  const onboardingSteps = [
    {
      image: '/onboarding1.png',
      title: 'Welcome to Herwaree',
      description:
        "Your journey to better breast health starts here. Let's empower you with knowledge and tools to stay proactive and confident."
    },
    {
      image: '/onboarding2.png',
      title: 'Your Health, Your Way',
      description:
        'From self-checks to expert tips, Herwaree is here to support you every step of the way.'
    },
    {
      bgImage: '/bgImage.png',
      title: 'Start Here With Herwaree',
      textStyle: 'text-white',
      action: (
        <div className="flex flex-col gap-3 w-full">
          <OnboardingButton onClick={() => router.push('/auth')}>Log In</OnboardingButton>
          <OnboardingButton onClick={() => router.push('/auth?mode=register')}>
            Sign Up
          </OnboardingButton>
        </div>
      )
    }
  ];
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/auth');
    }
  };

  return { step, nextStep, onboardingSteps };
}
