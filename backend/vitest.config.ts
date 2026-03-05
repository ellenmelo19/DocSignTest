import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';  // Plugin herda paths do tsconfig

export default defineConfig({
  plugins: [tsconfigPaths()],  // Só isso resolve aliases
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    include: ['tests/**/*.{test,spec}.ts'],  // Pega unit e integration
  },
});