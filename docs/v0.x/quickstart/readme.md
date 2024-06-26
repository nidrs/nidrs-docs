# 快速入门

## 为什么要选择 nidrs

> 简单、高度复用、高性能等

在使用 Rust 进行后端开发时，nidrs 的初衷是提供极致简单、舒适且高度复用的开发体验，除了框架本身通过宏简化开发，nidrs 同时提供了 CLI 辅助工具和 PNM 进程管理工具，然我们在开发和部署的时候可以非常简单、方便。

相较于其他框架（如 axum、actix-web），nidrs 提供了更高级别的封装和抽象，对于熟悉 IOC 和 AOP 的开发者来说，这是一个非常友好的框架。虽然有些开发者可能对 IOC 和 AOP 有所抵触，但不可否认，面向对象开发仍然是后端开发的主流。目前还没有比这套更成熟的开发模式。

尽管 nidrs 提供了更高级别的封装，但在性能方面并没有太多的消耗。大部分实现都是基于 macro，运行时的性能基本与在 main 中使用 axum 相当。

## 为什么基于 Axum 开发

> [axum](https://github.com/tokio-rs/axum) 是一个高性能的 web 框架。

简单来说就是两点：

- 一是因为 tokio
- 二是为了 tower

tokio 不用多说，目前算是 rust 库中顶流中的顶流，他强大的异步性能和丰富的生态让后面的解决方案更加丰富并且可以实现更多的可能，比如 wasm 环境运行， 后面希望可以支持 wasm，这样我们就可以体验非常好的开发体验以及快速的冷启动。

tower 也是一个非常成熟的中间件的框架方案，他也有很多的已经写好的库可以直接使用，比如接口超时处理等。

## 如何食用文档

> 说明文档的框架和思路

对于本文档来说，仓主的目标就是不要扯太多的废话，说重点（这不是给我写作能力差找台阶），尽可能不扯一些太高深的术语（如果实在没办法也会重复解释），使用大白话来让大家学会 nidrs 框架的使用。

整个文档的框架基本就是 总-分-总（标准小学生写作 style），先简单是说一下框架的使用方法，然后将其中的重点拆出来细说，同时配备大量的例子来说明特性，同时也会大量的描述用在对宏展开后的原理解释，让大家用的安心舒爽。

- 快速入门是让大家可以几分钟就可以上手框架的使用。
- 食用指南是对重点知识进行细说。
- 基本概念是对 nidrs 重要的基础概念进行详细的描述。
- 食谱例子是对场景的应用教程。

## 准备

> 安装 Rust 环境 & 安装 Cli 工具

### 安装环境

- [安装 Rust](https://www.rust-lang.org/zh-CN/tools/install)
- [配置国内镜像源](https://rsproxy.cn/)

### 安装 CLI

```shell
cargo install nidrs-cli
```

## 例子

- 使用 Cli 创建一个项目
- 运行这个项目
- 请求 API 接口

### 快速创建一个项目

```shell
nid new hello-nidrs
```

[从这里在线看代码](https://github.dev/nidrs/nidrs-quickstart-template)

### 运行这个项目

```shell
cd hello-nidrs
nid dev
```

### 请求接口

```shell
ctrl xxx

```

## 最后

通过上面的例子我相信大家对 nidrs 有了一定的了解，后面让我们开启正在的旅行吧，对于框架的问题和细节大家可以加群或直接的 github 上进行提问，作为仓主一定会在第一时间进行解答，欢迎大家提 ISSUE 或者 提PR 进行贡献。
