'use client';

import { useState } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirectTo') || '/';
        router.push(redirectTo);
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        // Depending on email confirmation settings, user might be logged in or need to check email.
        setIsLogin(true);
        setError('Registration successful! Please log in.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center pt-24 pb-12 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#5D4E46]/10 relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#987C6F]" />
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-[#5D4E46] mb-2">{isLogin ? 'Welcome Back' : 'Join Our Community'}</h1>
          <p className="text-[#5D4E46]/60 text-sm">
            {isLogin 
              ? 'Enter your details to access your account' 
              : 'Create an account to track orders and save your favorites'}
          </p>
        </div>

        {error && (
          <div className={`p-4 rounded-xl text-sm mb-6 ${error.includes('successful') ? 'bg-[#AAB084]/20 text-[#5D4E46]' : 'bg-red-50 text-red-600'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase font-bold text-[#5D4E46]/70 tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={16} className="text-[#5D4E46]/40" />
                </div>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl text-sm text-[#3A3532] outline-none focus:border-[#987C6F] transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase font-bold text-[#5D4E46]/70 tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={16} className="text-[#5D4E46]/40" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl text-sm text-[#3A3532] outline-none focus:border-[#987C6F] transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs uppercase font-bold text-[#5D4E46]/70 tracking-wider">Password</label>
              {isLogin && (
                <Link href="#" className="text-xs text-[#987C6F] font-bold hover:underline">Forgot?</Link>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={16} className="text-[#5D4E46]/40" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl text-sm text-[#3A3532] outline-none focus:border-[#987C6F] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-4 bg-[#5D4E46] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#3A3532] transition-colors shadow-md disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#5D4E46]/70">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }} 
              className="font-bold text-[#987C6F] hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
