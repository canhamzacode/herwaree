'use client';
import { Button, Header, ReminderDetailsStep, ReminderFrequencyStep } from '@/components';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { Form, Formik } from 'formik';
import React from 'react';
import { ReminderDetailsSchema, ReminderFrequencySchema } from './schema';

const steps = [
  {
    component: <ReminderDetailsStep />,
    validationSchema: ReminderDetailsSchema
  },
  {
    component: <ReminderFrequencyStep />,
    validationSchema: ReminderFrequencySchema
  }
];

const CreateReminder = () => {
  const { step, stepIndex, isLastStep, isFirstStep, next, prev } = useMultiStepForm({
    steps: steps.map((s) => s.component)
  });
  return (
    <div className="flex flex-col w-full gap-5 px-5 mt-5 overflow-x-hidden">
      <Header title="Reminder" hasBackButton showProfile={false} rightComponent={<div></div>} />
      <div>
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            if (isLastStep) {
              console.log('Final Answers:', values);
            } else {
              next();
            }
          }}
          validationSchema={steps[stepIndex].validationSchema}
        >
          {({ errors }) => {
            console.log(errors);
            return (
              <Form className="grid gap-6">
                <div className="">{step}</div>
                <div className="flex justify-between gap-4 mt-4">
                  {!isFirstStep && (
                    <Button
                      type="button"
                      className="text-xs"
                      variant="outline"
                      onClick={prev}
                      disabled={stepIndex === 0}
                    >
                      Back
                    </Button>
                  )}

                  <Button type="submit" className="text-xs">
                    {isLastStep ? 'Save' : 'Continue'}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateReminder;
