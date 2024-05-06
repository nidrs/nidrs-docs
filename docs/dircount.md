# Nidrs 大纲

## 快速入门

### 为什么要选择 nidrs？

- 简单、高度复用、高性能等

### 如何食用这个文档

- 说明文档的框架和思路

### 为什么基于 Axum 开发

- tower
- tokio

### 准备

- 安装 Rust 环境
- 安装 Cli 工具

### 例子

- 使用 Cli 创建一个项目
- 运行这个项目
- 请求 API 接口

## 食用指南

### 从上帝视角快速入门 nidrs

- 关键的宏
- 关键的配置
- 简单的例子

### 路由

- 路由是什么
- 路由方法
- 请求参数
- 参数校验
- 响应结果
- 请求头获取
- 响应头设置
- 访问 Meta
- 使用拦截器

### 依赖注入

- 简单的依赖注入
- 解决循环依赖问题
- 实现原理

### 接口前缀 & 接口版本

- 设置接口前缀
- 设置接口版本
- 禁用当前接口使用前缀

### 拦截器 & 元编程

- 什么是拦截器
- 开发一个拦截器
- 元编程又是什么
- 无所不在的 meta
- 在 controller 中获取 meta
- 拦截器与中间件的区别
- 将数据塞入 Meta 中
- 修改响应
- 

### 模块化开发思想

- 模块化封装

### 错误处理以及错误传递

- 尽可能的使用 AppResult 返回数据
- 如何抛出一个异常

### 使用 Tower 中间件

- 使用接口超时处理中间件

### 通过目录来理解 nidrs 框架

- 目录结构说明

### 开发一个 nidrs module lib

- 创建项目
- 编写代码
- 发布到 crate

### 为什么不选择 axum or actix-web

- 相同点
- 不同点

### 框架的目标与里程碑

- nidrs 目标
- nidrs 里程碑

## 基础概念

### Service

- 什么是 service
- 一切皆 service
- inject Service
- 宏展开

### Controller

- 什么是 Controller
- 路由方法
- Axum 的限制
- 宏展开

### Interceptor

- 什么是 Interceptor
- 设计思想
- AnyBody 是什么

### Module

- 导入模块
- 注册 Service
- 注册 Controller
- 注册 Interceptor
- 导出 Service
- 全局模块

### Meta

- 什么是 Meta
- Meta 使用
- Meta 存放什么
- Meta 作用域

## 食谱例子

### OpenAPI

- 生成 API 接口文档
- 生成 API 调用文件

### ORM Diesel

- Diesel ORM 的使用
- 注意实习

## 参考文档

- 使用 cargo-doc 生成的 API 文档

## 生态工具

### CLI

- 创建项目
- 创建 APP
- 创建 Lib
- 启动服务
- 停止服务
- 监控服务
- 生成模块
- 代码生成
- 问答机器人

### PNM

- 进程管理
- 线程监控
- 均衡负载
- 集群化
- 日志管理

## 相关资源

### 快速启动模版

- quickstart-template

### 模块库

- nidrs-diesel
- nidrs-sea
- nidrs-config
- nidrs-jwt
- nidrs-passport
- nidrs-openapi

### 开源项目

- xxx

### 其他

- cargo-set

## 贡献者读

### nidrs 设计思路

- 深受 Nestjs 影响
- 使用宏简化开发复杂度
- 不要让开发者调用宏生成的代码
- 尽可能少的概念

### 如何贡献

- 视频教程
- 文档教程
- 文档补充
- 代码贡献
- 生态建设
- 使用 nidrs 开发开源的项目

### 初始化环境

### 项目结构

### 如何提 BUG

### 如何提 PR

- Commit 规范

## 开源协议

### MIT
