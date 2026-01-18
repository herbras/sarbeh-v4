import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { useTheme } from "@/components/theme-provider";

export default function LayoutHeader() {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === "dark";

    const handleThemeToggle = () => {
        setTheme(isDarkMode ? "light" : "dark");
    };

    const navigationItems = [
        { label: "about", path: "/" },
        { label: "work", path: "/work" },
        { label: "writing", path: "/writing" },
        { label: "uses", path: "/uses" },
        { label: "now", path: "/now" }
    ];

    return (
        <>
            {/* Desktop Header */}
            <motion.header
                className="w-full fixed top-0 z-50 py-4 md:py-8 hidden md:block"
                role="banner"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-4 md:px-6 flex flex-row items-center justify-between relative mt-2 md:mt-0">
                    {/* Logo */}
                    <div className="flex items-center flex-1 min-w-[180px] w-0 justify-start pr-2">
                        <h1 className="text-xl text-foreground italic whitespace-nowrap font-pacifico">
                            sarbeh
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav
                        className="bg-secondary rounded-full p-1.5 nav-pill-shadow flex min-w-[240px] w-auto justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        {navigationItems.map((tab) => (
                            <NavLink
                                key={tab.label}
                                to={tab.path}
                                className={({ isActive }) =>
                                    `inline-block px-6 py-3 text-base font-medium transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-full ${isActive
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
                                                className="absolute -inset-6 -inset-y-3 bg-white dark:bg-gray-800 rounded-full shadow-md"
                                                layoutId="activeDesktopTab"
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
                    <div className="flex items-center flex-1 min-w-[80px] w-0 justify-end gap-2">
                        <motion.button
                            onClick={handleThemeToggle}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full w-16 h-16 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 settings-button-shadow"
                            whileHover={{ scale: 1.05, rotate: 180 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                        >
                            <motion.div
                                animate={{ rotate: isDarkMode ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isDarkMode ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </motion.div>
                        </motion.button>

                        <motion.button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full w-16 h-16 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 settings-button-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Open contact form"
                            title="Contact me"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Header - Simple */}
            <motion.header
                className="w-full fixed top-0 z-50 py-4 md:hidden"
                role="banner"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-4 flex flex-row items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-lg text-foreground italic whitespace-nowrap font-pacifico">
                            sarbeh
                        </h1>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={handleThemeToggle}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 settings-button-shadow"
                            whileHover={{ scale: 1.05, rotate: 180 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                        >
                            <motion.div
                                animate={{ rotate: isDarkMode ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isDarkMode ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </motion.div>
                        </motion.button>

                        <motion.button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 settings-button-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Open contact form"
                            title="Contact me"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Bottom Navigation */}
            <motion.nav
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden bg-secondary rounded-full p-1.5 nav-pill-shadow flex gap-1"
                role="navigation"
                aria-label="Main navigation"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {navigationItems.map((tab) => (
                    <NavLink
                        key={tab.label}
                        to={tab.path}
                        className={({ isActive }) =>
                            `inline-block px-3 py-2 text-xs font-medium transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-full ${isActive
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
                                        className="absolute -inset-3 -inset-y-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
                                        layoutId="activeMobileTab"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </motion.nav>
        </>
    );
} 