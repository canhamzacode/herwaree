'use client';
import React, { useState } from 'react';
import { Field, FieldProps } from 'formik';

interface CustomTextareaProps {
  placeholder?: string;
  name: string;
  label?: string;
  className?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  containerClass?: string;
  maxLength?: number;
  rows?: number;
  withFormik?: boolean;
}

const TextareaField: React.FC<CustomTextareaProps> = ({
  placeholder,
  name,
  label,
  className = '',
  readOnly,
  onChange,
  containerClass = '',
  maxLength,
  rows = 4,
  withFormik = true
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field?: FieldProps['field']) => {
    const value = e.target.value;

    if (field) {
      field.onChange({
        target: {
          name: field.name,
          value
        }
      });
    } else {
      setInputValue(value);
    }
    onChange?.(e);
  };

  const renderTextarea = (field?: FieldProps['field']) => (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="tablet:text-base text-sm">
          {label}
        </label>
      )}
      <div
        className={`flex items-start border py-2 px-4 rounded-[10px] border-[#CACACA96] ${containerClass}`}
      >
        <textarea
          id={name}
          placeholder={placeholder}
          className={`w-full outline-none border-none bg-transparent resize-none ${className}`}
          readOnly={readOnly}
          maxLength={maxLength}
          rows={rows}
          {...(field || {})}
          onChange={(e) => handleChange(e, field)}
          value={field?.value || inputValue}
        />
      </div>
    </div>
  );

  return withFormik ? (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="flex flex-col gap-1">
          {renderTextarea(field)}
          {meta.touched && meta.error && (
            <p className="text-red-600 text-sm capitalize">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  ) : (
    renderTextarea()
  );
};

export default TextareaField;
