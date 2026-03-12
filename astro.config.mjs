// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isBuild = process.argv.includes('build');

export default defineConfig({
    site: isBuild ? 'https://adolfoalvar3z.github.io' : 'http://localhost:4321',
    base: isBuild ? '/h4ck.cl/' : '/',
    output: isBuild ? 'hybrid' : 'hybrid',
    integrations: [
        react(),
        isBuild ? null : keystatic()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});

