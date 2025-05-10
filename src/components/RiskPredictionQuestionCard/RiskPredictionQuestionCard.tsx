'use client';
import React from 'react';
import { useField, useFormikContext } from 'formik';
import Image from 'next/image';
import { Input } from '../Input';

interface QuestionCardProps {
  question: string;
  type: 'option' | 'text' | 'date' | 'number' | 'option_number'; // Added 'option_number'
  options?: {
    value: string;
    label: string;
  }[];
  name: string;
  description?: string;
  image?: string;
}

const RiskPredictionQuestionCard = ({
  question,
  type,
  options = [],
  name,
  image
}: QuestionCardProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const handleInputChange = (value: string) => {
    // Clear the selected option when the user types in the input
    setFieldValue(name, value);
  };

  const handleOptionSelect = (value: string) => {
    // Clear the input field when the user selects an option
    setFieldValue(name, value);
  };

  return (
    <div className="flex flex-col gap-8 mt-12 w-full">
      {image && (
        <div className="w-[100px] h-[100px] mx-auto">
          <Image
            width={100}
            height={100}
            src={'/logo.png'}
            alt="question visual"
            className="rounded-lg object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 w-full rounded-[20px] border-dotted border-primary border-2 pb-4">
        <div className="min-h-[77px] bg-primary w-full flex items-center justify-center rounded-t-[20px] p-4">
          <h4 className="font-bold text-white text-lg text-center">{question}</h4>
        </div>
        <div className="w-full px-3 gap-4 grid">
          {/* Render input field for 'text', 'number', 'date', and 'option_number' types */}
          {(type === 'text' ||
            type === 'number' ||
            type === 'date' ||
            type === 'option_number') && (
            <div className="flex flex-col gap-3 mt-4">
              <Input
                name={name}
                type={type === 'option_number' ? 'number' : type} // Ensure input is numeric for 'option_number'
                placeholder="Type your answer..."
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
          )}

          {/* Render options for 'option' and 'option_number' types */}
          {(type === 'option' || type === 'option_number') &&
            options.map((option, index) => {
              const isSelected = field.value === option.value;
              return (
                <div
                  key={index}
                  className={`flex gap-2 items-center w-full border rounded-4xl px-4 py-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-[#818181] text-[#818181]'
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      isSelected ? 'bg-primary border-primary' : 'border-[#818181] text-[#818181]'
                    }`}
                  />
                  <span className="flex-1">{option.label}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RiskPredictionQuestionCard;
