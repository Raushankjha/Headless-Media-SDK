import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@headless-media/media-core': fileURLToPath(
        new URL('../../packages/media-core/src/index.ts', import.meta.url),
      ),
      '@headless-media/media-react': fileURLToPath(
        new URL('../../packages/media-react/src/index.ts', import.meta.url),
      ),
      '@headless-media/media-ui-react': fileURLToPath(
        new URL('../../packages/media-ui-react/src/index.ts', import.meta.url),
      ),
    },
  },
});
