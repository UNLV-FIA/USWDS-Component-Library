// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@uswds/uswds/js': path.resolve(__dirname, './projects/ngx-uswds-lib/node_modules/@uswds/uswds/dist/js/uswds.min.js'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
