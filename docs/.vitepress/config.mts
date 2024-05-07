import { defineConfig } from 'vitepress'
import ZhConfig from './locales/zh/config.mts'
import EnConfig from './locales/en/config.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nidrs",
  description: "nidrs docs.",
  head: [['link', { rel: 'icon', href: '/logo.jpg' }]],
  locales: {
    root: {
      lang: 'zh',
      label: '中文',
      description: 'nidrs docs.',
      themeConfig: ZhConfig.themeConfig,
    },
    en: {
      label: 'English',
      lang: 'en',
      description: 'nidrs docs.',
      themeConfig: EnConfig.themeConfig,
    },
  },
})
