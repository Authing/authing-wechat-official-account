# Authing x 微信公众号扫码登录 消息转发服务


## 为什么需要此服务 ？

你可以在微信公众平台后台的 **开发** -> **基本配置** 页面，开启服务器配置，当用户扫描公众号二维码、关注公众号之后，Authing 就可以接收到用户扫码和关注事件，从而完成登录。

由于微信服务器配置只能设置一个，所以你需要根据自己的具体场景选择两种不同模式：

- **模式一**：设置服务器地址为 Authing 服务器端点，这种模式最为简单，但是微信公众号的所有事件都会推送到 Authing 服务器，你会丢失掉除扫码和关注之外的其他事件。

- **模式二**：设置服务器地址为自己的服务器，然后将扫码和关注事件转发至 Authing 服务器端点，这种模式需要进行一定开发工作，但是不会丢失事件，且利于之后基于公众号事件做更多扩展。

如果你除了用户扫码登录着一种使用场景，可以直接选择模式一；如果除了用户扫码事件外，你还有其他的一些业务，比如事件推送、自定义消息回复等，需要选择模式二。

此示例项目是为 **模式二** 的场景准备的。

## 配置文件

在项目所在目录添加配置文件 `config.yaml`，示例配置文件如下：

```yaml
port: 3000
wechat:
  appId: xxx
  token: xxx
  encodingAESKey: xxx
  subscribeMessage: 您好，欢迎关注 Authing。\n\nAuthing 为开发者提供了一个简单易用可拓展的身份云平台，目前已服务全球七个国家的数万开发者和企业。我们的使命是让身份管理变得更简单。

authing:
  host: https://core.authing.cn
  userPoolId: xxx
  socialConnectionIdentifier: xxx
```

配置文件中每一项的释义：

- `port`: 此服务运行的端口号；
- `wechat`: 微信公众号相关配置
    - `appId`: 微信公众号 AppId
    - `token`: 在微信公众平台配置的 Token
    - `encodingAESKey`: 在微信公众平台配置的 EncodingAESKey
    - `subscribeMessage`: 用户关注后给其发送的消息
- `authing`: Authing 相关配置
    - `host`: Authing 服务器地址，默认为 https://core.authing.cn，如果是私有化部署，需要修改此地址为你私有化部署服务的地址。
    - `userPoolId`: Authing 用户池 ID
    - `socialConnectionIdentifier`: 在 Authing 中创建的微信身份源唯一标志符，详情请见文档：https://docs.authing.cn/v2/connections/wechatmp-qrcode/

## 启动项目

```sh
$ yarn
$ yarn start
```

## 在微信公众号中配置服务器地址

1. URL 填写本服务部署的地址，路由默认为 `/wechat/events`；
2. 消息加密方式请选择安全模式。

![](https://cdn.authing.cn/img/20220222170139.png)

## 接下来

上述步骤完成之后，微信公众号事件转发服务就完成了。接下来，你可以尝试进行微信公众号扫码登录，不出问题的话，It will work!
