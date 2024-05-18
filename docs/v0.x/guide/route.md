# 路由的基本使用

## 路由是什么

路由是指定义用来接受 Http 请求的一个入口，在 nidrs 中就是 controller 中使用 `#[get]`、`#[post]`等标记的方法，nidrs 的路由和 axum ，限制（body 参数只能定义在最后一个参数）也一样，因为这些都是从 axum 里直接导入使用的，只不过是多了一个 meta 的上下文共享对象的解析（meta 只能放在第一个参数），这个放在后面说。

## 看一个例子

```rust
use std::collections::HashMap;

use axum::{
    extract::{Path, Query},
    Json,
};
use nidrs::{post, AppResult, Inject};
use nidrs_macro::{controller, get};

use crate::models::entities::user::User;

use super::{dto::CreateUserDto, service::UserService};

#[controller("/user")]
pub struct UserController {
    user_service: Inject<UserService>,
}

impl UserController {
    #[get("/")]
    pub async fn get_user_all(&self, Query(q): Query<HashMap<String, String>>) -> AppResult<Vec<User>> {
        println!("Query {:?}", q);

        self.user_service.all().await
    }

    #[get("/:id")]
    pub async fn get_user_by_id(&self, Path(user_id): Path<i32>, Query(q): Query<HashMap<String, String>>) -> AppResult<User> {
        println!("Query {:?}", q);

        self.user_service.find_by_id(user_id).await
    }

    #[post("/")]
    pub async fn create_user(&self, Json(j): Json<CreateUserDto>) -> AppResult<usize> {
        println!("Query {:?}", j);

        self.user_service.create(j).await
    }
}

```

> 本例子是 examples/hello-orm-diesel-sqlite

上面的例子中我们定义了三个路由入口，上面的例子是采用 RUSTfull 规范定义：

- get_user_all
  - method: GET
  - path: /user/
- get_user_by_id
  - method: GET
  - path: /user/:id
- create_user
  - method: POST
  - path: /user

我们可以通过浏览器或者 ctrl 进行请求尝试来看看请求的参数和返回的内容。

## 获取请求参数

http 请求参数主要分三种类型：

- Path
  - 在其他语言的框架中可能会叫 Params，这里不过多阐述，Path 也是从路径上获取参数，不过这个参数与 Query 不同的是获取的 ? 前面的参数。
  - 比如：/app/hello/12
  - 上面的 Path("id") 就会拿到 12
  - 在 nidrs 中通过 `Path(id): Path<u32>` 来获取。
- Query
  - 表示地址栏?后面的参数，通常用这种类型主要传入一些简单的参数比如：ID、分页码等
  - 比如：?a=1&b=2
  - 在 nidrs 中通过 `Query(q): Query<HashMap<String, String>>` 获取到 Query 参数，当然这是一个通用的获取方式，你也可以定义 DTO。
- Body
  - 表示从 Http 中的请求体获取参数，而请求体只有 POST、PUT、PATCH 等才有，GET、HEAD 等是没有的。
  - 比如：这个不太好比如【狗头】，他反正是在 Http 结构的第三段部分存储的。
  - 在 nidrs 中可以通过 `Json(j): Json<serde_json::Value>` 或者 `Json(j): Json<CreateUserDto>` 来获取 Body 中的参数，这里聪明的小伙伴发现了 `serde_json` 库，这是一个很重要的库，就是下面将要讲的序列化和反序列化。

## 序列化、反序列化、DTO

首先解释一下这几个术语：

- 序列化：将一个 `Rust 结构体`转为 `字符串`，
- 反序列化：表示将一个`字符串`转换为 `Rust 的结构体`
- DTO: 就是上面提到的 `Rust 结构体`，用来承载着序列化或反序列化的责任。

为什么要进行序列化呢，总所周知 Http 是一个`超文本`传输协议，这里有两个重点，一是`文本`、二是`超`，文本就是我们写的文档、超就是支持二进制传输。

