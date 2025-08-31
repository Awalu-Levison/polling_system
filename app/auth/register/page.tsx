"use client";

import { useState } from 'react';
import { register } from '@/lib/auth';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
   const { isLoading } = useAuth();
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email);
    router.push('/');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Register' : 'Loading...'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
