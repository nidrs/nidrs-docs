---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Nidrs"
  text: "一个 Rust 企业级开发框架."
  tagline: 快速构建模块化后端.
  actions:
    - theme: brand
      text: 快速入门
      link: /document/quickstart/zh
    - theme: alt
      text: 食谱例子
      link: /document/examples/zh

features:
  - title: 简单快速
    details: nidrs 首要目标就是要降低 rust 开发系统的繁杂工序，通过宏的巧妙设计与axum 的函数魔法参数，极大的提升开发体验。
  - title: 模块化
    details: nidrs 模块化参考 Nestjs 的三层架构设计，即控制器、服务层、实体层，通过对这三层的封装，我们可以非常轻松构建一个通用的模块，并且可以高效的组合复用。
  - title: 依赖注入
    details: 依赖注入是 nidrs 非常重要的一个特性，该特性可以非常轻松的自动的将其他模块的 Service 注入到当前 Service 特定的字段中，并且解决了循环依赖的问题。
  - title: 元编程+拦截器
    details: 我们可以通过 meta 宏来为模块、控制器、方法绑定一些属性，然后在拦截器中通过这些属性来实现一些非常便携的功能。
  - title: 可测试
    details: 通过 nidrs 提供的测试套件，我们可以快速的测试某个 API 或者某个 Service 的功能。
  - title: 错误处理
    details: nidrs 有一套全局的统一的错误处理方案，可以让我们非常方便的可跟踪这些错误，并且友好的响应。
  - title: 自动 OpenAPI
    details: OpenAPI 可以让我们非常快速的构建出 Swagger API 文档，并且在这个过程中，我们只需要添加少量的标记即可实现。
  - title: WASM
    details: nidrs 基于 axum 开发，这让我们以 WASM 方式运行变得简单，通过 WASM 我们可以更安全的运行系统。
    
---

