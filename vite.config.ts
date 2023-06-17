import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      '@app': 'src/app',
      '@domain': 'src/domain',
      '@infra': 'src/infra',
    },
  },
});
