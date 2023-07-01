import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
		// extensions tells Svelte which extensions to treat as components, so now, we import .md files just like a .svelte component.
	extensions: ['.svelte', '.md'],
	preprocess: [
		// vitePreprocess is here to enable SASS.
		vitePreprocess(),
		mdsvex({
			// mdsvex by default only uses .svx extensions, we add .md for md extensions.
			extensions: ['.md']
		})
	  ],
};

export default config;
