import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
export default defineConfig({
	optimizeDeps: {
		rolldownOptions: {
			
		}
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		enhancedImages(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url'],
		})
	]
});
