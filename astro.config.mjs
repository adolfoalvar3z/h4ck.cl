// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';

const isBuild = process.argv.includes('build');

export default defineConfig({
    site: 'https://h4ck.cl',
    integrations: [
        isBuild ? null : keystatic()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});