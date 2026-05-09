'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// Spinner component
const Spinner = () => (
  <motion.div
    className="w-5 h-5 border-2 border-transparent border-t-[#E7D7C2] rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
);

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  general?: string;
}

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [success, setSuccess] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for OTP countdown
  useEffect(() => {
    if (step === 2 && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, timeRemaining]);

  // Validation function
  const validateStep1 = () => {
    const newErrors: Errors = {};

    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Step 1 submission
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep1()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signup/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to request OTP');
      }

      setStep(2);
      setTimeRemaining(30);
      setFormData({ ...formData, otp: '' });
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = formData.otp.split('');
    newOtp[index] = value.slice(-1);
    setFormData({ ...formData, otp: newOtp.join('') });

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const otpDigits = paste.replace(/\D/g, '').slice(0, 6);
    setFormData({ ...formData, otp: otpDigits });

    if (otpDigits.length === 6) {
      otpRefs.current[5]?.focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter a 6-digit code' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signup/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'OTP verification failed');
      }

      setSuccess('Account created successfully!');
      setTimeout(() => {
        window.location.href = '/main';
      }, 1500);
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
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

  const stepTransitionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden">
      {/* Full-page split layout */}
      <div className="flex h-screen">
        {/* LEFT SIDE - Brand & Onboarding (55%) */}
        <motion.div
          className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background gradient with metallic bronze & green undertones */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1410] to-black opacity-90" />

          {/* Ambient glow effects */}
          <div className="absolute top-1/4 -left-96 w-96 h-96 bg-[#8EBB1D] rounded-full mix-blend-screen filter blur-3xl opacity-5" />
          <div className="absolute bottom-1/3 -right-96 w-96 h-96 bg-[#8EBB1D] rounded-full mix-blend-screen filter blur-3xl opacity-3" />

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />

          {/* Premium vignette */}
          <div className="absolute inset-0 bg-gradient-to-edge from-transparent via-transparent to-black opacity-40" />

          {/* Animated background cipher lines - vertical grid */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="none">
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
                <span className="text-[#E7D7C2]"></span>
              </h1>
              <div className="mt-4 h-0.5 w-20 bg-gradient-to-r from-[#8EBB1D] to-transparent" />
            </motion.div>

            {/* Middle: Main statement for signup (journey beginning) */}
            <motion.div variants={containerVariants}>
              <motion.h2 className="text-4xl xl:text-5xl font-light leading-tight mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                <motion.span className="block text-[#E7D7C2]" variants={itemVariants}>
                  SECRETS WAIT.
                </motion.span>
                <motion.span className="block text-[#E7D7C2]" variants={itemVariants}>
                  MINDS AWAKEN.
                </motion.span>
                <motion.span
                  className="block text-[#8EBB1D] drop-shadow-lg"
                  style={{
                    textShadow: '0 0 20px rgba(142, 187, 29, 0.6), 0 0 40px rgba(142, 187, 29, 0.3)',
                  }}
                  variants={itemVariants}
                >
                  BEGIN HERE.
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
                Join a world of puzzles, hidden truths, and minds sharpened by mystery.
              </motion.p>
            </motion.div>

            {/* Bottom: Trust text */}
            <motion.div
              className="text-xs tracking-widest text-[#8EBB1D] opacity-70"
              variants={itemVariants}
            >
              Verified access • Encrypted verification • Built for challengers
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - Registration Form (45% on desktop, 100% on mobile) */}
        <motion.div
          className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-0 lg:pt-3 bg-gradient-to-br from-black via-[#0f0c0a] to-black relative overflow-hidden"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtle right-side glow */}
          <div className="absolute top-1/2 -right-96 w-96 h-90 bg-[#8EBB1D] rounded-full mix-blend-screen filter blur-3xl opacity-3" />

          {/* Form container */}
          <motion.div
            className="w-full max-w-[460px] relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* STEP 1 - Account Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepTransitionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <h2 className="text-3xl lg:text-[42px] font-light text-[#E7D7C2] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Create Your Account
                  </h2>
                  <p className="text-[#BFA98D] font-serif italic text-sm">
                    Enter the vault and begin decoding the impossible.
                  </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  {/* Username Input */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[11px] uppercase tracking-widest text-[#BFA98D] mb-2">
                      Username
                    </label>
                    <div className="relative group">
                      <div className="absolute z-20 left-4 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity">
                        <User className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} />
                      </div>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="cryptomind"
                        className="relative z-10 w-full bg-black/50 backdrop-blur-md border border-[#8EBB1D]/30 rounded-xl pl-12 pr-4 py-2.5 text-[#E7D7C2] placeholder-[#BFA98D]/40 focus:outline-none focus:border-[#8EBB1D]/60 focus:ring-1 focus:ring-[#8EBB1D]/40 transition-all duration-300 hover:border-[#8EBB1D]/40"
                      />
                      <div className="absolute z-0 pointer-events-none inset-0 rounded-2xl bg-gradient-to-r from-[#8EBB1D]/0 via-[#8EBB1D]/0 to-[#8EBB1D]/0 group-focus-within:via-[#8EBB1D]/10 transition-all duration-300" />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-xs mt-2">{errors.username}</p>
                    )}
                  </motion.div>

                  {/* Email Input */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[11px] uppercase tracking-widest text-[#BFA98D] mb-2">
                      Email
                    </label>
                    <div className="relative group">
                      <div className="absolute z-20 left-4 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity">
                        <Mail className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="relative z-10 w-full bg-black/50 backdrop-blur-md border border-[#8EBB1D]/30 rounded-xl pl-12 pr-4 py-2.5 text-[#E7D7C2] placeholder-[#BFA98D]/40 focus:outline-none focus:border-[#8EBB1D]/60 focus:ring-1 focus:ring-[#8EBB1D]/40 transition-all duration-300 hover:border-[#8EBB1D]/40"
                      />
                      <div className="absolute z-0 pointer-events-none inset-0 rounded-2xl bg-gradient-to-r from-[#8EBB1D]/0 via-[#8EBB1D]/0 to-[#8EBB1D]/0 group-focus-within:via-[#8EBB1D]/10 transition-all duration-300" />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-2">{errors.email}</p>
                    )}
                  </motion.div>

                  {/* Password Input */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[11px] uppercase tracking-widest text-[#BFA98D] mb-2">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute z-20 left-4 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity">
                        <Lock className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="•••••••••"
                        className="relative z-10 w-full bg-black/50 backdrop-blur-md border border-[#8EBB1D]/30 rounded-xl pl-12 pr-12 py-2.5 text-[#E7D7C2] placeholder-[#BFA98D]/40 focus:outline-none focus:border-[#8EBB1D]/60 focus:ring-1 focus:ring-[#8EBB1D]/40 transition-all duration-300 hover:border-[#8EBB1D]/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} /> : <Eye className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} />}
                      </button>
                      <div className="absolute z-0 pointer-events-none inset-0 rounded-2xl bg-gradient-to-r from-[#8EBB1D]/0 via-[#8EBB1D]/0 to-[#8EBB1D]/0 group-focus-within:via-[#8EBB1D]/10 transition-all duration-300" />
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-2">{errors.password}</p>
                    )}
                  </motion.div>

                  {/* Confirm Password Input */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[11px] uppercase tracking-widest text-[#BFA98D] mb-2">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <div className="absolute z-20 left-4 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity">
                        <Lock className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="•••••••••"
                        className="relative z-10 w-full bg-black/50 backdrop-blur-md border border-[#8EBB1D]/30 rounded-xl pl-12 pr-12 py-2.5 text-[#E7D7C2] placeholder-[#BFA98D]/40 focus:outline-none focus:border-[#8EBB1D]/60 focus:ring-1 focus:ring-[#8EBB1D]/40 transition-all duration-300 hover:border-[#8EBB1D]/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} /> : <Eye className="w-5 h-5 text-[#8EBB1D]" strokeWidth={2} />}
                      </button>
                      <div className="absolute z-0 pointer-events-none inset-0 rounded-2xl bg-gradient-to-r from-[#8EBB1D]/0 via-[#8EBB1D]/0 to-[#8EBB1D]/0 group-focus-within:via-[#8EBB1D]/10 transition-all duration-300" />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-2">{errors.confirmPassword}</p>
                    )}
                  </motion.div>

                  {/* Error message */}
                  {errors.general && (
                    <motion.div
                      className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm"
                      variants={itemVariants}
                    >
                      {errors.general}
                    </motion.div>
                  )}

                  {/* Send Verification Code Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-5 px-6 py-2.5 bg-[#8EBB1D] text-black font-bold tracking-widest rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden text-sm"
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
                      {loading ? (
                        <>
                          <Spinner />
                          SENDING...
                        </>
                      ) : (
                        'SEND VERIFICATION CODE →'
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Footer - Sign In Link */}
                <motion.div className="mt-5 text-center text-xs" variants={itemVariants}>
                  <span className="text-[#BFA98D]">Already initiated? </span>
                  <Link
                    href="/auth/login"
                    className="text-[#8EBB1D] font-semibold hover:text-[#A8D141] transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {/* STEP 2 - OTP Verification */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepTransitionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <h2 className="text-3xl font-light text-[#E7D7C2] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Verify Your Email
                  </h2>
                  <p className="text-[#BFA98D] font-serif italic text-sm">
                    We sent a code to <span className="text-[#E7D7C2]">{formData.email}</span>
                  </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {/* OTP Input */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[11px] uppercase tracking-widest text-[#BFA98D] mb-2">
                      Verification Code
                    </label>
                    <div className="flex gap-3 justify-between">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          ref={(ref) => {
                            otpRefs.current[index] = ref;
                          }}
                          type="text"
                          maxLength={1}
                          value={formData.otp[index] || ''}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={handleOtpPaste}
                          placeholder="-"
                          className="w-12 h-12 bg-black/50 backdrop-blur-md border border-[#8EBB1D]/30 rounded-lg text-center text-lg font-bold text-[#E7D7C2] placeholder-[#BFA98D]/40 focus:outline-none focus:border-[#8EBB1D]/60 focus:ring-1 focus:ring-[#8EBB1D]/40 transition-all duration-300"
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <p className="text-red-400 text-xs mt-2">{errors.otp}</p>
                    )}
                  </motion.div>

                  {/* Countdown Timer & Resend */}
                  <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <span className="text-sm text-[#BFA98D]">
                      {timeRemaining > 0 ? (
                        <>
                          Resend in:{' '}
                          <span className="text-[#8EBB1D] font-bold">
                            {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:
                            {String(timeRemaining % 60).padStart(2, '0')}
                          </span>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setTimeRemaining(30);
                            handleRequestOtp(new Event('submit') as any);
                          }}
                          className="text-[#8EBB1D] hover:text-[#A8D141] transition-colors underline"
                        >
                          Resend Code
                        </button>
                      )}
                    </span>
                  </motion.div>

                  {/* Error message */}
                  {errors.general && (
                    <motion.div
                      className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm"
                      variants={itemVariants}
                    >
                      {errors.general}
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

                  {/* Verify Button */}
                  <motion.button
                    type="submit"
                    disabled={loading || formData.otp.length !== 6}
                    className="w-full mt-5 px-6 py-2.5 bg-[#8EBB1D] text-black font-bold tracking-widest rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden text-sm"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      boxShadow: '0 0 20px rgba(142, 187, 29, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      if (!e.currentTarget.disabled) {
                        el.style.boxShadow = '0 0 30px rgba(142, 187, 29, 0.6)';
                      }
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
                      {loading ? (
                        <>
                          <Spinner />
                          VERIFYING...
                        </>
                      ) : (
                        'VERIFY & CREATE ACCOUNT →'
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Back to edit button */}
                <motion.button
                  onClick={() => setStep(1)}
                  className="w-full mt-3 px-6 py-2 border border-[#8EBB1D]/30 text-[#BFA98D] font-semibold rounded-lg text-sm transition-all duration-300 hover:border-[#8EBB1D]/60 hover:text-[#E7D7C2]"
                  variants={itemVariants}
                >
                  ← BACK
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile - Stack layout indicator */}
      <div className="lg:hidden absolute inset-0 pointer-events-none bg-gradient-to-br from-black via-[#1a1410] to-black" />
    </div>
  );
}
