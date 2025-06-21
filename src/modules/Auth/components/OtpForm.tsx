'use client';

import React from 'react';
import { Button } from '@/components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthState } from '../context';

const OtpSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 characters')
});

interface OtpFormProps {
  email: string | null;
}

const OtpForm = ({ email }: OtpFormProps) => {
  const { verifyOtp } = useAuthState();
  const handleSubmit = async (
    values: Yup.InferType<typeof OtpSchema>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      if (!email) return;
      // TODO: Implement OTP verification logic
      await verifyOtp(values.otp, email);
      console.log('Verifying OTP:', values.otp, 'for email:', email);
      toast.success('OTP verification successful!');
    } catch {
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">OTP code verification</h1>
          <p className="text-gray-500 mt-2">We sent an OTP verification code to {email}.</p>
        </div>

        <Formik initialValues={{ otp: '' }} validationSchema={OtpSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="flex justify-center space-x-2 mb-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-2xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    onChange={(e) => {
                      const newOtp = values.otp.split('');
                      newOtp[index] = e.target.value;
                      setFieldValue('otp', newOtp.join(''));
                      if (e.target.value && index < 5) {
                        (e.target.nextElementSibling as HTMLInputElement)?.focus();
                      }
                    }}
                  />
                ))}
              </div>

              <div className="text-center text-sm text-gray-500 mb-6">
                <span>Resend in 30s</span>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Verifying...' : 'Verify'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OtpForm;
