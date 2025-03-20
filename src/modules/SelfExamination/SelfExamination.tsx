'use client';

import { Button, Header, QuestionCard } from '@/components';
import { questions } from '@/constants';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { useMultiStepQuestionnaire } from '@/hooks/useMultiStepQuestionnaire';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';

const SelfExamination = () => {
  const chunkSize = 2;
  const { steps, initialValues } = useMultiStepQuestionnaire(questions, chunkSize, (q, index) => (
    <QuestionCard
      key={index}
      question={q.question}
      options={q.options}
      name={`question_${index}`}
    />
  ));

  const { stepIndex, next, isLastStep, prev } = useMultiStepForm({
    steps: steps.map((s) => s.component)
  });

  const [startExamination, setStartExamination] = useState(false);

  return (
    <div className="flex flex-col w-full gap-5 px-5 overflow-x-hidden py-6">
      {!startExamination ? (
        <>
          <Header
            showProfile={false}
            rightComponent={
              <Button className="!w-[124px] text-xs !h-[29px]" variant="outline">
                Log symptoms
              </Button>
            }
          />
          <div className="flex flex-col gap-3">
            <h3 className="text-sm text-primary font-bold">Self examination guide</h3>
            <p className="text-xs text-gray-500 mt-2">
              Take a few minutes each month to check your breasts. Look for any changes like lumps,
              dimpling, or unusual pain. Early detection is key! 💕
            </p>
            <div className="w-full h-[167px] bg-red-300 rounded-lg"></div>
          </div>
          <Button className="text-sm" onClick={() => setStartExamination(true)}>
            Start self examination
          </Button>
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (isLastStep) {
              console.log('Final Answers:', values);
            } else {
              next();
            }
          }}
        >
          {({}) => (
            <Form className="grid gap-6">
              <div className="flex flex-col gap-6">{steps[stepIndex].component}</div>

              <div className="flex gap-2 justify-center items-center mt-4">
                {Array.from({ length: steps.length }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === stepIndex ? 'w-6 bg-pink-500' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between gap-4 mt-4">
                <Button
                  type="button"
                  className="text-xs"
                  variant="outline"
                  onClick={prev}
                  disabled={stepIndex === 0}
                >
                  Back
                </Button>

                <Button type="submit" className="text-xs">
                  {isLastStep ? 'Finish' : 'Next'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SelfExamination;
