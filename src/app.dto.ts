export class CheckServerDto {
  signature: string;
  timestamp: string;
  nonce: string;
  echostr: string;
}

export interface wxTextMsgDto {
  FromUserName: string,
  ToUserName: string,
  CreateTime: number,
  MsgType: 'text',
  Content: string,
}

export interface wxEncryptMsgDto {
  Encrypt: string,
  MsgSignature: string,
  TimeStamp: number,
  Nonce: number,
}