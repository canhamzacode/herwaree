'use client';
import React from 'react';
import { TextArea } from '../TextArea';
import { ErrorMessage, Field } from 'formik';

const ReminderFrequencyStep = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <TextArea
        name="note"
        label="Note (optional)"
        placeholder="Type your note..."
        maxLength={300}
      />
      <div className="">
        <p>Reminder Frequency</p>
        <div className="flex gap-4">
          <label className="flex gap-1">
            <Field type="radio" name="frequency" value="daily" />
            Daily
          </label>
          <label className="flex gap-1">
            <Field type="radio" name="frequency" value="weekly" />
            Weekly
          </label>
          <label className="flex gap-1">
            <Field type="radio" name="frequency" value="monthly" />
            Monthly
          </label>
        </div>
        <ErrorMessage name="frequency" component="div" className="text-red-500 text-xs" />
      </div>
    </div>
  );
};

export default ReminderFrequencyStep;
