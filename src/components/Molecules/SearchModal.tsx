import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router";

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
	modalRef: React.RefObject<HTMLDivElement>;
}

interface SearchResult {
	title: string;
	description: string;
	url: string;
	category: string;
	icon: string;
}

const searchData: SearchResult[] = [
	{
		title: "About",
		description: "Learn more about Ibrahim Nurul Huda",
		url: "/",
		category: "Pages",
		icon: "👨‍💻"
	},
	{
		title: "Work & Projects",
		description: "My professional work and side projects",
		url: "/work",
		category: "Pages",
		icon: "💼"
	},
	{
		title: "Writing",
		description: "Blog posts and articles",
		url: "/writing",
		category: "Pages",
		icon: "✍️"
	},
	{
		title: "Uses",
		description: "Tools and technologies I use",
		url: "/uses",
		category: "Pages",
		icon: "🛠️"
	},
	{
		title: "Now",
		description: "What I'm currently working on",
		url: "/now",
		category: "Pages",
		icon: "⏰"
	},
	{
		title: "Blog Utama",
		description: "Visit the main blog at blog.sarbeh.com",
		url: "https://blog.sarbeh.com",
		category: "External",
		icon: "📝"
	},
	{
		title: "Contact",
		description: "Get in touch with me",
		url: "#contact",
		category: "Actions",
		icon: "📧"
	},
	{
		title: "Toggle Theme",
		description: "Switch between light and dark mode",
		url: "#theme",
		category: "Actions",
		icon: "🌓"
	},
	{
		title: "Toggle Sound",
		description: "Enable or disable sound effects",
		url: "#sound",
		category: "Actions",
		icon: "🔊"
	}
];

export function SearchModal({ isOpen, onClose, onInteraction, modalRef }: SearchModalProps) {
	const [query, setQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [filteredResults, setFilteredResults] = useState<SearchResult[]>(searchData);
	const inputRef = useRef<HTMLInputElement>(null);

	// Filter results based on query
	useEffect(() => {
		if (!query.trim()) {
			setFilteredResults(searchData);
		} else {
			const filtered = searchData.filter(item =>
				item.title.toLowerCase().includes(query.toLowerCase()) ||
				item.description.toLowerCase().includes(query.toLowerCase()) ||
				item.category.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredResults(filtered);
		}
		setSelectedIndex(0);
	}, [query]);

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Handle keyboard navigation
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					setSelectedIndex(prev => 
						prev < filteredResults.length - 1 ? prev + 1 : 0
					);
					break;
				case 'ArrowUp':
					e.preventDefault();
					setSelectedIndex(prev => 
						prev > 0 ? prev - 1 : filteredResults.length - 1
					);
					break;
				case 'Enter':
					e.preventDefault();
					if (filteredResults[selectedIndex]) {
						handleSelect(filteredResults[selectedIndex]);
					}
					break;
				case 'Escape':
					e.preventDefault();
					onClose();
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, filteredResults, selectedIndex, onClose]);

	const handleSelect = (result: SearchResult) => {
		onInteraction('click');
		
		if (result.url === "#contact") {
			// Trigger contact modal
			const contactEvent = new CustomEvent('openContact');
			document.dispatchEvent(contactEvent);
		} else if (result.url === "#theme") {
			// Trigger theme toggle
			const themeButton = document.querySelector('[aria-label*="Switch to"]');
			if (themeButton) {
				(themeButton as HTMLButtonElement).click();
			}
		} else if (result.url === "#sound") {
			// Trigger sound toggle
			const soundButton = document.querySelector('[aria-label*="Sound effects"]');
			if (soundButton) {
				(soundButton as HTMLButtonElement).click();
			}
		} else if (result.url.startsWith('http')) {
			// External link - open in new tab
			window.open(result.url, '_blank');
		} else {
			// Navigate to page
			window.location.href = result.url;
		}
		
		onClose();
		setQuery("");
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
				>
					{/* Backdrop */}
					<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
					
					{/* Modal */}
					<motion.div
						ref={modalRef}
						className="relative w-full max-w-lg bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
						initial={{ opacity: 0, scale: 0.95, y: -20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -20 }}
						transition={{ type: "spring", duration: 0.3 }}
						onClick={e => e.stopPropagation()}
					>
						{/* Search Input */}
						<div className="flex items-center px-4 py-3 border-b border-border">
							<svg className="w-5 h-5 text-muted-foreground mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input
								ref={inputRef}
								type="text"
								placeholder="Search pages, actions..."
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
							/>
							<kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded border">
								ESC
							</kbd>
						</div>

						{/* Results */}
						<div className="max-h-80 overflow-y-auto">
							{filteredResults.length === 0 ? (
								<div className="px-4 py-8 text-center text-muted-foreground">
									<svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.625" />
									</svg>
									<p>No results found</p>
									<p className="text-sm mt-1">Try a different search term</p>
								</div>
							) : (
								<>
									{Object.entries(
										filteredResults.reduce((acc, result) => {
											if (!acc[result.category]) acc[result.category] = [];
											acc[result.category].push(result);
											return acc;
										}, {} as Record<string, SearchResult[]>)
									).map(([category, results]) => (
										<div key={category}>
											<div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/30">
												{category}
											</div>
											{results.map((result, index) => {
												const globalIndex = filteredResults.indexOf(result);
												return (
													<motion.button
														key={result.url}
														onClick={() => handleSelect(result)}
														onMouseEnter={() => setSelectedIndex(globalIndex)}
														className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center space-x-3 ${
															selectedIndex === globalIndex ? 'bg-accent' : ''
														}`}
														whileHover={{ x: 4 }}
														transition={{ type: "spring", stiffness: 400, damping: 25 }}
													>
														<span className="text-lg">{result.icon}</span>
														<div className="flex-1 min-w-0">
															<div className="font-medium text-foreground truncate">
																{result.title}
															</div>
															<div className="text-sm text-muted-foreground truncate">
																{result.description}
															</div>
														</div>
														{selectedIndex === globalIndex && (
															<kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded border">
																↵
															</kbd>
														)}
													</motion.button>
												);
											})}
										</div>
									))}
								</>
							)}
						</div>

						{/* Footer */}
						<div className="px-4 py-3 border-t border-border bg-muted/30">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<div className="flex items-center space-x-4">
									<div className="flex items-center space-x-1">
										<kbd className="px-2 py-1 font-mono bg-background rounded border">↑</kbd>
										<kbd className="px-2 py-1 font-mono bg-background rounded border">↓</kbd>
										<span>navigate</span>
									</div>
									<div className="flex items-center space-x-1">
										<kbd className="px-2 py-1 font-mono bg-background rounded border">↵</kbd>
										<span>select</span>
									</div>
								</div>
								<div className="flex items-center space-x-1">
									<kbd className="px-2 py-1 font-mono bg-background rounded border">ESC</kbd>
									<span>close</span>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
} 