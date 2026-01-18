import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "dark",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "dark",
	storageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") return defaultTheme;
		try {
			const saved = localStorage.getItem(storageKey) as Theme;
			if (saved && ["dark", "light", "system"].includes(saved)) return saved;
		} catch {}
		return defaultTheme;
	});

	// Apply theme to DOM and save to localStorage
	useEffect(() => {
		const root = document.documentElement;
		const currentTheme = theme === "system"
			? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
			: theme;

		root.classList.remove('dark', 'light');
		root.classList.add(currentTheme);
		root.setAttribute("data-theme", currentTheme);

		try {
			localStorage.setItem(storageKey, theme);
		} catch {}
	}, [theme, storageKey]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	const value = {
		theme,
		setTheme,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
