"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { motion, type Variants } from "framer-motion";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "Challenges", href: "/challenges" },
	{ label: "FAQs", href: "/faqs" },
	{ label: "About", href: "/about" },
];

const containerVariants: Variants = {
	hidden: { opacity: 0, y: -22, filter: "blur(8px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.08 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0 },
};

const mobileMenuVariants: Variants = {
	hidden: { opacity: 0, y: -10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut",
			staggerChildren: 0.05,
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: { duration: 0.2 },
	},
};

const mobileMenuItemVariants: Variants = {
	hidden: { opacity: 0, x: -10 },
	visible: { opacity: 1, x: 0 },
};

export default function Navbar() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 w-full pt-5">
			<motion.nav
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="relative mx-auto flex h-[78px] w-[92%] items-center justify-between overflow-visible rounded-2xl border border-[rgba(142,187,29,0.22)] bg-[rgba(18,13,8,0.58)] px-5 shadow-[0_24px_70px_rgba(0,0,0,0.58),0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_28px_rgba(142,187,29,0.08)] backdrop-blur-[22px] sm:px-8 lg:px-10"
			>
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_24%,transparent_72%,rgba(142,187,29,0.08))]" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
				<div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.35)]" />

				<motion.div
					variants={itemVariants}
					whileHover={{ scale: 1.02, textShadow: "0 0 18px rgba(149,193,31,0.7)" }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="relative z-10 flex items-center"
				>
<Link
  href="/"
  className="font-rune text-[1.65rem] font-semibold tracking-[0.42em] text-[#95C11F] drop-shadow-[0_0_10px_rgba(149,193,31,0.32)] sm:text-[1.8rem]"
>
 ᚲᚱᛇᛈᛏᛟᛋ
</Link>
				</motion.div>

				<div className="relative z-10 hidden items-center gap-10 lg:flex">
					{navItems.map((item) => {
						const active = pathname === item.href;

						return (
							<motion.div
								key={item.label}
								variants={itemVariants}
								whileHover={{ y: -2 }}
								transition={{ duration: 0.28, ease: "easeOut" }}
								className="relative"
							>
								<Link
									href={item.href}
									aria-current={active ? "page" : undefined}
									className={`font-nav relative text-[0.98rem] font-medium tracking-[0.18em] transition-all duration-300 ease-out ${
										active
											? "text-[#F1E4D3] after:absolute after:-bottom-3 after:left-1/2 after:h-[2px] after:w-8 after:-translate-x-1/2 after:rounded-full after:bg-[#8EBB1D] after:shadow-[0_0_10px_rgba(142,187,29,0.9)]"
											: "text-[#E7D7C2]/78 hover:text-[#B7D85B] hover:drop-shadow-[0_0_10px_rgba(142,187,29,0.35)]"
									}`}
								>
									{item.label}
								</Link>
							</motion.div>
						);
					})}
				</div>

				<motion.div variants={itemVariants} className="relative z-10 flex items-center gap-2 sm:gap-3">
					{/* Desktop Buttons */}
					<div className="hidden gap-2 sm:gap-3 sm:flex">
						<motion.div whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
							<Link
								href="/auth/login"
								className="inline-flex h-11 items-center justify-center rounded-md border border-[rgba(142,187,29,0.42)] bg-transparent px-4 text-[0.72rem] font-semibold tracking-[0.28em] text-[#95C11F] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-[rgba(142,187,29,0.65)] hover:bg-[rgba(142,187,29,0.1)] hover:shadow-[0_0_18px_rgba(142,187,29,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-5"
							>
								SIGN IN
							</Link>
						</motion.div>

						<motion.div whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
							<Link
								href="/auth/register"
								className="inline-flex h-11 items-center justify-center rounded-md bg-[#8EBB1D] px-4 text-[0.72rem] font-semibold tracking-[0.28em] text-[#1B1208] shadow-[0_10px_24px_rgba(142,187,29,0.32),0_0_20px_rgba(142,187,29,0.22)] transition-all duration-300 hover:bg-[#9fd124] hover:shadow-[0_12px_28px_rgba(142,187,29,0.42),0_0_26px_rgba(142,187,29,0.28)] sm:px-5"
							>
								SIGN UP
							</Link>
						</motion.div>
					</div>

					{/* Mobile Hamburger Menu */}
					<motion.button
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="relative z-20 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg bg-[rgba(142,187,29,0.1)] border border-[rgba(142,187,29,0.3)] transition-all duration-300 hover:bg-[rgba(142,187,29,0.15)] lg:hidden"
					>
						<motion.span
							animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
							className="block h-0.5 w-5 rounded-full bg-[#8EBB1D] origin-center"
						/>
						<motion.span
							animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
							className="block h-0.5 w-5 rounded-full bg-[#8EBB1D]"
						/>
						<motion.span
							animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
							className="block h-0.5 w-5 rounded-full bg-[#8EBB1D] origin-center"
						/>
					</motion.button>
				</motion.div>
			</motion.nav>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<motion.div
					variants={mobileMenuVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="absolute top-[88px] left-0 right-0 mx-auto w-[92%] rounded-2xl border border-[rgba(142,187,29,0.22)] bg-[rgba(18,13,8,0.78)] backdrop-blur-[22px] shadow-[0_24px_70px_rgba(0,0,0,0.58),0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_28px_rgba(142,187,29,0.08)] overflow-hidden lg:hidden"
				>
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_24%,transparent_72%,rgba(142,187,29,0.08))]" />

					<div className="relative z-10 flex flex-col gap-1 p-4">
						{/* Mobile Nav Items */}
						{navItems.map((item) => {
							const active = pathname === item.href;

							return (
								<motion.div
									key={item.label}
									variants={mobileMenuItemVariants}
									onClick={() => setMobileMenuOpen(false)}
								>
									<Link
										href={item.href}
										aria-current={active ? "page" : undefined}
										className={`block px-4 py-3 rounded-lg font-nav text-[0.95rem] font-medium tracking-[0.1em] transition-all duration-300 ${
											active
												? "text-[#F1E4D3] bg-[rgba(142,187,29,0.15)] border border-[rgba(142,187,29,0.4)]"
												: "text-[#E7D7C2]/78 hover:text-[#B7D85B] hover:bg-[rgba(142,187,29,0.08)]"
										}`}
									>
										{item.label}
									</Link>
								</motion.div>
							);
						})}

						<div className="my-2 h-px bg-[rgba(142,187,29,0.2)]" />

						{/* Mobile Auth Buttons */}
						<motion.div variants={mobileMenuItemVariants} onClick={() => setMobileMenuOpen(false)}>
							<Link
								href="/signin"
								className="block px-4 py-3 rounded-lg border border-[rgba(142,187,29,0.42)] bg-transparent text-[0.95rem] font-semibold tracking-[0.1em] text-[#95C11F] transition-all duration-300 hover:border-[rgba(142,187,29,0.65)] hover:bg-[rgba(142,187,29,0.1)] text-center"
							>
								SIGN IN
							</Link>
						</motion.div>

						<motion.div variants={mobileMenuItemVariants} onClick={() => setMobileMenuOpen(false)}>
							<Link
								href="/auth/register"
								className="block px-4 py-3 rounded-lg bg-[#8EBB1D] text-[0.95rem] font-semibold tracking-[0.1em] text-[#1B1208] transition-all duration-300 hover:bg-[#9fd124] text-center"
							>
								SIGN UP
							</Link>
						</motion.div>
					</div>
				</motion.div>
			)}
		</header>
	);
}
