'use client';

import React, { useEffect, useState } from 'react';
import { AvatarSelection, SuccessModal, Username } from './components';
import { usernameValidationSchema } from './schema';
import { Form, Formik } from 'formik';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { OnboardingButton, Overlay } from '@/components';
import { avatars } from '@/constants';
import { useRouter } from 'next/navigation';
import { useAuthState } from '../Auth/context';

// Define FormValues type
interface FormValues {
  username: string;
  avatar: string;
}

// Define modal types
enum ModalType {
  SUCCESS = 'success',
  ERROR = 'error'
}

interface ModalState {
  isOpen: boolean;
  type: ModalType;
}

const Onboarding: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { onboardUser } = useAuthState();
  const router = useRouter();

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: ModalType.SUCCESS
  });

  useEffect(() => {
    if (selectedAvatar) {
      setSelectedImage(avatars.find((avatar) => avatar.id === selectedAvatar)?.src || '');
    }
  }, [selectedAvatar]);

  const closeModal = (): void => {
    setModal({ isOpen: false, type: ModalType.SUCCESS });
    router.push('/');
  };

  const handleSubmit = async (values: FormValues, stepIndex: number): Promise<void> => {
    if (stepIndex === 0) {
      setUsername(values.username);
    } else if (stepIndex === 1) {
      values.avatar = selectedAvatar;
    }

    if (isLastStep) {
      setLoading(true);
      try {
        await onboardUser(values.username, selectedAvatar);
        setModal({ isOpen: true, type: ModalType.SUCCESS });
      } catch (error) {
        console.error('Onboarding failed:', error);
        setModal({ isOpen: true, type: ModalType.ERROR });
      } finally {
        setLoading(false);
      }
    } else {
      next();
    }
  };

  const steps = [
    { component: <Username />, validationSchema: usernameValidationSchema },
    {
      component: (
        <AvatarSelection selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} />
      ),
      validationSchema: null
    }
  ];

  const { step, stepIndex, isLastStep, next } = useMultiStepForm({
    steps: steps.map((s) => s.component)
  });

  return (
    <div className="w-full gap-8 pt-6 flex flex-col">
      <Formik<FormValues>
        initialValues={{ username: '', avatar: '' }}
        validationSchema={steps[stepIndex].validationSchema}
        onSubmit={(values) => handleSubmit(values, stepIndex)}
      >
        {({ handleSubmit }) => (
          <Form className="grid gap-10">
            <div>{step}</div>
            <OnboardingButton type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Processing...' : isLastStep ? 'Done' : 'Next'}
            </OnboardingButton>
          </Form>
        )}
      </Formik>

      {/* Success & Error Modal */}
      {modal.isOpen && (
        <>
          {modal.type === ModalType.SUCCESS ? (
            <SuccessModal
              username={username}
              selectedImage={selectedImage}
              closeModal={closeModal}
            />
          ) : (
            <p className="text-red-500 text-center">Onboarding failed. Please try again.</p>
          )}
          <Overlay onClick={closeModal} />
        </>
      )}
    </div>
  );
};

export default Onboarding;
