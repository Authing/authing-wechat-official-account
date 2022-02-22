import { loadConfig } from './loadConfig';

export interface WechatConfig {
  appId: string;
  token: string;
  encodingAESKey: string;
  subscribeMessage: string;
}

export interface AuthingConfig {
  host: string;
  userPoolId: string;
  socialConnectionIdentifier: string;
}

export interface Config {
  port: number;
  wechat: WechatConfig;
  authing: AuthingConfig;
}

export const config: Config = {
  port: loadConfig('port', 3000),
  authing: {
    host: loadConfig('authing.host', 'https://core.authing.cn'),
    userPoolId: loadConfig('authing.userPoolId', undefined),
    socialConnectionIdentifier: loadConfig(
      'authing.socialConnectionIdentifier',
      undefined,
    ),
  },
  wechat: {
    appId: loadConfig('wechat.appId'),
    token: loadConfig('wechat.token'),
    encodingAESKey: loadConfig('wechat.encodingAESKey'),
    subscribeMessage: loadConfig('wechat.subscribeMessage', '欢迎关注！'),
  },
};
