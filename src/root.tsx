import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import LayoutHeader from "./components/layout-header";
import { ContactModal } from "./components/Molecules/ContactModal";
import { SearchModal } from "./components/Molecules/SearchModal";
import { SocialLink } from "./components/Molecules/SocialLink";
import PWAUpdater from "./components/Organism/PWAUpdater";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import { $particles, $showContactModal, $showSearchModal, $soundEnabled, playSound, useStore } from "./stores/app";
import "./utils/aeo-validator";

export const links: Route.LinksFunction = () => [
	{
		rel: "dns-prefetch",
		href: "https://fonts.googleapis.com",
	},
	{
		rel: "dns-prefetch", 
		href: "https://fonts.gstatic.com",
	},
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com",
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "preload",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&display=swap",
		as: "style",
		onLoad: "this.onload=null;this.rel='stylesheet'",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&display=swap",
		media: "print",
		onLoad: "this.media='all'",
	},
	{
		rel: "icon",
		href: "/favicon.svg",
		type: "image/svg+xml",
	},
	{
		rel: "icon",
		href: "/favicon.ico",
		sizes: "32x32",
	},
	{
		rel: "apple-touch-icon",
		href: "/favicon.svg",
		sizes: "180x180",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<Meta />
					<Links />
					{/* Theme script to prevent flash */}
					<script dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									const theme = localStorage.getItem('vite-ui-theme') || 'dark';
									const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
									const actualTheme = theme === 'system' ? systemTheme : theme;
									
									document.documentElement.classList.add(actualTheme);
									document.documentElement.setAttribute('data-theme', actualTheme);
								} catch (e) {
									document.documentElement.classList.add('dark');
									document.documentElement.setAttribute('data-theme', 'dark');
								}
							})();
						`
					}} />
					{/* Critical CSS for font fallback */}
					<style dangerouslySetInnerHTML={{
						__html: `
							body { 
								font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
								font-display: swap;
							}
							.font-pacifico {
								font-family: "Pacifico", cursive, ui-sans-serif, system-ui, sans-serif;
								font-display: swap;
							}
						`
					}} />
					{/* Preload critical font */}
					<link
						rel="preload"
						href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					{/* Microsoft Clarity */}
					<script
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `
								(function(c,l,a,r,i,t,y){
									c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
									t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
									y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
								})(window, document, "clarity", "script", "slkcka68kr");
							`,
						}}
					/>
					{/* Fallback for no JavaScript */}
					<noscript>
						<link
							rel="stylesheet"
							href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&display=swap"
						/>
					</noscript>
				</head>
				<body>
					<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
						{children}
					</ThemeProvider>
					<ScrollRestoration />
					<Scripts />
				</body>
			</html>
	);
}

export default function App() {
	// Use nanostores with SSR-safe hooks
	const soundEnabled = useStore($soundEnabled);
	const showModal = useStore($showContactModal);
	const showSearchModal = useStore($showSearchModal);
	const particles = useStore($particles);
	const modalRef = useRef<HTMLDivElement>(null!);
	const searchModalRef = useRef<HTMLDivElement>(null!);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Only handle Escape when modals are open
			if (showModal || showSearchModal) {
				if (e.key === 'Escape') {
					$showContactModal.set(false);
					$showSearchModal.set(false);
				}
				return;
			}

			// Only handle keyboard shortcuts when no input is focused
			const activeElement = document.activeElement;
			if (activeElement && (
				activeElement.tagName === 'INPUT' || 
				activeElement.tagName === 'TEXTAREA' || 
				activeElement.tagName === 'SELECT' ||
				activeElement.getAttribute('contenteditable') === 'true'
			)) {
				return;
			}

			switch (e.key) {
				case 'k':
				case 'K':
					if (e.ctrlKey || e.metaKey) {
						e.preventDefault();
						$showSearchModal.set(true);
						playSound('click');
					}
					break;
				case 'd':
				case 'D':
					if (e.ctrlKey || e.metaKey) {
						e.preventDefault();
						// Trigger theme button in layout header
						const themeButton = document.querySelector('[aria-label*="Switch to"]');
						if (themeButton) {
							(themeButton as HTMLButtonElement).click();
						}
						playSound('toggle');
					}
					break;
				case 's':
				case 'S':
					if (e.ctrlKey || e.metaKey) {
						e.preventDefault();
						$soundEnabled.set(!soundEnabled);
						playSound('toggle');
					}
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [showModal, showSearchModal, soundEnabled]);

	// Focus management for modals
	useEffect(() => {
		if (showModal && modalRef.current) {
			const firstInput = modalRef.current.querySelector('input');
			firstInput?.focus();
		}
	}, [showModal]);

	useEffect(() => {
		if (showSearchModal && searchModalRef.current) {
			const firstInput = searchModalRef.current.querySelector('input');
			firstInput?.focus();
		}
	}, [showSearchModal]);

	// Handle custom events from SearchModal
	useEffect(() => {
		const handleOpenContact = () => {
			$showSearchModal.set(false);
			$showContactModal.set(true);
		};

		document.addEventListener('openContact', handleOpenContact);
		return () => document.removeEventListener('openContact', handleOpenContact);
	}, []);

	const handleSoundToggle = () => {
		$soundEnabled.set(!soundEnabled);
		playSound('toggle');
	};

	return (
		<>
			<div className="bg-background min-h-screen flex flex-col relative">
				{/* Skip to content link for screen readers */}
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-md z-50"
				>
					Skip to main content
				</a>

				{/* Keyboard shortcuts info - hidden on mobile */}
				<div className="fixed bottom-6 md:bottom-4 left-4 z-40 bg-secondary rounded-lg p-3 shadow-lg text-xs opacity-80 hover:opacity-100 transition-opacity hidden md:block">
					<div className="font-medium mb-1">Keyboard Shortcuts:</div>
					<div>Ctrl+K: Search</div>
					<div>Ctrl+D: Toggle theme</div>
					<div>Ctrl+S: Toggle sounds</div>
				</div>

				{/* Sound toggle button */}
				<motion.button
					onClick={handleSoundToggle}
					className="fixed bottom-6 right-4 md:bottom-4 md:right-4 z-40 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					aria-label={`Sound effects ${soundEnabled ? 'enabled' : 'disabled'}`}
					title={`Click to ${soundEnabled ? 'disable' : 'enable'} sound effects`}
				>
					{soundEnabled ? (
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.813L4.869 14.142A2 2 0 014 14.142H2a1 1 0 01-1-1V7a1 1 0 011-1h2.869a2 2 0 01.869.142l3.514-2.671a1 1 0 01.617-.195zM15.75 5.25a1 1 0 012 0v9.5a1 1 0 11-2 0v-9.5z" clipRule="evenodd" />
							<path fillRule="evenodd" d="M13.5 7.5a1 1 0 012 0v5a1 1 0 11-2 0v-5z" clipRule="evenodd" />
						</svg>
					) : (
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.813L4.869 14.142A2 2 0 014 14.142H2a1 1 0 01-1-1V7a1 1 0 011-1h2.869a2 2 0 01.869.142l3.514-2.671a1 1 0 01.617-.195z" clipRule="evenodd" />
							<path fillRule="evenodd" d="M15.293 6.293a1 1 0 011.414 0L18 7.586l1.293-1.293a1 1 0 111.414 1.414L19.414 9l1.293 1.293a1 1 0 01-1.414 1.414L18 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L16.586 9l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					)}
				</motion.button>

				{/* Floating Particles */}
				<div className="particles-container" aria-hidden="true">
					{particles.map((particle) => (
						<motion.div
							key={particle.id}
							className="floating-particle"
							style={{
								left: `${particle.x}%`,
								top: `${particle.y}%`,
								width: `${particle.size}px`,
								height: `${particle.size}px`,
							}}
							animate={{
								y: [0, -20, 0],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								delay: particle.delay,
								ease: "easeInOut",
							}}
						/>
					))}
				</div>

				<LayoutHeader />
				<main id="main-content" className="flex-grow pb-20 md:pb-0">
					<Outlet />
				</main>

				{/* Shared Footer */}
				<motion.footer
					className="py-12 border-t border-muted/30 bg-muted/40"
					role="contentinfo"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.6 }}
				>
					<div className="container mx-auto px-4">
						<div className="flex flex-col items-center justify-center space-y-8">
							<nav className="flex justify-center space-x-6" aria-label="Social media links">
								<SocialLink href="https://twitter.com/sarbeh_" aria-label="Twitter @sarbeh_" onInteraction={playSound}>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
									</svg>
								</SocialLink>

								<SocialLink href="https://www.linkedin.com/in/sarbeh/" aria-label="LinkedIn Ibrahim NH" onInteraction={playSound}>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								</SocialLink>

								<SocialLink href="https://github.com/herbras" aria-label="GitHub herbras" onInteraction={playSound}>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
								</SocialLink>
							</nav>

							<div className="flex flex-col items-center space-y-4">
								<div className="text-sm text-muted-foreground text-center">
									designed and built by sarbeh :)
								</div>
							</div>
						</div>
					</div>
				</motion.footer>

				{/* Contact Modal */}
				<ContactModal
					isOpen={showModal}
					onClose={() => $showContactModal.set(false)}
					onInteraction={playSound}
					modalRef={modalRef}
				/>

				{/* Search Modal */}
				<SearchModal
					isOpen={showSearchModal}
					onClose={() => $showSearchModal.set(false)}
					onInteraction={playSound}
					modalRef={searchModalRef}
				/>
			</div>
			<Toaster richColors />
			{typeof window !== 'undefined' && <PWAUpdater />}
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="container mx-auto p-4 pt-16">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full overflow-x-auto p-4">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
