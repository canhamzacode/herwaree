'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm, RegisterForm, OtpForm } from './components';

export default function Auth() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode');

  const [mode, setMode] = useState<'login' | 'register' | 'otp'>(
    initialMode === 'register' ? 'register' : 'login'
  );
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleRegistrationSuccess = useCallback((email: string) => {
    setUserEmail(email);
    setMode('otp');
  }, []);

  if (mode === 'otp') {
    return <OtpForm email={userEmail} />;
  }

  if (mode === 'register') {
    return <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />;
  }

  return <LoginForm />;
}
