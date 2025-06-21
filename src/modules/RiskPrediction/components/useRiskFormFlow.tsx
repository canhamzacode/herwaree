import { useState, useEffect } from 'react';
import { useMultiStepQuestionnaire } from '@/hooks/useMultiStepQuestionnaire';
import useMultiStepForm from '@/hooks/useMultiStepForm';
import { useAuthState } from '@/modules/Auth/context';
import { useRiskPrediction } from '../context';
import { RiskCard } from '@/components';
import { RiskPredictionValues } from '../model';

type QuestionType = 'option' | 'text' | 'date' | 'number' | 'option_number';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: {
    value: string;
    label: string;
  }[];
  name: string;
  description?: string;
  image?: string;
}

const questions: Question[] = [
  {
    id: 'age',
    type: 'number',
    question: 'What is your age?',
    name: 'age',
    description: 'Current age of the patient'
  },
  {
    id: 'age_at_menarche',
    type: 'number',
    question: 'At what age did you have your first menstrual period?',
    name: 'age_at_menarche',
    description: 'Age at first menstruation'
  },
  {
    id: 'age_at_first_live_birth',
    type: 'number',
    question:
      'At what age did you have your first live birth? (If you have never given birth, enter 0)',
    name: 'age_at_first_live_birth',
    description: 'Age at first live birth'
  },
  {
    id: 'number_of_first_degree_relatives',
    type: 'number',
    question:
      'How many of your first-degree relatives (mother, sisters, daughters) have had breast cancer?',
    name: 'number_of_first_degree_relatives',
    description: 'Number of first-degree relatives with breast cancer'
  },
  {
    id: 'number_of_breast_biopsies',
    type: 'number',
    question: 'How many breast biopsies have you had?',
    name: 'number_of_breast_biopsies',
    description: 'Number of breast biopsies'
  },
  {
    id: 'atypical_hyperplasia',
    type: 'option',
    question: 'Have you ever been diagnosed with atypical hyperplasia?',
    name: 'atypical_hyperplasia',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' }
    ]
  },
  {
    id: 'race',
    type: 'option',
    question: 'What is your race/ethnicity?',
    name: 'race',
    options: [
      { value: 'White', label: 'White' },
      { value: 'Black', label: 'Black' },
      { value: 'Hispanic', label: 'Hispanic' },
      { value: 'Asian', label: 'Asian' },
      { value: 'Other', label: 'Other' }
    ]
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
  const { user } = useAuthState();

  const [startExamination, setStartExamination] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getRiskPredictionQuestions();
  }, []);

  const handleSubmit = async (values: RiskPredictionValues) => {
    if (!user?.id) {
      setErrorMessage('User not authenticated');
      return;
    }

    try {
      const result = await riskPredictionAccessment(user.id, values);
      if (result.success) {
        setSuggestion(result.message);
        setShowResult(true);
      } else {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage('An error occurred during risk assessment');
    }
  };

  return {
    steps,
    stepIndex,
    next,
    prev,
    isLastStep,
    reset,
    initialValues,
    loading,
    startExamination,
    setStartExamination,
    showResult,
    setShowResult,
    suggestion,
    errorMessage,
    setErrorMessage,
    handleSubmit
  };
};
