import { defineConfig } from "vitepress";

export default defineConfig({
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.jpg",
    nav: [
      { text: "首页", link: "/" },
      { text: "开始", link: "/v0.x/quickstart/readme" },
      { text: "例子", link: "/v0.x/examples/readme" },
      { text: "生态", link: "/v0.x/eco/readme" },
      { text: "资源", link: "/v0.x/awesome/readme" },
      { text: "贡献", link: "/v0.x/contribute/readme" },
      {
        text: "v0.x",
        items: [
          { text: "next", link: "/next/" },
          { text: "v0.x (latest)", link: "/" },
        ],
      },
    ],

    sidebar: {
      "/v": [
        {
          text: "快速入门",
          link: "/v0.x/quickstart/readme",
          items: [
            {
              text: "食用指南",
              link: "/v0.x/guide/readme",
              collapsed: true,
              items: [
                {
                  text: "从上帝视角看 nidrs",
                  link: "/v0.x/guide/god-look",
                },
                {
                  text: "路由的基本使用",
                  link: "/v0.x/guide/route",
                },
                {
                  text: "模块化开发思想",
                  link: "/v0.x/guide/module-dev",
                },
                {
                  text: "错误处理和传播",
                  link: "/v0.x/guide/error-handle",
                },
                {
                  text: "拦截器 & 元编程",
                  link: "/v0.x/guide/interceptor-meta",
                },
                {
                  text: "使用 Tower 中间件",
                  link: "/v0.x/guide/tower-middleware",
                },
                {
                  text: "开发一个模块库",
                  link: "/v0.x/guide/module-lib",
                },
                {
                  text: "nidrs vs axum",
                  link: "/v0.x/guide/why-nidrs",
                },
                {
                  text: "愿景目标里程碑",
                  link: "/v0.x/guide/milestone",
                },
              ],
            },
          ],
        },
        {
          text: "概念原理",
          link: "/v0.x/concept/readme",
          items: [
            {
              text: "Service",
              link: "/v0.x/concept/service/readme",
            },
            {
              text: "Controller",
              link: "/v0.x/concept/controller/readme",
            },
            {
              text: "Module",
              link: "/v0.x/concept/module/readme",
            },
            {
              text: "Interceptor",
              link: "/v0.x/concept/interceptor/readme",
            },
            {
              text: "Meta",
              link: "/v0.x/concept/meta/readme",
            },
          ],
        },
        {
          text: "食谱例子",
          link: "/v0.x/examples/readme",
          items: [
            {
              text: "OpenAPI",
              link: "/v0.x/examples/openapi/readme",
            },
            {
              text: "ORM Diesel",
              link: "/v0.x/examples/orm-diesel/readme",
            },
          ],
        },
        {
          text: "生态资源",
          items: [
            {
              text: "命令工具",
              link: "/v0.x/eco/readme",
            },
            {
              text: "相关资源",
              link: "/v0.x/awesome/readme",
            },
          ],
        },
        {
          text: "贡献者读",
          link: "/v0.x/contribute/readme",
        },
        {
          text: "开源协议",
          link: "https://github.com/nidrs/nidrs/blob/main/LICENSE",
        },
        {
          text: "参考文档",
          link: "https://crates.io/crates/nidrs",
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/nidrs/nidrs" }],
  },
});
