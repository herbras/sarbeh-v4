import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { OGMeta } from "@/components/OGMeta";
import type { Route } from "./+types/now";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Now - Ibrahim Nurul Huda (sarbeh)" },
		{
			name: "description",
			content: "What I'm working on right now - current projects, learning, and recent journey updates."
		}
	];
}

const TimelineItem = ({ 
	title, 
	description, 
	date, 
	isActive = false,
	index
}: { 
	title: string; 
	description: string; 
	date: string;
	isActive?: boolean;
	index: number;
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
			animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12`}
		>
			{/* Timeline connector */}
			<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500/20 via-orange-500/50 to-orange-500/20 hidden md:block" />
			
			{/* Timeline dot */}
			<motion.div
				initial={{ scale: 0 }}
				animate={isInView ? { scale: 1 } : { scale: 0 }}
				transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
				className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background hidden md:block z-10 ${
					isActive ? 'bg-orange-500' : 'bg-muted-foreground'
				}`}
			/>

			{/* Content */}
			<div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
				<motion.div
					whileHover={{ y: -4, scale: 1.02 }}
					className={`bg-card rounded-lg p-6 border border-border hover:border-orange-500/30 transition-all duration-300 ${
						isActive ? 'ring-2 ring-orange-500/20' : ''
					}`}
				>
					<div className="flex justify-between items-start mb-3">
						<span className="text-sm text-orange-500 font-medium">{date}</span>
						{isActive && (
							<motion.span
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full"
							>
								Current
							</motion.span>
						)}
					</div>
					<h3 className="text-lg font-semibold mb-2">{title}</h3>
					<p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default function Now() {
	const headerRef = useRef(null);
	const headerInView = useInView(headerRef, { once: true });

	return (
		<>
			<OGMeta
				title="Now - Ibrahim Nurul Huda (sarbeh)"
				description="What I'm working on right now - current projects, learning, and recent journey updates."
				path="/now"
				type="website"
			/>
			
			<div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
				<motion.div
					className="relative mx-auto max-w-4xl w-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="text-center py-16 md:py-24">
						{/* Header Section */}
						<motion.div
							ref={headerRef}
							initial={{ opacity: 0, y: 30 }}
							animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-[60px] md:text-[80px] font-serif font-medium leading-none mb-6 md:mb-8 tracking-tight gradient-text">
								now
							</h1>
							<p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-12">
								What I'm working on right now and my recent journey
							</p>
							
							{/* Connect CTA */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
								transition={{ duration: 0.6, delay: 0.6 }}
								className="mt-8 p-6 bg-orange-500/10 rounded-lg border border-orange-500/20 max-w-2xl mx-auto"
							>
								<h3 className="mb-4 text-center text-lg font-medium text-orange-600 dark:text-orange-400">
									Connect with me
								</h3>
								<ul className="flex flex-wrap justify-center gap-x-6 gap-y-4">
									<li>
										<a
											href="/"
											className="font-medium text-muted-foreground transition-colors hover:text-orange-500"
										>
											Website
										</a>
									</li>
									<li>
										<a
											href="https://linkedin.com/sarbeh"
											target="_blank"
											rel="noopener noreferrer"
											className="font-medium text-muted-foreground transition-colors hover:text-orange-500"
										>
											LinkedIn
										</a>
									</li>
									<li>
										<a
											href="https://github.com/herbras"
											target="_blank"
											rel="noopener noreferrer"
											className="font-medium text-muted-foreground transition-colors hover:text-orange-500"
										>
											GitHub
										</a>
									</li>
									<li>
										<a
											href="https://twitter.com/sarbeh_"
											target="_blank"
											rel="noopener noreferrer"
											className="font-medium text-muted-foreground transition-colors hover:text-orange-500"
										>
											Twitter
										</a>
									</li>
									<li>
										<a
											href="https://youtube.com/@sarbeh"
											target="_blank"
											rel="noopener noreferrer"
											className="font-medium text-muted-foreground transition-colors hover:text-orange-500"
										>
											YouTube
										</a>
									</li>
								</ul>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</>
	);
} 