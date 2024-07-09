import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import AppService from './app.service';
import TwilioResponseInterceptor from './interceptors/twilio-response.interceptor';

@Controller()
export default class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TwilioResponseInterceptor)
  incoming(
    @Body('ProfileName') senderName: string,
    @Body('Body') message: string,
  ) {
    switch (message) {
      case '/halo':
        return this.appService.replyHello(senderName);
      case '/nasional':
        return this.appService.replyNasional();
      case '/help':
        return this.appService.replyHelp();
      default:
        return this.appService.replyUnknown();
    }
  }

  @Post('status')
  @HttpCode(HttpStatus.NO_CONTENT)
  handleStatusCallback(
    @Body('MessageSid') messageSid: string,
    @Body('MessageStatus') messageStatus: 'sent' | 'delivered' | 'read',
    @Body('To') to: string,
  ) {
    this.logger.log({ messageSid, messageStatus, to });
  }
}
