'use client';
import axiosInstance from '@/utils/axiosInstance';
import { createContext, useContext, useState } from 'react';
import { ISelfExamination } from '../model';

interface ISelfExaminationContext {
  loading: boolean;
  getSelfExaminationQuestions: () => void;
  selfExaminationQuestions: ISelfExamination[];
}

export const SelfExaminationCOntext = createContext<ISelfExaminationContext | undefined>(undefined);

const SelfExaminationProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selfExaminationQuestions, setSelfExaminationQuestions] = useState<ISelfExamination[]>([]);

  const getSelfExaminationQuestions = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/questions/breast-exam`);
      setSelfExaminationQuestions(res.data.data);
    } catch (error) {
      console.error('Error fetching self examination questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = { loading, getSelfExaminationQuestions, selfExaminationQuestions };

  return (
    <SelfExaminationCOntext.Provider value={value}>{children}</SelfExaminationCOntext.Provider>
  );
};

export default SelfExaminationProvider;

export const useSelfExamination = () => {
  const context = useContext(SelfExaminationCOntext);
  if (!context) {
    throw new Error('useSelfExamination must be used within a SelfExaminationProvider');
  }
  return context;
};
