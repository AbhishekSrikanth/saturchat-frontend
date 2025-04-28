/* eslint-env node */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    define: {
      __WS_BASE_URL__: JSON.stringify(process.env.VITE_WS_BASE_URL),
      __API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL),
    },
  };
});
