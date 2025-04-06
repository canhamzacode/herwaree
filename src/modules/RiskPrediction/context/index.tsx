'use client';
import axiosInstance from '@/utils/axiosInstance';
import { createContext, useContext, useState } from 'react';
import { IRiskPredictions } from '../model';

interface IRiskPredictionContext {
  loading: boolean;
  getRiskPredictionQuestions: () => void;
  riskPredictionQuestions: IRiskPredictions[];
}

export const RiskPredictionContext = createContext<IRiskPredictionContext | undefined>(undefined);

const RiskPredictionProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [riskPredictionQuestions, setRiskPredictionQuestions] = useState<IRiskPredictions[]>([]);

  const getRiskPredictionQuestions = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/questions/breast-risk`);
      setRiskPredictionQuestions(res.data.data);
    } catch (error) {
      console.error('Error fetching self examination questions:', error);
    } finally {
      setLoading(false);
    }
  };

  //   {
  //     data: [],
  //     userId: ""
  //   }

  const value = { loading, getRiskPredictionQuestions, riskPredictionQuestions };

  return <RiskPredictionContext.Provider value={value}>{children}</RiskPredictionContext.Provider>;
};

export default RiskPredictionProvider;

export const useRiskPrediction = () => {
  const context = useContext(RiskPredictionContext);
  if (!context) {
    throw new Error('useRiskPrediction must be used within a RiskPredictionProvider');
  }
  return context;
};
