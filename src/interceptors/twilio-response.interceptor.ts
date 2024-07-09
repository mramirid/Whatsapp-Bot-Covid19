import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { twiml } from 'twilio';

@Injectable()
export default class TwilioResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const response = new twiml.MessagingResponse();
        response.message(value);
        return response.toString();
      }),
    );
  }
}
