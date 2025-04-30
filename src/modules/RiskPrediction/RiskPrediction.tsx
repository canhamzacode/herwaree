'use client';
import React from 'react';
import { FormScreen, StartScreen } from './components';
import { useRiskFormFlow } from './components/useRiskFormFlow';
import { AcessmentResult } from '@/components';

const RiskPrediction = () => {
  const {
    startExamination,
    setStartExamination,
    showResult,
    suggestion,
    stepIndex,
    steps,
    initialValues,
    handleSubmit,
    prev,
    isLastStep,
    loading,
    errorMessage,
    resetForm
  } = useRiskFormFlow();

  return (
    <div className="flex flex-col w-full gap-5 px-5 overflow-x-hidden py-6">
      {!startExamination ? (
        <StartScreen onStart={() => setStartExamination(true)} />
      ) : showResult ? (
        <AcessmentResult suggestion={suggestion!} />
      ) : (
        <>
          {errorMessage && (
            <div className="flex items-start justify-between gap-4 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md shadow-sm animate-fade-in">
              <div className="flex gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-red-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <p>Something went wrong. Please try again.</p>
                  <p className="text-xs text-red-700 italic">{errorMessage}</p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="px-3 py-1 text-sm font-medium text-red-800 border border-red-300 rounded-md hover:bg-red-100"
              >
                Try Again
              </button>
            </div>
          )}

          <FormScreen
            steps={steps}
            stepIndex={stepIndex}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            prev={prev}
            isLastStep={isLastStep}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default RiskPrediction;
