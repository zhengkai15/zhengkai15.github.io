import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';

// zhengkai15.github.io 是 GitHub Pages 用户主页 repo，base 必须是 '/'（不要配 /repo-name/）
export default defineConfig({
  site: 'https://zhengkai15.github.io',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      defaultLocale: 'zh-CN',
      styleOverrides: {
        codeFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      },
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      wrap: true,
    },
  },
});
