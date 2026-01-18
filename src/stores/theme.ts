import { atom } from 'nanostores';

export type Theme = "dark" | "light" | "system";

// Storage key for localStorage
const STORAGE_KEY = "vite-ui-theme";

// Get initial theme synchronously on client-side
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return "dark"; // SSR default
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme;
    if (saved && ['dark', 'light', 'system'].includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  
  return "dark"; // fallback
}

// Initialize with immediate localStorage check
export const $theme = atom<Theme>(getInitialTheme());

// Apply theme to DOM immediately if on client
if (typeof window !== 'undefined') {
  applyThemeToDOM($theme.get());
}

// Listen for theme changes and persist
$theme.listen((theme) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
      applyThemeToDOM(theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }
});

// Apply theme to DOM
function applyThemeToDOM(theme: Theme) {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  
  // Remove previous theme classes/attributes
  root.classList.remove('dark', 'light');
  root.removeAttribute("data-theme");
  
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches ? "dark" : "light";
    
    root.classList.add(systemTheme);
    root.setAttribute("data-theme", systemTheme);
    return;
  }
  
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
}

// Theme setter function
export function setTheme(theme: Theme) {
  $theme.set(theme);
}

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if ($theme.get() === 'system') {
      applyThemeToDOM('system');
    }
  });
} 