import { defineConfig } from "vitepress";

export default defineConfig({
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/book/quickstart/readme' },
      { text: '例子', link: '/book/examples/readme' },
      { text: '生态', link: '/book/eco/readme' },
      { text: '资源', link: '/book/awesome/readme' },
      { text: '贡献', link: '/book/contribute/readme' },
      { text: '参考', link: 'https://crates.io/crates/nidrs' }
    ],

    sidebar: {
      '/book' :[
        {
          text: 'Nidrs',
          items: [
            {
              text: '快速入门',
              link: '/book/quickstart/readme'
            },
            {
              text: '食用指南',
              link: '/book/guide/readme'
            },
          ]
        },
        {
          text: '基本概念',
          link: '/book/concept/readme',
          items: [
            {
              text: 'Service',
              link: '/book/concept/service/readme'
            },
            {
              text: 'Controller',
              link: '/book/concept/controller/readme'
            },
            {
              text: 'Module',
              link: '/book/concept/module/readme'
            },
            {
              text: 'Interceptor',
              link: '/book/concept/interceptor/readme'
            },
            {
              text: 'Meta',
              link: '/book/concept/meta/readme'
            },
          ]
        },
        {
          text: '食谱例子',
          link: '/book/examples/readme',
          items: [
            {
              text: 'OpenAPI',
              link: '/book/examples/openapi/readme'
            },
            {
              text: 'ORM Diesel',
              link: '/book/examples/orm-diesel/readme'
            },
          ]
        },
        {

          text: '生态资源',
          items: [
            {
              text: '命令工具',
              link: '/book/eco/readme'
            },
            {
              text: '相关资源',
              link: '/book/awesome/readme'
            },
          ]
        },
        {
          text: '贡献者读',
          link: '/book/contribute/readme'
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
