'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { signOut } from '@/lib/auth';

export default function AuthLinks() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <p>{user.email}</p>
          <button
            onClick={async () => {
              await signOut();
              window.location.href = '/';
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </>
      )}
    </div>
  );
}