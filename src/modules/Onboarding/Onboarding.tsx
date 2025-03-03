'use client';

import { useOnboarding } from '@/hooks/useOnboarding';
import { OnboardingStep } from '@/components/OnboardingStep';
import { OnboardingButton } from '@/components/OnboardingButton';

export default function Onboarding() {
  const { step, nextStep, onboardingSteps } = useOnboarding();
  const { image, title, description, action, bgImage, textStyle } = onboardingSteps[step];

  return (
    <OnboardingStep
      image={image}
      title={title}
      description={description}
      action={
        action || (
          <OnboardingButton onClick={nextStep}>
            {step < onboardingSteps.length - 1 ? 'Proceed' : 'Get Started'}
          </OnboardingButton>
        )
      }
      bgImage={bgImage}
      textStyle={textStyle}
      step={step}
    />
  );
}
