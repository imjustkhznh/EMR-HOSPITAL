"use client";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              EMR Hospital
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Electronic Medical Records System
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
