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
      { text: '开始', link: '/zh/quickstart/readme' },
      { text: '例子', link: '/zh/examples/readme' },
      { text: '生态', link: '/zh/eco/readme' },
      { text: '资源', link: '/zh/awesome/readme' },
      { text: '贡献', link: '/zh/contribute/readme' },
      { text: '参考', link: 'https://crates.io/crates/nidrs' }
    ],

    sidebar: {
      '/zh' :[
        {
          text: 'Nidrs',
          items: [
            {
              text: '快速入门',
              link: '/zh/quickstart/readme'
            },
            {
              text: '食用指南',
              link: '/zh/guide/readme'
            },
          ]
        },
        {
          text: '基本概念',
          link: '/zh/concept/readme',
          items: [
            {
              text: 'Service',
              link: '/zh/concept/service/readme'
            },
            {
              text: 'Controller',
              link: '/zh/concept/controller/readme'
            },
            {
              text: 'Module',
              link: '/zh/concept/module/readme'
            },
            {
              text: 'Interceptor',
              link: '/zh/concept/interceptor/readme'
            },
            {
              text: 'Meta',
              link: '/zh/concept/meta/readme'
            },
          ]
        },
        {
          text: '食谱例子',
          link: '/zh/examples/readme',
          items: [
            {
              text: 'OpenAPI',
              link: '/zh/examples/openapi/readme'
            },
            {
              text: 'ORM Diesel',
              link: '/zh/examples/orm-diesel/readme'
            },
          ]
        },
        {

          text: '生态资源',
          items: [
            {
              text: '命令工具',
              link: '/zh/eco/readme'
            },
            {
              text: '相关资源',
              link: '/zh/awesome/readme'
            },
          ]
        },
        {
          text: '贡献者读',
          link: '/zh/contribute/readme'
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
