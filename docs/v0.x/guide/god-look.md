# 从上帝视角看 nidrs

> 关键的宏、关键的配置、简单的例子

<div style="width:100%;display: flex;justify-content: center">
  <img src="/modules.svg" width="400px" />
</div>

## 目录结构

首先我们先从整个框架的目录结构开始讲起：

```text
.
├── Cargo.toml                      # rust 项目配置
├── diesel.toml                     # diesel 相关
├── migrations                      # diesel 相关
│   └── ..
└── src                             # 项目最重要的源代码
    ├── main.rs                     # 这是整个项目最重要的启动入口
    ├── app/                        # App 模块的文件夹，App 模块是整个框架的根模块，一些全局的拦截器、配置之类的需要在这里配置。
    │   ├── controller.rs           # App 模块的 controller ，主要是写路由声明的地方，可以理解为用户请求的入口
    │   ├── dto.rs                  # App 模块的 controller 传入参数和返回结果的定义的地方
    │   ├── exception.rs            # App 模块下出现的错误定义的地方
    │   ├── service.rs              # App 模块的 service 主要是用来写业务逻辑的地方
    │   └── mod.rs                  # 这是 App 模块入口，用来注册 controller 、service 等的地方，上面所说的全局拦截器就是在这里配置
    ├── interceptors/               # 这里是放全局拦截器的地方
    │   ├── json_interceptor.rs     # 这是一个拦截器
    │   └── mod.rs
    ├── models/                     # 这里是定义数据库模块和操作逻辑的地方
    │   ├── entities/               # 这里是存储的数据库模型
    │   └── schema.rs               # diesel 相关
    │   ├── mod.rs
    ├── modules/                    # 除了 App 模块其他模块都会放在这里，比如下面的 user 模块，他的内容和 App 模块类似
    │   ├── user/                   # user 相关逻辑
    │   └── mod.rs
    └── shared/                     # 用来存放相关的工具方法的地方
        ├── fn_test.rs
        └── mod.rs
```

> 上面的例子是 `hello-orm-diesel-mysql`。

上面是一个简单的 nidrs 项目目录，通过上面的目录结构我们大概可以窥探出 nidrs 框架是怎么进行代码的组织和管理的，其实简单的说就是通过 mod 来封装 controller、service 等，然后在导入其他模块进行使用，具体代码细节后面小编会细细道来。

下面通过一个简单的小例子让我们初窥一下 nidrs 核心的一些宏和配置。

## AppModule

```rust
// src/app/mod.rs
use nidrs::default_uses;
use nidrs_macro::module;

pub mod controller;
pub mod dto;
pub mod exception;
pub mod service;

use crate::modules::conf::ConfModule;
use crate::modules::conf::ConfOptions;
use crate::modules::log::LogModule;
use crate::modules::user::UserModule;
use controller::AppController;
use service::AppService;

#[default_uses(LogInterceptor)]
#[module({
    imports: [
        ConfModule::for_root(ConfOptions{
            log_level: "info".to_string(),
        }),
        LogModule,
        UserModule,
    ],
    controllers: [AppController],
    services: [AppService],
    exports: [AppService],
})]
#[derive(Clone, Debug)]
pub struct AppModule;
```

简单列一下上面使用的关键宏：

- `#[default_uses(interceptor)]`
  - 这个是用来定义全局的拦截器，这里加的拦截器会给所有模块的 controller 的方法上添加。
- `#[module(options)]`
  - 这是用来注册其他部件的关键宏，他表示这里定义了一个模块。
  - 这里需要注意的一点就是 module 宏一定是在最下面（这里相比的是 nidrs 里的宏），后面其他的关键宏也是这样的规定。

## Controller

```rust
// src/app/controller.rs
use std::collections::HashMap;

use axum::{extract::Query, Json};
use nidrs::{version, Inject, Meta};
use nidrs_macro::{controller, get, meta, post, uses};

use crate::AppResult;

use super::{dto::Status, service::AppService};

#[version("v1")]
#[meta(role = "admin")]
#[uses(LogInterceptor)]
#[controller("/app")]
#[derive(Debug)]
pub struct AppController {
    app_service: Inject<AppService>,
}

impl AppController {
    #[uses(Log2Interceptor)]
    #[version("v2")]
    #[get("/hello")]
    pub async fn get_hello_world_v2(&self, meta: Meta, Query(q): Query<HashMap<String, String>>) -> AppResult<Status> {
        println!("Query {:?}", q);
        println!("Meta {:?}", meta.get::<&str>("role"));
        // fn_test()?;
        Ok(Status { db: "ok".to_string(), redis: "ok".to_string() })
    }

    #[version("v2")]
    #[get("/hello")]
    pub async fn get_hello_world_v2(&self, meta: Meta, Query(q): Query<HashMap<String, String>>) -> AppResult<Status> {
        println!("Query {:?}", q);
        println!("Meta {:?}", meta.get::<&str>("role"));
        // fn_test()?;
        Ok(Status { db: "ok".to_string(), redis: "ok".to_string() })
    }

    #[meta(role = "user")]
    #[post("/hello")]
    pub async fn post_hello_world(&self, Query(q): Query<HashMap<String, String>>, Json(j): Json<serde_json::Value>) -> AppResult<String> {
        println!("Query {:?}", q);
        println!("Json {:?}", j);

        Ok("Hello, World2!".to_string())
    }
}

```

简单列一下上面使用的关键宏：

- `#[version("v1")]`
  - 设置当前 controller 或 方法的路由版本，请求的时候需要在路径上携带上版本。
- `#[meta(role = "admin")]`
  - 这个宏用来设置一个 role = "admin" 的数据，这个数据可以在拦截器或者路由方法中获取到。
- `#[uses(LogInterceptor)]`
  - 这是使用一个拦截器，可以给 struct 或者 方法上应用。
- `#[controller("/app")]`
  - 这是定义 controller 的关键宏，他表示这里是一个控制器，与 module 同理这个必须放在最下面。
- `#[get("/hello")]`
  - 定义 GET 路由，只能在方法上使用，与 module 同理这个必须放在最下面
- `#[post("/hello")]`
  - 定义 POST 路由，只能在方法上使用，与 module 同理这个必须放在最下面

## Service

```rust
// src/app/service.rs
use crate::modules::user::service::UserService;
use nidrs::Inject;
use nidrs_macro::injectable;

#[injectable()]
#[derive(Clone, Debug)]
pub struct AppService {
    user_service: Inject<UserService>,
}

impl AppService {
    pub fn get_hello_world(&self) -> String {
        self.user_service.extract().get_hello_world()
    }

    pub fn get_hello_world2(&self) -> String {
        "Hello, nidrs2xx333!".to_string()
    }
}

```

相比较上面两个，service 的使用定义就比较简单了，这里关键的就是

- `#[injectable]`
  - 他表示这个 struct 可以被注入到其他模块中，比如 `Inject<UserService>`.

通过上面的学习大家对 nidrs 的目录结构、关键宏有了一定的了解，大家也清楚了为什么说 nidrs 简单呢，原因就在于你仅仅看完这篇内容，就已经学会了 70% 的 API，这也是 nidrs 核心的设计理念就是简单，能不让开发者做的事情一定不会让开发者过多的费心，上面的内容其中比较重要的拦截器放在后面在细说，剩下的基本都是在这些基础上做文章，更多的细节，可以看参考文档或者概念文档。

下一节我们将重点学习路由。
