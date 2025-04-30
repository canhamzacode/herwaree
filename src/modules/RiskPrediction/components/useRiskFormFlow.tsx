import { useState, useEffect } from 'react';
import { useMultiStepQuestionnaire } from '@/hooks/useMultiStepQuestionnaire';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { usePrivy } from '@privy-io/react-auth';
import { useRiskPrediction } from '../context';
import { RiskCard } from '@/components';
import { RiskPredictionValues } from '../model';

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

export const useRiskFormFlow = () => {
  const chunkSize = 1;
  const { steps, initialValues } = useMultiStepQuestionnaire(questions, chunkSize, (q, index) => (
    <RiskCard key={index} {...q} />
  ));

  const { stepIndex, next, prev, isLastStep, reset } = useMultiStepForm({
    steps: steps.map((s) => s.component)
  });

  const { getRiskPredictionQuestions, riskPredictionAccessment, loading } = useRiskPrediction();
  const { user } = usePrivy();

  const [startExamination, setStartExamination] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getRiskPredictionQuestions();
  }, []);

  const handleSubmit = async (values: RiskPredictionValues) => {
    setErrorMessage(null);

    if (isLastStep) {
      if (!user?.id) return;

      const result = await riskPredictionAccessment(user.id, values);

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      console.log('Risk Prediction Result:', result.message);
      setSuggestion(result.message);
      setShowResult(true);
    } else {
      next();
    }
  };

  const resetForm = () => {
    setErrorMessage('');
    reset();
    setSuggestion(null);
    setShowResult(false);
    setStartExamination(false);
  };

  return {
    stepIndex,
    steps,
    initialValues,
    handleSubmit,
    startExamination,
    setStartExamination,
    showResult,
    suggestion,
    prev,
    next,
    isLastStep,
    loading,
    errorMessage,
    resetForm
  };
};
