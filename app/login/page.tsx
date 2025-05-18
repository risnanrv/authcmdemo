"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/dashboard");
      } else {
        alert("Invalid credentials or login failed");
      }
    } catch {
      alert("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                suppressHydrationWarning
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4328c7] focus:ring-[#4328c7] p-2 border"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                suppressHydrationWarning
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4328c7] focus:ring-[#4328c7] p-2 border"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4328c7] hover:bg-[#371faa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4328c7] transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4328c7]"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don&#39;t have an account?</span>{" "}
            <Link href="/signup" className="font-medium text-[#4328c7] hover:text-[#371faa]">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
