'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';

// Icon components
const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-3-3H9a3 3 0 00-3 3v2h12z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Sign in failed');
      }

      setSuccess('Signing in...');
      // Redirect or handle success
      window.location.href = '/main';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Animated background lines
  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.3,
      transition: {
        duration: 3,
        delay: i * 0.4,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    }),
  };

  // Container variants for stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden">
      {/* Full-page split layout */}
      <div className="flex h-screen">
        {/* LEFT SIDE - Brand & Atmosphere (55%) */}
        <motion.div
          className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background gradient with metallic brown & green undertones */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1410] to-black opacity-90" />

          {/* Ambient glow effects */}
          <div className="absolute top-1/4 -left-96 w-96 h-96 bg-[#8EBB1D] rounded-full mix-blend-screen filter blur-3xl opacity-5" />
          <div className="absolute bottom-1/3 -right-96 w-96 h-96 bg-[#8EBB1D] rounded-full mix-blend-screen filter blur-3xl opacity-3" />

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />

          {/* Premium vignette */}
          <div className="absolute inset-0 bg-gradient-to-edge from-transparent via-transparent to-black opacity-40" />

          {/* Animated background cipher lines */}
          <div className="absolute inset-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 500"
              preserveAspectRatio="none"
            >
              {/* Geometric cipher lines */}
              {[0, 1, 2, 3].map((i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={`${20 + i * 20}%`}
                  y1="0%"
                  x2={`${20 + i * 20}%`}
                  y2="100%"
                  stroke="#8EBB1D"
                  strokeWidth="0.5"
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  opacity={0.2}
                />
              ))}
            </svg>
          </div>

          {/* Floating cryptographic nodes - subtle constellation */}


          {/* Content - Brand & messaging */}
          <motion.div
            className="relative z-10 flex flex-col justify-between p-16 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top: Brand */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-bold tracking-widest" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-[#E7D7C2]">KRYPTOS</span>
              </h1>
              <div className="mt-4 h-0.5 w-20 bg-gradient-to-r from-[#8EBB1D] to-transparent" />
            </motion.div>

            {/* Middle: Main statement */}
            <motion.div variants={containerVariants}>
              <motion.h2 className="text-5xl font-light leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                <motion.span
                  className="block text-[#E7D7C2]"
                  variants={itemVariants}
                >
                  EVERY SECRET
                </motion.span>
                <motion.span
                  className="block text-[#E7D7C2]"
                  variants={itemVariants}
                >
                  HAS A KEY.
                </motion.span>
                <motion.span
                  className="block text-[#8EBB1D] drop-shadow-lg"
                  style={{
                    textShadow:
                      '0 0 20px rgba(142, 187, 29, 0.6), 0 0 40px rgba(142, 187, 29, 0.3)',
                  }}
                  variants={itemVariants}
                >
                  FIND YOURS.
                </motion.span>
              </motion.h2>

              {/* Supporting line */}
              <motion.p
                className="text-[#BFA98D] text-lg max-w-sm leading-relaxed"
                style={{
                  fontFamily: 'El Messiri, sans-serif',
                  fontStyle: 'italic',
                }}
                variants={itemVariants}
              >
                Elite puzzles. Hidden truths. Endless challenge.
              </motion.p>
            </motion.div>

            {/* Bottom: Trust text */}
            <motion.div
              className="text-xs tracking-widest text-[#8EBB1D] opacity-70"
              variants={itemVariants}
            >
              Encrypted access • Secure sessions • Cryptic intelligence
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - Sign In Form (45% on desktop, 100% on mobile) */}
        <motion.div
          className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-0 bg-gradient-to-br from-black via-[#0f0c0a] to-black relative overflow-hidden"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtle right-side glow */}
          <div className="absolute top-1/2 -right-96 w-96 h-96 bg-[#8EBB1D] rounded-full mix-blend-screen filter blur-3xl opacity-3" />

          {/* Form container */}
          <motion.div
            className="w-full max-w-md relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div className="mb-12" variants={itemVariants}>
              <h2 className="text-4xl font-light text-[#E7D7C2] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Welcome Back
              </h2>
              <p className="text-[#BFA98D] font-serif italic text-sm">
                Sign in and continue decoding the impossible.
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-xs uppercase tracking-widest text-[#BFA98D] mb-3">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8EBB1D] opacity-60 group-focus-within:opacity-100 transition-opacity">
                    <MailIcon />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-black/50 backdrop-blur-md border border-[#8EBB1D]/30 rounded-2xl pl-12 pr-4 py-3 text-[#E7D7C2] placeholder-[#BFA98D]/40 focus:outline-none focus:border-[#8EBB1D]/60 focus:ring-1 focus:ring-[#8EBB1D]/40 transition-all duration-300 hover:border-[#8EBB1D]/40"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8EBB1D]/0 via-[#8EBB1D]/0 to-[#8EBB1D]/0 group-focus-within:via-[#8EBB1D]/10 pointer-events-none transition-all duration-300" />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-xs uppercase tracking-widest text-[#BFA98D]">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-[#8EBB1D] hover:text-[#8EBB1D] hover:drop-shadow-lg transition-all duration-300"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8EBB1D] opacity-60 group-focus-within:opacity-100 transition-opacity">
                    <LockIcon />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-black/50 backdrop-blur-md border border-[#8EBB1D]/30 rounded-2xl pl-12 pr-12 py-3 text-[#E7D7C2] placeholder-[#BFA98D]/40 focus:outline-none focus:border-[#8EBB1D]/60 focus:ring-1 focus:ring-[#8EBB1D]/40 transition-all duration-300 hover:border-[#8EBB1D]/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8EBB1D] opacity-60 hover:opacity-100 transition-opacity w-5 h-5"
                  >
                    {showPassword ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8EBB1D]/0 via-[#8EBB1D]/0 to-[#8EBB1D]/0 group-focus-within:via-[#8EBB1D]/10 pointer-events-none transition-all duration-300" />
                </div>
              </motion.div>

              {/* Remember me & Forgot password */}
              <motion.div
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-black/50 border border-[#8EBB1D]/30 cursor-pointer accent-[#8EBB1D]"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-[#BFA98D] cursor-pointer hover:text-[#E7D7C2] transition-colors"
                >
                  Remember me
                </label>
              </motion.div>

              {/* Error message */}
              {error && (
                <motion.div
                  className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm"
                  variants={itemVariants}
                >
                  {error}
                </motion.div>
              )}

              {/* Success message */}
              {success && (
                <motion.div
                  className="p-3 rounded-lg bg-[#8EBB1D]/20 border border-[#8EBB1D]/50 text-[#8EBB1D] text-sm"
                  variants={itemVariants}
                >
                  {success}
                </motion.div>
              )}

              {/* Sign In Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full mt-8 px-6 py-3 bg-[#8EBB1D] text-black font-bold tracking-widest rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  boxShadow: '0 0 20px rgba(142, 187, 29, 0.3)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 30px rgba(142, 187, 29, 0.6)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 20px rgba(142, 187, 29, 0.3)';
                }}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 opacity-20" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? 'SIGNING IN...' : 'SIGN IN →'}
                </span>
              </motion.button>
            </form>

            {/* Footer - Create Account Link */}
            <motion.div
              className="mt-8 text-center text-sm"
              variants={itemVariants}
            >
              <span className="text-[#BFA98D]">New to Kryptos? </span>
              <Link
                href="/auth/register"
                className="text-[#8EBB1D] font-semibold hover:text-[#A8D141] transition-colors duration-300"
              >
                Create Account
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile - Stack layout indicator */}
      <div className="lg:hidden absolute inset-0 pointer-events-none bg-gradient-to-br from-black via-[#1a1410] to-black" />
    </div>
  );
}
