"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome</h1>
        <p className="text-gray-800">Choose an option below:</p>
        <div className="space-y-4">
          <Link
            className="block w-full py-2 text-white bg-indigo-600 rounded-md
            hover:bg-indigo-700"
            href="/login"
          >
            Go to Login
          </Link>
          <Link
            className="block w-full py-2 text-white bg-indigo-600 rounded-md
            hover:bg-indigo-700"
            href="/signup"
          >
            Go to Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
