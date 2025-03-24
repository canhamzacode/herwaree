'use client';
import { AcessmentResult, Button, Header, RiskCard } from '@/components';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { useMultiStepQuestionnaire } from '@/hooks/useMultiStepQuestionnaire';
import { ResultData } from '@/types';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

type QuestionType = 'option' | 'text' | 'date';

interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
  description?: string;
  image?: string;
  name: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Do you have breast cancer?',
    type: 'option',
    options: ['Yes', 'No'],
    description: 'Early detection is crucial.',
    image: '/images/breast-cancer-info.png',
    name: 'breast_cancer'
  },
  {
    id: 2,
    question: 'Where are you from?',
    type: 'text',
    description: 'Your location helps personalize advice.',
    name: 'location'
  },
  {
    id: 3,
    question: 'What is your age?',
    type: 'text',
    description: 'Age is a risk factor.',
    name: 'age'
  },
  {
    id: 4,
    question: 'Do you have a family history of breast cancer?',
    type: 'option',
    options: ['Yes', 'No'],
    description: 'Family history increases risk.',
    image: '/images/family-history.png',
    name: 'family_history'
  },
  {
    id: 5,
    question: 'When were your born?',
    type: 'date',
    description: 'Date of birth is a risk factor.',
    name: 'dob'
  },
  {
    id: 6,
    question: 'Do you smoke?',
    type: 'option',
    options: ['Yes', 'No'],
    description: 'Smoking is a risk factor.',
    image: '/images/smoking.png',
    name: 'smoking'
  },
  {
    id: 7,
    question: 'Did you start your period before age 11, or entered menopause before 55?',
    type: 'option',
    options: ['Yes', 'No'],
    description: 'Early periods and late menopause are risk factors.',
    image: '/images/menstrual-cycle',
    name: 'menstrual_cycle'
  },
  {
    id: 8,
    question: 'Have you entered menopause yet? ( no period for atleast 12 months)',
    type: 'option',
    options: ['Yes', 'No'],
    description: 'Menopause is a risk factor.',
    image: '/images/menopause.png',
    name: 'menopause'
  }
];

const RiskPrediction = () => {
  const chunkSize = 1;
  const { steps, initialValues } = useMultiStepQuestionnaire(questions, chunkSize, (q, index) => (
    <RiskCard
      key={index}
      question={q.question}
      options={q.options}
      name={q.name}
      type={q.type}
      description={q.description}
      image={q.image}
    />
  ));

  const { stepIndex, next, isLastStep, prev } = useMultiStepForm({
    steps: steps.map((s) => s.component)
  });

  const [startExamination, setStartExamination] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  const handleSubmit = (values: unknown) => {
    if (isLastStep) {
      console.log('Final Answers:', values);

      // Simulate backend response (replace this with actual API call)
      const simulatedResult = {
        riskLevel: 'Moderate',
        recommendation: 'Consider scheduling a mammogram and consult a specialist.',
        details:
          'Based on your family history and lifestyle factors, you may have a moderate risk of breast cancer.'
      };

      setResultData(simulatedResult);
      setShowResult(true);
    } else {
      next();
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 px-5 overflow-x-hidden py-6">
      {!startExamination ? (
        // START SCREEN
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
            <h3 className="text-sm text-primary font-bold">Breast Cancer Risk Predictor</h3>
            <p className="text-xs text-gray-500 mt-2">
              Curious about your breast cancer risk? Answer a few simple questions based on your
              lifestyle, family history, and personal health. Knowing your risk level can empower
              you to take early action! 💡
            </p>
            <div className="w-full h-[167px] bg-pink-100 rounded-lg flex items-center justify-center">
              <p className="text-center text-xs text-gray-600 px-4">
                Quick, personalized assessment. It only takes 2 minutes!
              </p>
            </div>
          </div>

          <Button className="text-sm" onClick={() => setStartExamination(true)}>
            Start Risk Prediction
          </Button>
        </>
      ) : showResult ? (
        // RESULT SCREEN
        <>{resultData && <AcessmentResult resultData={resultData} />}</>
      ) : (
        // FORM SCREEN
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form className="grid gap-6">
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
              <div className="flex flex-col gap-6">{steps[stepIndex].component}</div>

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

export default RiskPrediction;
