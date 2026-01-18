import { atom, onMount, type ReadableAtom } from 'nanostores';
import { useState, useEffect, useSyncExternalStore } from 'react';

// SSR-safe useStore hook - replaces @nanostores/react which has React 19 issues
export function useStore<T>(store: ReadableAtom<T>): T {
	return useSyncExternalStore(
		(callback) => store.subscribe(callback),
		() => store.get(),
		() => store.get() // SSR snapshot
	);
}

// Sound state with SSR-safe persistence
export const $soundEnabled = atom<boolean>(false);

// Modal state
export const $showContactModal = atom<boolean>(false);
export const $showSearchModal = atom<boolean>(false);

// Particles state
export const $particles = atom<Array<{
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
}>>([]);

// Initialize sound state from localStorage when mounted (client-side only)
onMount($soundEnabled, () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('sound-enabled');
    if (saved) {
      $soundEnabled.set(JSON.parse(saved));
    }
  }
});

// Persist sound state to localStorage
$soundEnabled.listen((soundEnabled) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sound-enabled', JSON.stringify(soundEnabled));
  }
});

// Initialize particles with stable positions
onMount($particles, () => {
  // Only initialize if particles are empty to prevent re-generation
  if ($particles.get().length === 0) {
    // Try to get saved particles from localStorage first
    if (typeof window !== 'undefined') {
      const savedParticles = localStorage.getItem('particles-positions');
      if (savedParticles) {
        try {
          const parsed = JSON.parse(savedParticles);
          if (Array.isArray(parsed) && parsed.length > 0) {
            $particles.set(parsed);
            return;
          }
        } catch (e) {
          // If parsing fails, continue to generate new ones
        }
      }
    }

    // Generate stable particles using seeded random
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const particleArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 100) * 100,
      y: seededRandom(i * 200 + 50) * 100,
      delay: seededRandom(i * 300 + 100) * 6,
      size: seededRandom(i * 400 + 150) * 8 + 4,
    }));
    
    $particles.set(particleArray);
    
    // Save to localStorage for consistency
    if (typeof window !== 'undefined') {
      localStorage.setItem('particles-positions', JSON.stringify(particleArray));
    }
  }
});

// Sound effects function
export function playSound(type: 'click' | 'hover' | 'success' | 'toggle') {
  if (!$soundEnabled.get()) return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequencies = {
      click: 800,
      hover: 600,
      success: 1000,
      toggle: 400
    };

    oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.warn('Audio context not available:', error);
  }
} 