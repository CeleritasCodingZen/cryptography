'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
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
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const cubeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.5,
      },
    },
  };

  const floatVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#050403',
          }}
        />

        {/* Radial gradient bronze undertone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 180% 120% at 50% 50%, rgba(140, 110, 70, 0.15) 0%, rgba(5, 4, 3, 0) 80%)',
          }}
        />

        {/* Green ambient bloom behind hero object */}
        <div
          className="absolute right-0 top-1/3 w-[800px] h-[600px] -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(142, 187, 29, 0.25) 0%, rgba(142, 187, 29, 0) 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-16">
        <div className="max-w-[1400px] w-full">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center"
            >
              {/* Heading */}
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-7xl font-light leading-tight tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <span style={{ color: '#DCC7AA' }}>CRACK CIPHERS.</span>
                  <br />
                  <span style={{ color: '#DCC7AA' }}>SHARPEN MINDS.</span>
                  <br />
                  <span
                    style={{
                      color: '#8EBB1D',
                      textShadow: '0 0 30px rgba(142, 187, 29, 0.35)',
                    }}
                  >
                    BECOME LEGENDS.
                  </span>
                </h1>
              </motion.div>

              {/* Supporting Text */}
              <motion.div
                variants={itemVariants}
                className="mb-12"
                style={{
                  color: '#C9B59B',
                  fontFamily: 'El Messiri, sans-serif',
                }}
              >
                <p className="text-lg leading-relaxed max-w-md font-light">
                  Daily cryptography puzzles. Three difficulty levels.
                  <br />
                  One global leaderboard. How fast can you solve it?
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <button
                  className="group relative px-8 py-3 text-sm font-light tracking-widest transition-all duration-300"
                  style={{
                    borderWidth: '1.5px',
                    borderColor: '#8EBB1D',
                    backgroundColor: 'rgba(5, 4, 3, 0.6)',
                    color: '#8EBB1D',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(142, 187, 29, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(142, 187, 29, 0.35), inset 0 0 20px rgba(142, 187, 29, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(5, 4, 3, 0.6)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  SOLVE TODAY&apos;S PUZZLE →
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              variants={cubeVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center relative"
            >
              {/* Glow effect behind image */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(142, 187, 29, 0.2) 0%, rgba(142, 187, 29, 0) 70%)',
                  filter: 'blur(60px)',
                }}
              />

              {/* Floating Image */}
              <motion.div
                variants={floatVariants}
                animate="animate"
                className="relative w-full h-[700px]"
              >
                <Image
                  src="/assets/asset1.png"
                  alt="KRYPTOS Cryptography Cube"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
