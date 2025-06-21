'use client';

import React from 'react';
import { Button, Input } from '@/components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuthState } from '../context';
import toast from 'react-hot-toast';

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
});

interface RegisterFormProps {
  onRegistrationSuccess: (email: string) => void;
}

const RegisterForm = ({ onRegistrationSuccess }: RegisterFormProps) => {
  const { register } = useAuthState();

  const handleSubmit = async (
    values: Yup.InferType<typeof RegisterSchema>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await register(values.firstname, values.lastname, values.email, values.password);
      toast.success('Registration successful! Please check your email for the OTP.');
      onRegistrationSuccess(values.email);
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create your account</h1>
          <p className="text-gray-500 mt-2">
            Sign up with an email and password, or with your wallet or Google account
          </p>
        </div>

        <Formik
          initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <Input type="text" placeholder="First Name" name="firstname" />
              <Input type="text" placeholder="Last Name" name="lastname" />
              <Input type="email" placeholder="E-mail" name="email" />
              <Input type="password" placeholder="Password" name="password" />

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      !errors.password && touched.password ? 'text-green-500' : 'text-gray-400'
                    }
                  >
                    •
                  </span>
                  <span>Lowercase letter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      !errors.password && touched.password ? 'text-green-500' : 'text-gray-400'
                    }
                  >
                    •
                  </span>
                  <span>Uppercase letter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      !errors.password && touched.password ? 'text-green-500' : 'text-gray-400'
                    }
                  >
                    •
                  </span>
                  <span>8 characters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      !errors.password && touched.password ? 'text-green-500' : 'text-gray-400'
                    }
                  >
                    •
                  </span>
                  <span>1 number</span>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="p-3 border rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </button>
          <button className="p-3 border rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
              />
            </svg>
          </button>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/auth" className="text-pink-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
