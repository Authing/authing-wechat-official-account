# Authing x WeChat public number sweep code login. Message Forwarding Service.

<div align=center>
  <img width="250" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg" />
</div>

<div align="center">
    <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-forum-blue" /></a>
    <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-success" alt="License"></a>
</div>

**English** | [简体中文](./README.zh_CN.md)

## Why do I need this service?

You can turn on the server configuration in **Development** -> **Basic Configuration** page in the backend of WeChat Public Platform. When users scan the QR code of the public number and follow the public number, Authing will be able to receive the user sweep and follow events to complete the login.

Since only one WeChat server configuration can be set up, you need to choose two different modes according to your specific scenario.

- **Mode 1**: Set server address as Authing server endpoint, this mode is the simplest, but all events of WeChat Public will be pushed to Authing server, you will lose other events except sweep and follow.

- **Mode 2**: Set the server address as your own server, and then forward the sweep and follow events to Authing server endpoint.

If you have a usage scenario other than user sweep login, you can directly choose mode one; if you have some other business besides user sweep event, such as event push, custom message reply, etc., you need to choose mode two.

This sample project is prepared for a **Mode II** scenario.

## Configuration file

Add the configuration file `config.yaml` to the directory where the project is located, the sample configuration file is as follows.

```yaml
port: 3000
wechat:
  appId: xxx
  token: xxx
  encodingAESKey: xxx
  subscribeMessage: Hello and welcome to Authing. \n\nAuthing provides an easy-to-use and scalable identity cloud platform for developers and currently serves tens of thousands of developers and enterprises in seven countries around the world. Our mission is to make identity management easier.

authing:
  host: https://core.authing.cn
  userPoolId: xxx
  socialConnectionIdentifier: xxx
```

Definition of each item in the configuration file.

- `port`: The port number on which this service is running
- `wechat`: WeChat public number related configuration
    - `appId`: WeChat Public AppId
    - `token`: Token configured in WeChat Public Platform
    - `encodingAESKey`: EncodingAESKey configured in WeChat Public Platform
    - `subscribeMessage`: Messages sent to users after they follow
- `authing`: Authing Related Configuration
    - `host`: Authing server address, the default is https://core.authing.cn, if you are deploying privately, you need to change this address to the address of your privatized deployment service.
    - `userPoolId`: Authing User Pool ID
    - `socialConnectionIdentifier`: The unique identifier of the WeChat identity source created in Authing, see the documentation for details: https://docs.authing.cn/v2/connections/wechatmp-qrcode/

## Launch Project

```sh
$ yarn
$ yarn start
```

## Configure server address in WeChat Public

1. URL to the address where the service is deployed, with the default route being `/wechat/events`.
2. Please select secure mode for message encryption method.

![](https://cdn.authing.cn/img/20220222170139.png)

## Next

Once the above steps are completed, the WeChat Public event forwarding service is finished. Next, you can try to do the WeChat public number sweep login, and it will work if there is no problem!

## Questions

For questions and support please use the [official forum](https://forum.authing.cn/). The issue list of this repo is exclusively for bug reports and feature requests.

## Contribution

- Fork it
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push -u origin my-new-feature)
- Create new Pull Request
## Contribute

https://github.com/Authing/.github/blob/main/CONTRIBUTING.md#English


## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Authing
