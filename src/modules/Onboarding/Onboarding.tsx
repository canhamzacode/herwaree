'use client';

import React, { useEffect, useState } from 'react';
import { AvatarSelection, SuccessModal, Username } from './components';
import { usernameValidationSchema } from './schema';
import { Form, Formik } from 'formik';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { OnboardingButton, Overlay } from '@/components';
import { avatars } from '@/constants';
import { useRouter } from 'next/navigation';

const Onboarding = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (selectedAvatar) {
      const avatarSrc = avatars.find((avatar) => avatar.id === selectedAvatar)?.src || '';
      setSelectedImage(avatarSrc);
    }
  }, [selectedAvatar]);

  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'error' | 'success';
  }>({
    isOpen: false,
    type: 'success'
  });

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
    router.push('/');
  };

  const steps = [
    {
      component: <Username />,
      validationSchema: usernameValidationSchema
    },
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
      <Formik
        initialValues={{ username: '', avatar: '' }}
        validationSchema={steps[stepIndex].validationSchema}
        onSubmit={(values) => {
          if (stepIndex === 0) {
            setUsername(values.username);
          }

          if (stepIndex === 1) {
            values.avatar = selectedAvatar;
          }

          if (isLastStep) {
            setModal({ isOpen: true, type: 'success' });
            console.log('Final Submission:', values);
          } else {
            next();
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form className="grid gap-10">
            <div>{step}</div>
            <OnboardingButton type="submit" onClick={handleSubmit}>
              {isLastStep ? 'Done' : 'Next'}
            </OnboardingButton>
          </Form>
        )}
      </Formik>

      {/* Success Modal Component */}
      {modal.isOpen && modal.type === 'success' && (
        <SuccessModal username={username} selectedImage={selectedImage} closeModal={closeModal} />
      )}

      {modal.isOpen && <Overlay onClick={closeModal} />}
    </div>
  );
};

export default Onboarding;
