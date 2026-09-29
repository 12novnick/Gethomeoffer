import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  // One small cached stylesheet instead of many render-blocking per-component files.
  build: { cssCodeSplit: false },
});
