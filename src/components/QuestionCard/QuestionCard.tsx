'use client';
import React from 'react';
import { useField, useFormikContext } from 'formik';

interface QuestionCardProps {
  question: string;
  options: string[];
  name: string;
}

const QuestionCard = ({ question, options, name }: QuestionCardProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h4 className="font-bold text-primary text-sm">{question}</h4>
      <div className="flex flex-col gap-3 w-full">
        {options.map((option, index) => {
          const isSelected = field.value === option;
          return (
            <div
              key={index}
              className={`flex gap-2 items-center w-full border rounded-lg px-2 py-2 cursor-pointer transition-colors ${
                isSelected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-[#818181] text-[#818181]'
              }`}
              onClick={() => setFieldValue(name, option)}
            >
              <div
                className={`w-3 h-3 rounded-full border ${
                  isSelected ? 'bg-primary border-primary' : 'border-[#818181] text-[#818181]'
                }`}
              />
              <span className="flex-1 text-sm">{option}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
