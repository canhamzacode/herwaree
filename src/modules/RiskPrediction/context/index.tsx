/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import axiosInstance from '@/utils/axiosInstance';
import { createContext, useContext, useState } from 'react';
import { IRiskPredictions } from '../model';

interface IRiskPredictionContext {
  loading: boolean;
  getRiskPredictionQuestions: () => void;
  riskPredictionQuestions: IRiskPredictions[];
  riskPredictionAccessment: (privyId: string, data: any) => Promise<string>;
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

  const riskPredictionAccessment = async (privyId: string, data: any) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/bcra/${privyId}`, {
        ...data
      });
      console.log(res.data);
      return res.data.suggest;
    } catch (error) {
      console.error('Error fetching self examination questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    getRiskPredictionQuestions,
    riskPredictionQuestions,
    riskPredictionAccessment
  };

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
