"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-8xl font-extrabold text-gray-900 tracking-tight">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page not found
      </h2>
      <p className="mt-2 max-w-md text-gray-600">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => router.back()}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-gray-800 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Go back
      </button>
    </div>
  );
}
