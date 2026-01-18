import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { OGMeta } from "@/components/OGMeta";
import type { Route } from "./+types/$";
import { playSound } from "@/stores/app";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Page Not Found - Ibrahim Nurul Huda (sarbeh)" },
		{ name: "description", content: "The page you're looking for doesn't exist." }
	];
}

export default function NotFound() {
	return (
		<>
			<OGMeta
				title="Page Not Found - Ibrahim Nurul Huda (sarbeh)"
				description="The page you're looking for doesn't exist or has been moved."
				path="/404"
				type="website"
			/>
			
			<div className="bg-background min-h-screen flex items-center justify-center">
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-2xl mx-auto"
					>
						{/* 404 Number */}
						<motion.h1 
							className="text-8xl md:text-9xl font-bold mb-6 gradient-text"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							404
						</motion.h1>

						{/* Title */}
						<motion.h2 
							className="text-2xl md:text-3xl font-serif font-medium mb-4 text-foreground"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							Page Not Found
						</motion.h2>

						{/* Description */}
						<motion.p 
							className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							The page you're looking for doesn't exist or has been moved.
						</motion.p>

						{/* Navigation Buttons */}
						<motion.div 
							className="flex flex-col sm:flex-row gap-4 justify-center items-center"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.8 }}
						>
							<NavLink
								to="/"
								onClick={() => playSound('click')}
								onMouseEnter={() => playSound('hover')}
								className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
								</svg>
								Go Home
							</NavLink>

							<NavLink
								to="/work"
								onClick={() => playSound('click')}
								onMouseEnter={() => playSound('hover')}
								className="inline-flex items-center justify-center px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
								</svg>
								View My Work
							</NavLink>
						</motion.div>

						{/* Helpful Links */}
						<motion.div 
							className="mt-12 pt-8 border-t border-border"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 1.0 }}
						>
							<p className="text-sm text-muted-foreground mb-4">
								You might be looking for:
							</p>
							<div className="flex flex-wrap justify-center gap-4 text-sm">
								<NavLink
									to="/writing"
									onClick={() => playSound('click')}
									onMouseEnter={() => playSound('hover')}
									className="text-orange-500 hover:text-orange-600 transition-colors underline"
								>
									Writing
								</NavLink>
								<NavLink
									to="/uses"
									onClick={() => playSound('click')}
									onMouseEnter={() => playSound('hover')}
									className="text-orange-500 hover:text-orange-600 transition-colors underline"
								>
									Uses
								</NavLink>
								<NavLink
									to="/now"
									onClick={() => playSound('click')}
									onMouseEnter={() => playSound('hover')}
									className="text-orange-500 hover:text-orange-600 transition-colors underline"
								>
									Now
								</NavLink>
							</div>
						</motion.div>

						{/* Search Suggestion */}
						<motion.div 
							className="mt-8 p-4 bg-muted/30 rounded-lg border border-border"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
						>
							<p className="text-sm text-muted-foreground">
								<kbd className="px-2 py-1 text-xs font-mono bg-background rounded border mr-1">Ctrl</kbd>
								+
								<kbd className="px-2 py-1 text-xs font-mono bg-background rounded border ml-1 mr-2">K</kbd>
								to search the site
							</p>
						</motion.div>
					</motion.div>

					{/* Floating Animation Elements */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
						<motion.div
							className="absolute top-20 left-10 w-2 h-2 bg-orange-500/20 rounded-full"
							animate={{
								y: [0, -20, 0],
								opacity: [0.2, 0.5, 0.2],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute top-32 right-16 w-1 h-1 bg-orange-500/30 rounded-full"
							animate={{
								y: [0, -15, 0],
								opacity: [0.3, 0.6, 0.3],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 1,
							}}
						/>
						<motion.div
							className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-orange-500/25 rounded-full"
							animate={{
								y: [0, -10, 0],
								opacity: [0.25, 0.4, 0.25],
							}}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 0.5,
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
} 