'use client';

import Image from 'next/image';
import React from 'react';
import { Input } from '../Input';
import { ErrorMessage, Field } from 'formik';

const ReminderDetailsStep = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="w-[140px] h-[109px] mx-auto">
          <Image src="/bell.png" alt="reminder" width={140} height={109} />
        </div>
        <p className="text-sm text-center text-grey">
          A biweekly ( two weeks interval) risk prediction test ensures timely detection, early
          intervention, and informed decisions
        </p>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <Input label="Task Title" name="title" placeholder="Enter title" />
        <Input label="Reminder Date" name="date" type="date" />
        <Input label="Reminder Time" name="time" type="time" />
        <div className="flex items-center justify-end gap-4">
          <label className="flex gap-1">
            <Field type="radio" name="period" value="AM" />
            AM
          </label>
          <label className="flex gap-1">
            <Field type="radio" name="period" value="PM" />
            PM
          </label>
        </div>
        <ErrorMessage name="period" component="div" className="text-red-500 text-xs" />
      </div>
    </div>
  );
};

export default ReminderDetailsStep;
