import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nidrs",
  description: "nidrs docs.",
  locales: {
    root: {
      label: '中文',
      lang: 'zh'
    },
    en: {
      label: 'English',
      lang: 'en'
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/document/quickstart/zh' },
      { text: '例子', link: '/document/examples/zh' },
      { text: '生态', link: '/document/eco/zh' },
      { text: '资源', link: '/document/awesome/zh' },
      { text: '贡献', link: '/document/contribute/zh' },
      { text: '参考', link: 'https://crates.io/crates/nidrs' }
    ],

    sidebar: {
      '/document' :[
        {
          text: 'Nidrs',
          items: [
            {
              text: '快速入门',
              link: '/document/quickstart/zh'
            },
            {
              text: '食用指南',
              link: '/document/guide/zh'
            },
            {
              text: '基本概念',
              link: '/document/concept/zh'
            },
          ]
        },
        {
          text: '食谱例子',
          link: '/document/examples/zh',
          items: [
            {
              text: 'OpenAPI',
              link: '/document/examples/openapi/zh'
            },
            {
              text: 'ORM Diesel',
              link: '/document/examples/orm-diesel/zh'
            },
          ]
        },
        {

          text: '生态资源',
          items: [
            {
              text: '命令工具',
              link: '/document/eco/zh'
            },
            {
              text: '相关资源',
              link: '/document/awesome/zh'
            },
          ]
        },
        {
          text: '贡献者读',
          link: '/document/contribute/zh'
        },
        {
          text: '开源协议',
          link: 'https://github.com/nidrs/nidrs/blob/main/LICENSE'
        },
        {
          text: '参考文档',
          link: 'https://crates.io/crates/nidrs'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nidrs/nidrs' }
    ]
  }
})
