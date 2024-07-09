import type { CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { twiml } from 'twilio';

import TwilioResponseInterceptor from './twilio-response.interceptor';

describe('intercept()', () => {
  const message = 'Hello World';
  const messageXML = new twiml.MessagingResponse().message(message).toString();

  const contextMock = {} as any;
  const callHandlerMock: CallHandler<string> = { handle: () => of(message) };
  const twilioResponseInterceptor = new TwilioResponseInterceptor();

  it('should convert message to TwiML XML', (done) => {
    twilioResponseInterceptor
      .intercept(contextMock, callHandlerMock)
      .subscribe({
        next: (value) => {
          expect(value).toBe(messageXML);
        },
        error: done,
        complete: done,
      });
  });
});
