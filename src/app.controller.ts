import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CheckServerDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/wechat/events')
  checkServer(@Query() query: CheckServerDto) {
    return this.appService.checkServer(query);
  }

  @Post('/wechat/events')
  @HttpCode(200)
  async wechatEvents(@Body() body: any) {
    const { xml } = body;
    const event = {};
    for (const key in xml) {
      event[key] = xml[key][0];
    }

    // 事件返回信息
    const eventMsg = await this.appService.returnMsg(event);

    // 转发authing
    this.appService.repost(body);
    return eventMsg || 'success';
  }
}
