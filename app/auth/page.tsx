import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Authentication</h1>
      <div className="flex space-x-4">
        <Link href="/auth/login">
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link href="/auth/register">
          <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}