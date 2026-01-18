import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		// AutoImport disabled - causes React hooks error with multiple instances
		// AutoImport({
		// 	include: [
		// 		/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
		// 	],
		// 	imports: [
		// 		"react",
		// 		"react-router"
		// 	],
		// }),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
				navigateFallback: '/index.html',
				navigateFallbackDenylist: [/^\/api/, /^\/og/],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							}
						}
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							}
						}
					}
				]
			},
			manifest: {
				name: "sarbeh",
				short_name: "sarbeh",
				description: "sarbeh - PWA Application",
				theme_color: "#0c0c0c",
				background_color: "#0c0c0c",
				display: "standalone",
				start_url: "/",
				scope: "/",
				icons: [
					{
						src: "/favicon.svg",
						sizes: "any",
						type: "image/svg+xml",
						purpose: "any maskable"
					},
					{
						src: "/favicon.ico",
						sizes: "32x32",
						type: "image/x-icon"
					}
				]
			},
			pwaAssets: {
				disabled: false,
				config: true,
			},
			devOptions: {
				enabled: true,
				navigateFallback: 'index.html',
			},
		}),
	],
	server: {
		// Port untuk development
		port: 5175,
	},
	// Build configuration untuk Workers
	build: {
		target: "esnext",
	},
	// Fix React hooks error with nanostores
	optimizeDeps: {
		include: ['react', 'react-dom', '@nanostores/react', 'nanostores'],
	},
	resolve: {
		dedupe: ['react', 'react-dom'],
	},
});