所以我们必须要对数据进行序列化，也就是文本化后才可以进行传输，目前主流的用于传输的序列化格式主要有 JSON、 XML（老系统）、Protobuf、GraphQL 等，这里我们只需要熟悉 JSON 就行，其他可以自行查阅。

而在 Rust 中进行序列化最常用的库就是 `serde`，其中用来解析 JSON 的就是`serde_json`，从名字可以看出他肯定不止可以序列化 JSON、也支持 XML 等很多的类型。

而 DTO 就是一个载体用来使用 serde 实现序列化和反序列化的，看下面的例子：

```rust

#[derive(Debug, serde::Deserialize)]
pub struct CreateUserDto {
    pub name: String,
}

#[derive(Selectable, Queryable, Debug, serde::Serialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub updated_at: NaiveDateTime,
    pub created_at: NaiveDateTime,
}
```

一般为了偷懒我们都是给传入的参数定义 `serde::Deserialize`，返回参数定义 `serde::Serialize`，不过特殊需求也需要定义返回的 DTO。

后面我就可以直接返回，或者直接获取操作这个 DTO 了。

## 参数校验

DTO 还有一个责任就是进行参数的校验。

TODO..

## 获取请求头

```rust
impl UserController {
    #[get("/")]
    pub async fn get_user_all(&self, header: HeaderMap, Query(q): Query<HashMap<String, String>>) -> AppResult<Vec<User>> {
        println!("Query {:?}", q);

        let rid = header.get("X-RID");

        if let Some(rid) = rid {
            println!("rid: {:?}", rid);
        }

        self.user_service.all().await
    }
}
```

我们可以通过上面的方式来拿到请求头，这个与 axum 是一致的可以查看 axum 的文档。

## 设置响应头

```rust
impl UserController {
    #[get("/")]
    pub async fn get_user_all(
        &self,
        header: HeaderMap,
        Query(q): Query<HashMap<String, String>>,
    ) -> AppResult<Vec<User>> {
        println!("Query {:?}", q);

        let rid = header.get("X-RID");

        if let Some(rid) = rid {
            println!("rid: {:?}", rid);
        }

        AppResult::Ok(self.user_service.all().await?).header("X-Test", "test")
    }
}
```

我们可以通过 `AppendHeaders` 结构体来设置响应头，这也是从 axum 中导入。

## 接口前缀 & 接口版本

我们可以在启动的时候配置所有路由的接口前缀，并且可以使用 `#[version]` 宏进行接口的版本管理。

```rust
mod app;
mod interceptors;
mod models;
mod modules;
mod shared;
// mod test;

pub use nidrs::AppError;
pub use nidrs::AppResult;

#[nidrs::main]
fn main() {
    let app = nidrs::NidrsFactory::create(app::AppModule);

    let app = app.default_prefix("/api/{version}");
    let app = app.default_version("v1");

    app.listen(3000);
}

```

上面的代码通过 `app.default_prefix("/api/{version}")` 设置了接口的前缀，通过 `app.default_version("v1")` 设置了默认版本，后面的接口都会增加这个前缀，比如 `/api/v1/user/`

如何进行设置某个接口的版本号呢，看下面的例子：

```rust
impl UserController {

    #[version("v2")]
    #[get("/:id")]
    pub async fn get_user_by_id_v2(&self, Path(user_id): Path<i32>, Query(q): Query<HashMap<String, String>>) -> AppResult<User> {
        println!("Query {:?}", q);

        self.user_service.find_by_id(user_id).await
    }
}
```

这里的 `#[version("v2")]` 不仅仅支持在方法上定义，也支持在 struct 上定义。

如果我某个接口不想要前缀该怎么弄呢，我们可以通过 `#[meta(disable_default_prefix)]` 来禁用掉某个 struct 或者 方法添加前缀，这里提到的 meta 宏是一个比较重要的概念，后面会深入讲解。

## 最后

通过上面的内容我们基本熟悉了 nidrs 的路由的知识点，当然上面只是入门，还有很多细节的知识可以到【概念原理/controller】中学习。
