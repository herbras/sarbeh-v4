import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router";
import { ModeToggle } from "./mode-toggle";

interface HeaderProps {
	activeTab: string;
	onTabChange: (tab: string, index: number) => void;
	onContactOpen: () => void;
	onSoundToggle: () => void;
	onThemeToggle: () => void;
	isDarkMode: boolean;
	soundEnabled: boolean;
	playSound: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
	navButtonRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
	themeButtonRef: React.RefObject<HTMLButtonElement | null>;
	contactButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function Header({ 
	activeTab, 
	onTabChange, 
	onContactOpen, 
	onSoundToggle, 
	onThemeToggle,
	isDarkMode,
	soundEnabled, 
	playSound, 
	navButtonRefs,
	themeButtonRef,
	contactButtonRef 
}: HeaderProps) {
	const location = useLocation();
	
	const getActiveTab = () => {
		switch (location.pathname) {
			case '/work':
				return 'work';
			case '/writing':
				return 'writing';
			default:
				return 'about';
		}
	};
	
	const currentTab = getActiveTab();
	return (
		<motion.header
			className="w-full fixed top-0 z-50 py-4 md:py-8"
			role="banner"
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			<div className="container mx-auto px-4 md:px-6 flex flex-row items-center justify-between relative mt-2 md:mt-0">
				{/* Logo */}
				<motion.div
					className="flex items-center flex-1 min-w-[70px] md:min-w-[180px] w-0 md:w-auto justify-start pr-2"
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}
				>
					<h1 className="text-xs md:text-xl text-orange-500 italic whitespace-nowrap font-pacifico">
						nicholas chua
					</h1>
				</motion.div>

				{/* Navigation */}
				<nav
					className="bg-secondary rounded-full p-1 md:p-1.5 nav-pill-shadow flex min-w-0 md:min-w-[240px] w-auto justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
					role="navigation"
					aria-label="Main navigation"
				>
					{[
						{ label: "about", path: "/" },
						{ label: "work", path: "/work" },
						{ label: "writing", path: "/writing" }
					].map((tab, index) => (
						<NavLink
							key={tab.label}
							to={tab.path}
							onClick={() => playSound('click')}
							onMouseEnter={() => playSound('hover')}
							className={({ isActive }) =>
								`inline-block px-3 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-full ${isActive
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground"
								}`
							}
						>
							{({ isActive }) => (
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="relative"
								>
									{isActive && (
										<motion.div
											className="absolute inset-0 bg-white rounded-full shadow-md"
											layoutId="activeTab"
											transition={{ type: "spring", stiffness: 500, damping: 30 }}
										/>
									)}
									<span className="relative z-10">{tab.label}</span>
								</motion.div>
							)}
						</NavLink>
					))}
				</nav>

				{/* Action Buttons */}
				<div className="flex items-center flex-1 min-w-0 md:min-w-[80px] w-0 md:w-auto justify-end gap-2">
					<motion.button
						ref={themeButtonRef}
						onClick={onThemeToggle}
						onMouseEnter={() => playSound('hover')}
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full w-10 h-10 md:w-16 md:h-16 bg-white settings-button-shadow"
						whileHover={{ scale: 1.05, rotate: 180 }}
						whileTap={{ scale: 0.95 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
						aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode (Shortcut: Ctrl+D)`}
						title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
					>
						<motion.div
							animate={{ rotate: isDarkMode ? 180 : 0 }}
							transition={{ duration: 0.3 }}
						>
							{isDarkMode ? (
								<svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
								</svg>
							) : (
								<svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
								</svg>
							)}
						</motion.div>
					</motion.button>

					<motion.button
						ref={contactButtonRef}
						onClick={onContactOpen}
						onMouseEnter={() => playSound('hover')}
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full w-10 h-10 md:w-16 md:h-16 bg-white settings-button-shadow"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						aria-label="Open contact form (Shortcut: Ctrl+C)"
						title="Contact me"
					>
						<svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</motion.button>
				</div>
			</div>
		</motion.header>
	);
}
