'use client';
import { AcessmentResult, Button, Header, RiskCard } from '@/components';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { useMultiStepQuestionnaire } from '@/hooks/useMultiStepQuestionnaire';
import { ResultData } from '@/types';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRiskPrediction } from './context';
import { usePrivy } from '@privy-io/react-auth';

type QuestionType = 'option' | 'text' | 'date' | 'number';

interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: {
    value: string;
    label: string;
  }[];
  description?: string;
  image?: string;
  name: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is your current age?',
    type: 'number',
    description: 'Current age of the patient (e.g., 50)',
    name: 'T1'
  },
  {
    id: 2,
    question: 'What age do you want to assess your breast cancer risk at?',
    type: 'number',
    description: 'Target age to assess breast cancer risk (e.g., 60)',
    name: 'T2'
  },
  {
    id: 3,
    question: 'How many previous breast biopsies have you had?',
    type: 'number',
    description: 'Number of previous breast biopsies',
    name: 'N_Biop'
  },
  {
    id: 4,
    question: 'Was hyperplasia found in any biopsy?',
    type: 'option',
    options: [
      {
        value: '1',
        label: 'Yes'
      },
      {
        value: '0',
        label: 'No'
      }
    ],
    description: 'Indicates if hyperplasia was found (1 for Yes, 0 for No)',
    name: 'HypPlas'
  },
  {
    id: 5,
    question: 'At what age did you have your first menstruation?',
    type: 'text',
    description: 'Age at first menstruation',
    name: 'AgeMen'
  },
  {
    id: 6,
    question: 'At what age did you have your first live birth?',
    type: 'text',
    description: 'Age at first live birth',
    name: 'Age1st'
  },
  {
    id: 7,
    question: 'How many first-degree relatives have had breast cancer?',
    type: 'text',
    description: 'Number of first-degree relatives with breast cancer',
    name: 'N_Rels'
  },
  {
    id: 8,
    question: 'What is your race?',
    type: 'option',
    options: [
      {
        value: '1',
        label: 'White'
      },
      {
        value: '2',
        label: 'African American'
      },
      {
        value: '3',
        label: 'Asian'
      },
      {
        value: '4',
        label: 'Hispanic'
      },
      {
        value: '5',
        label: 'Other'
      }
    ],
    description: 'Race category (e.g., 1 for White, 2 for African American, etc.)',
    name: 'Race'
  }
];

const RiskPrediction = () => {
  const { getRiskPredictionQuestions, riskPredictionAccessment } = useRiskPrediction();
  const { user } = usePrivy();

  console.log('authUser', user?.id);
  const chunkSize = 1;
  const { steps, initialValues } = useMultiStepQuestionnaire(questions, chunkSize, (q, index) => (
    <RiskCard
      key={index}
      question={q.question}
      options={q.options}
      name={q.name}
      type={q.type}
      // description={q.description}
      image={q.image}
    />
  ));

  const { stepIndex, next, isLastStep, prev } = useMultiStepForm({
    steps: steps.map((s) => s.component)
  });

  const [startExamination, setStartExamination] = useState(false);
  const [showResult] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  const handleSubmit = async (values: unknown) => {
    if (isLastStep) {
      console.log('Final Answers:', values);

      // Simulate backend response (replace this with actual API call)
      if (!user?.id) return;
      await riskPredictionAccessment(user.id, values);

      const simulatedResult = {
        riskLevel: 'Moderate',
        recommendation: 'Consider scheduling a mammogram and consult a specialist.',
        details:
          'Based on your family history and lifestyle factors, you may have a moderate risk of breast cancer.'
      };

      setResultData(simulatedResult);
      // setShowResult(true);
    } else {
      next();
    }
  };

  useEffect(() => {
    getRiskPredictionQuestions();
  }, []);

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
