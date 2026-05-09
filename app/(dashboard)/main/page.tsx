'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  LayoutDashboard,
  Zap,
  Target,
  Trophy,
  Star,
  History,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  TrendingUp,
  Award,
  Activity,
  Loader,
} from 'lucide-react';

const colors = {
  bgBlack: '#050403',
  deepBrown: '#120D08',
  darkBronze: '#1A1510',
  ivory: '#E7D7C2',
  mutedText: '#BFA98D',
  oliveGreen: '#8EBB1D',
};

// Types
interface User {
  id: string;
  username: string;
  email: string;
}

// Sidebar Navigation Component
const Sidebar: React.FC<{ 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
  isLoggingOut: boolean;
}> = ({
  isOpen,
  setIsOpen,
  onLogout,
  isLoggingOut,
}) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
    { icon: Zap, label: 'Daily Puzzle', href: '#' },
    { icon: Target, label: 'Challenges', href: '#' },
    { icon: Trophy, label: 'Leaderboard', href: '#' },
    { icon: Star, label: 'Achievements', href: '#' },
    { icon: History, label: 'History', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  const [selected, setSelected] = useState(0);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen"
      style={{
        width: isOpen ? '280px' : '100px',
        backgroundColor: colors.darkBronze,
        zIndex: 50,
      }}
    >
      {/* Backdrop blur effect */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: `${colors.darkBronze}90`,
          border: `1px solid ${colors.oliveGreen}20`,
        }}
      />

      <div className="relative h-full flex flex-col p-6">
        {/* Logo Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ width: isOpen ? 'auto' : '0px' }}
              className="overflow-hidden"
            >
              <h1
                className="font-serif text-xl font-bold tracking-wide whitespace-nowrap"
                style={{ color: colors.oliveGreen }}
              >
                 ᚲᚱᛇᛈᛏᛟᛋ
              </h1>
              <p
                className="text-xs mt-1 tracking-widest"
                style={{ color: colors.mutedText }}
              >
                CIPHER DASHBOARD
              </p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.ivory }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-3">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={idx}
                onClick={() => setSelected(idx)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group transition-all duration-300"
              >
                {selected === idx && (
                  <motion.div
                    layoutId="selected"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      backgroundColor: `${colors.oliveGreen}15`,
                      border: `1px solid ${colors.oliveGreen}40`,
                      boxShadow: `0 0 20px ${colors.oliveGreen}30`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative flex items-center gap-4 px-4 py-3">
                  <Icon
                    size={20}
                    style={{
                      color: selected === idx ? colors.oliveGreen : colors.mutedText,
                    }}
                  />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : '0px' }}
                    className="text-sm font-medium overflow-hidden whitespace-nowrap"
                    style={{
                      color: selected === idx ? colors.oliveGreen : colors.ivory,
                    }}
                  >
                    {item.label}
                  </motion.span>
                </div>
              </motion.button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: colors.mutedText }}
        >
          {isLoggingOut ? <Loader size={20} className="animate-spin" /> : <LogOut size={20} />}
          <motion.span
            animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : '0px' }}
            className="text-sm font-medium overflow-hidden whitespace-nowrap"
          >
            {isLoggingOut ? 'Signing Out...' : 'Logout'}
          </motion.span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  index: number;
}> = ({ label, value, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="p-6 rounded-3xl transition-all duration-300"
      style={{
        backgroundColor: colors.deepBrown,
        border: `1px solid ${colors.oliveGreen}25`,
        boxShadow: `0 0 30px ${colors.oliveGreen}10`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p
          className="text-sm font-medium tracking-wide"
          style={{ color: colors.mutedText }}
        >
          {label}
        </p>
        <div style={{ color: colors.oliveGreen }}>{icon}</div>
      </div>
      <motion.h3
        className="text-3xl font-bold font-serif"
        style={{ color: colors.ivory }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {value}
      </motion.h3>
      <div
        className="mt-4 h-1 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${colors.oliveGreen}30 0%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
};

// Activity Timeline Item
const ActivityItem: React.FC<{ title: string; status: 'success' | 'failed' | 'unlocked'; index: number }> = ({
  title,
  status,
  index,
}) => {
  const statusColors = {
    success: colors.oliveGreen,
    failed: '#A0826D',
    unlocked: colors.oliveGreen,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4 pb-4 border-b"
      style={{ borderColor: `${colors.oliveGreen}15` }}
    >
      <motion.div
        className="w-3 h-3 rounded-full mt-2"
        style={{
          backgroundColor: statusColors[status],
          boxShadow: `0 0 10px ${statusColors[status]}60`,
        }}
      />
      <div>
        <p
          className="text-sm font-medium"
          style={{ color: colors.ivory }}
        >
          {title}
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: colors.mutedText }}
        >
          2 hours ago
        </p>
      </div>
    </motion.div>
  );
};

// Leaderboard Item
const LeaderboardItem: React.FC<{ rank: number; name: string; score: number; isUser: boolean }> = ({
  rank,
  name,
  score,
  isUser,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="flex items-center justify-between p-3 rounded-xl transition-all"
      style={{
        backgroundColor: isUser ? `${colors.oliveGreen}15` : 'transparent',
        border: isUser ? `1px solid ${colors.oliveGreen}40` : 'none',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: colors.darkBronze,
            color: isUser ? colors.oliveGreen : colors.mutedText,
            border: `1px solid ${isUser ? colors.oliveGreen : colors.mutedText}30`,
          }}
        >
          {rank}
        </div>
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: isUser ? colors.oliveGreen : colors.ivory }}
          >
            {name}
          </p>
        </div>
      </div>
      <p
        className="text-sm font-bold"
        style={{ color: colors.oliveGreen }}
      >
        {score}
      </p>
    </motion.div>
  );
};

// Achievement Badge
const AchievementBadge: React.FC<{ title: string; icon: React.ReactNode; index: number }> = ({
  title,
  icon,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="flex-shrink-0 w-24 h-24 flex items-center justify-center rounded-2xl cursor-pointer transition-all"
      style={{
        backgroundColor: colors.deepBrown,
        border: `1px solid ${colors.oliveGreen}30`,
        boxShadow: `0 0 20px ${colors.oliveGreen}15`,
      }}
    >
      <div className="text-center">
        <div
          className="mb-2 text-2xl"
          style={{ color: colors.oliveGreen }}
        >
          {icon}
        </div>
        <p
          className="text-xs font-medium text-center leading-tight"
          style={{ color: colors.ivory }}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
};

// Background Effects Component
const BackgroundEffects: React.FC = () => {
  // Deterministic particle positions to avoid hydration mismatch
  const particlePositions = [
    { top: 20, left: 30, duration: 5.5 },
    { top: 50, left: 70, duration: 6.2 },
    { top: 80, left: 40, duration: 7.1 },
    { top: 30, left: 60, duration: 5.8 },
    { top: 70, left: 20, duration: 6.8 },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ 
        backgroundColor: colors.bgBlack,
        zIndex: -1,
      }}
    >
      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors.darkBronze}05 0%, ${colors.bgBlack} 100%)`,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${colors.oliveGreen}10 1px, transparent 1px), linear-gradient(90deg, ${colors.oliveGreen}10 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles effect */}
      {particlePositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: colors.oliveGreen,
            top: `${position.top}%`,
            left: `${position.left}%`,
            opacity: 0.1,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: position.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Profile Panel Component
const ProfilePanel: React.FC<{ user: User | null; isLoading: boolean }> = ({ user, isLoading }) => {
  const getAvatarLetter = (username: string) => {
    return username ? username.charAt(0).toUpperCase() : '?';
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed right-0 top-0 h-screen w-96 p-6 overflow-y-auto"
      style={{
        backgroundColor: colors.darkBronze,
        borderLeft: `1px solid ${colors.oliveGreen}20`,
        zIndex: 30,
      }}
    >
      {/* Profile Header */}
      <div className="mb-8">
        <motion.div
          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{
            backgroundColor: colors.deepBrown,
            border: `2px solid ${colors.oliveGreen}`,
            boxShadow: `0 0 30px ${colors.oliveGreen}40`,
          }}
        >
          {isLoading ? (
            <Loader size={32} className="animate-spin" style={{ color: colors.oliveGreen }} />
          ) : (
            <span
              className="text-2xl font-bold"
              style={{ color: colors.oliveGreen }}
            >
              {getAvatarLetter(user?.username || 'U')}
            </span>
          )}
        </motion.div>

        <div
          className="text-2xl font-bold text-center font-serif"
          style={{ color: colors.ivory }}
        >
          {isLoading ? (
            <div className="h-7 bg-gray-700 rounded w-32 mx-auto" />
          ) : (
            user?.username || 'User'
          )}
        </div>
        <div
          className="text-center text-sm mt-2"
          style={{ color: colors.mutedText }}
        >
          {isLoading ? (
            <div className="h-4 bg-gray-700 rounded w-40 mx-auto mt-2" />
          ) : (
            user?.email || ''
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: colors.oliveGreen,
              boxShadow: `0 0 10px ${colors.oliveGreen}80`,
            }}
          />
          <p
            className="text-xs font-semibold tracking-wide"
            style={{ color: colors.oliveGreen }}
          >
            ONLINE
          </p>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="space-y-3 mb-8">
        {[
          { label: 'Joined', value: 'Mar 2024' },
          { label: 'Solved', value: '142' },
          { label: 'Rank', value: '#4' },
          { label: 'Streak', value: '23 Days' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="p-3 rounded-xl"
            style={{
              backgroundColor: colors.deepBrown,
              border: `1px solid ${colors.oliveGreen}15`,
            }}
          >
            <p
              className="text-xs font-medium tracking-wide"
              style={{ color: colors.mutedText }}
            >
              {stat.label}
            </p>
            <p
              className="text-lg font-bold"
              style={{ color: colors.ivory }}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2 mb-8">
        {['Edit Profile', 'View History', 'Notifications', 'Security'].map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 4 }}
            className="w-full text-left px-4 py-3 rounded-xl transition-all hover:bg-white/5"
            style={{ color: colors.ivory }}
          >
            <p className="text-sm font-medium">{action}</p>
          </motion.button>
        ))}
      </div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-6 border-t"
        style={{ borderColor: `${colors.oliveGreen}20` }}
      >
        <p
          className="text-xs italic font-serif leading-relaxed"
          style={{ color: colors.mutedText }}
        >
          "The strongest cipher is the disciplined mind."
        </p>
      </motion.div>
    </motion.div>
  );
};

