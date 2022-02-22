import { Injectable } from '@nestjs/common';
import { CheckServerDto, wxEncryptMsgDto, wxTextMsgDto } from './app.dto';
import { createHash } from 'crypto';
import { WXMsgCrypto } from 'src/utils/wxcrypto';
import xml2js from 'xml2js';
import Axios from 'axios';
import { config } from './config';

// ---------------- 微信公众号配置项 ------------------ //
// 微信公众号的 AppID
const AppID = config.wechat.appId;
// 在微信公众平台配置的 Token
const Token = config.wechat.token;
// 在微信公众平台配置的 EncodingAESKey
const EncodingAESKey = config.wechat.encodingAESKey;
// 用户关注后发送的消息
const SubscribeMessage = config.wechat.subscribeMessage;

// ---------------- Authing 配置项 ------------------ //
// Authing 服务器地址，默认为 https://core.authing.cn，如果是私有化部署，需要修改此地址为你私有化部署服务的地址。
const HOST = config.authing.host;
// Authing 中对应身份源的唯一标志符
const Identifier = config.authing.socialConnectionIdentifier;
const UserpoolId = config.authing.userPoolId;

@Injectable()
export class AppService {
  public checkServer(query: CheckServerDto) {
    const arr = [Token, query.timestamp, query.nonce];
    arr.sort();
    const arrStr = arr.join('');
    const sign = createHash('sha1').update(arrStr, 'utf8').digest('hex');

    if (sign === query.signature) {
      return query.echostr;
    }
    return false;
  }

  // 解密event事件
  async formatEvent(event: any) {
    // 获取 xml 消息中的 encrypt 字段
    const wxmc = new WXMsgCrypto(Token, EncodingAESKey, AppID);
    const xmlSource = wxmc.decrypt(event.encrypt);
    const { message } = xmlSource;
    const result = await xml2js.parseStringPromise(message);
    const info: any = {};
    for (const key in result.xml) {
      info[key] = result.xml[key][0];
    }
    return info;
  }

  // 微信事件返回內容
  public async returnMsg(event: any) {
    const eventInfo = await this.formatEvent(event);
    if (eventInfo.Event === 'subscribe') {
      const timeStamp = Math.floor(new Date().getTime() / 1000);
      const message: wxTextMsgDto = {
        FromUserName: eventInfo.ToUserName,
        ToUserName: eventInfo.FromUserName,
        CreateTime: timeStamp,
        MsgType: 'text',
        Content: SubscribeMessage,
      };
      const builder = new xml2js.Builder({ rootName: 'xml' });
      const msgXml = builder.buildObject(message);

      const wxmc = new WXMsgCrypto(Token, EncodingAESKey, AppID);
      const encryptXml = wxmc.encrypt(msgXml);
      const nonce = Math.floor(Math.random() * 10000);
      const encryptMsg: wxEncryptMsgDto = {
        Encrypt: encryptXml,
        MsgSignature: wxmc.getSignature(timeStamp, nonce, encryptXml),
        TimeStamp: timeStamp,
        Nonce: nonce,
      };
      return builder.buildObject(encryptMsg);
    }
  }

  // 转发 authing
  public async repost(body: any) {
    const url = `${HOST}/connections/social/${Identifier}/${UserpoolId}/events`;
    const { status, data } = await Axios.post(url, body);
    console.log(
      '[%j] repost authing, body: %j, status: %j, data: %j',
      new Date(),
      body,
      status,
      data,
    );
  }
}
