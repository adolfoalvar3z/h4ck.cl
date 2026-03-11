// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isBuild = process.argv.includes('build');

export default defineConfig({
    site: 'https://h4ck.cl',
    output: isBuild ? 'static' : 'hybrid',
    integrations: [
        react(),
        isBuild ? null : keystatic()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});