// Main Dashboard Component
export default function MainDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const mountedRef = React.useRef(false);

  // Fetch user data on mount
  useEffect(() => {
    // Prevent double fetch in development
    if (mountedRef.current) return;
    mountedRef.current = true;

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Failed to fetch user:', response.status);
          if (response.status === 401) {
            // Only redirect if we're sure they're not authenticated
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push('/auth/login');
          }
          return;
        }

        const data = await response.json();
        console.log('User data received:', data);

        if (data && data.id) {
          setUser(data);
          setIsLoading(false);
        } else {
          console.error('No user data in response');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    fetchUser();

    return () => {
      mountedRef.current = false;
    };
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/auth/login');
      } else {
        console.error('Logout failed');
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setIsLoggingOut(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const username = user?.username || 'User';
  const displayUsername = isLoading ? 'Loading...' : username;

  return (
    <div
      className="min-h-screen flex relative"
      style={{ backgroundColor: colors.bgBlack }}
    >
      <BackgroundEffects />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />

      {/* Main Content */}
      <div
        className="flex-1 overflow-y-auto relative"
        style={{
          marginLeft: sidebarOpen ? '280px' : '100px',
          zIndex: 20,
        }}
      >
        <div
          style={{
            paddingTop: '2rem',
            paddingLeft: '2rem',
            paddingRight: 'calc(24rem + 2rem)',
            paddingBottom: '2rem',
            backgroundColor: colors.bgBlack,
            minHeight: '100vh',
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Greeting Section - Always Display */}
            <div>
              <h1
                className="text-5xl font-serif font-bold mb-2"
                style={{ color: colors.ivory }}
              >
                Good Evening, {displayUsername}
              </h1>
              <p
                className="text-lg"
                style={{ color: colors.mutedText }}
              >
                Ready to decode today's cipher?
              </p>
            </div>

           </motion.div>


            {/* Hero Card - Today's Cipher */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-3xl overflow-hidden"
            style={{
              backgroundColor: colors.deepBrown,
              border: `1px solid ${colors.oliveGreen}25`,
              boxShadow: `0 0 40px ${colors.oliveGreen}15, inset 0 0 40px ${colors.oliveGreen}05`,
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2
                  className="text-3xl font-serif font-bold mb-2"
                  style={{ color: colors.ivory }}
                >
                  Today's Cipher
                </h2>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: colors.oliveGreen }}
                >
                  The Enigma Paradox
                </h3>
              </div>
              <motion.span
                className="px-4 py-2 rounded-full text-xs font-bold tracking-wide"
                style={{
                  backgroundColor: `${colors.oliveGreen}20`,
                  color: colors.oliveGreen,
                  border: `1px solid ${colors.oliveGreen}40`,
                }}
              >
                HARD
              </motion.span>
            </div>

            <p
              className="mb-6 leading-relaxed max-w-2xl"
              style={{ color: colors.mutedText }}
            >
              Decrypt the message hidden within layers of transposition and substitution. Each word holds
              a clue to the next. Time limit: 60 minutes.
            </p>

            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Clock size={20} style={{ color: colors.oliveGreen }} />
                <div>
                  <p
                    className="text-xs"
                    style={{ color: colors.mutedText }}
                  >
                    Time Remaining
                  </p>
                  <p
                    className="text-2xl font-bold font-mono"
                    style={{ color: colors.ivory }}
                  >
                    59:47
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${colors.oliveGreen}60` }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-2xl font-semibold tracking-wide flex items-center gap-2 transition-all"
              style={{
                backgroundColor: colors.oliveGreen,
                color: colors.bgBlack,
              }}
            >
              Begin Challenge
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-4 gap-6"
          >
            <StatCard
              label="Current Rank"
              value="#4"
              icon={<Trophy size={24} />}
              index={0}
            />
            <StatCard
              label="Solved Puzzles"
              value="142"
              icon={<Target size={24} />}
              index={1}
            />
            <StatCard
              label="Accuracy %"
              value="94.2%"
              icon={<TrendingUp size={24} />}
              index={2}
            />
            <StatCard
              label="Daily Streak"
              value="23"
              icon={<Zap size={24} />}
              index={3}
            />
          </motion.div>

          {/* Activity & Leaderboard Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-8"
          >
            {/* Recent Activity */}
            <motion.div
              className="p-8 rounded-3xl"
              style={{
                backgroundColor: colors.deepBrown,
                border: `1px solid ${colors.oliveGreen}20`,
              }}
            >
              <h3
                className="text-2xl font-serif font-bold mb-6"
                style={{ color: colors.ivory }}
              >
                Recent Activity
              </h3>
              <div className="space-y-4">
                <ActivityItem title="Solved Caesar Shift" status="success" index={0} />
                <ActivityItem title="Failed Vigenère Puzzle" status="failed" index={1} />
                <ActivityItem title="New Badge Unlocked" status="unlocked" index={2} />
                <ActivityItem title="Rank Improved to #4" status="success" index={3} />
              </div>
            </motion.div>

            {/* Leaderboard Preview */}
            <motion.div
              className="p-8 rounded-3xl"
              style={{
                backgroundColor: colors.deepBrown,
                border: `1px solid ${colors.oliveGreen}20`,
              }}
            >
              <h3
                className="text-2xl font-serif font-bold mb-6"
                style={{ color: colors.ivory }}
              >
                Leaderboard
              </h3>
              <div className="space-y-2">
                <LeaderboardItem rank={1} name="Shadow" score={2847} isUser={false} />
                <LeaderboardItem rank={2} name="Cipher" score={2756} isUser={false} />
                <LeaderboardItem rank={3} name="Nova" score={2645} isUser={false} />
                <LeaderboardItem rank={4} name="You" score={2561} isUser={true} />
                <LeaderboardItem rank={5} name="Nexus" score={2489} isUser={false} />
              </div>
            </motion.div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-2xl font-serif font-bold mb-6"
              style={{ color: colors.ivory }}
            >
              Recent Achievements
            </h3>
            <motion.div
              className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              <AchievementBadge title="First Blood" icon="🔓" index={0} />
              <AchievementBadge title="Speed Solver" icon="⚡" index={1} />
              <AchievementBadge title="Cipher Lord" icon="👑" index={2} />
              <AchievementBadge title="Legendary" icon="✨" index={3} />
              <AchievementBadge title="100 Streak" icon="🔥" index={4} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Profile Panel */}
      <ProfilePanel user={user} isLoading={isLoading} />
    </div>

  );
}
