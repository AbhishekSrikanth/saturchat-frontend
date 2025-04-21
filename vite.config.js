import { defineConfig, loadEnv } from 'vite';
import process from 'process';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __WS_BASE_URL__: JSON.stringify(env.VITE_WS_BASE_URL),
    },
  };
});
