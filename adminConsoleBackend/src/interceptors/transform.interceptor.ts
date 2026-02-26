import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log(context.switchToHttp().getRequest()?.url);
        // if (
        //   context
        //     .switchToHttp()
        //     .getRequest()
        //     ?.url.includes('/api/v1/planholder-report') || context
        //     .switchToHttp()
        //     .getRequest()
        //     ?.url.includes('/api/vr/project/info')
        // ) {
        //   // console.log(context.switchToHttp().getRequest()?.url);
        //   // let res = `<error>${false}</error><statusCode>${200}</statusCode><message>OK</message>`;
        //   return `<?xml version="1.0" encoding="UTF-8"?><data ${data.attributeName} = "${data.attributeValue}">${data.result}</data>`;
        // }
        return {
          error: false,
          statusCode: 200,
          message: data && data.message ? data.message : 'OK',
          data: data && data.message && delete data.message ? data[Object.keys(data)[0]] : data,
        };
      }),
      catchError((error) => {
        if (error instanceof HttpException) {
          // if (error) {
          if (
            error.message.includes(
              'duplicate key value violates unique constraint',
            )
          ) {
            throw new ConflictException('Unique key constraint violation');
          }

          // If the error is already an HttpException, return it as is
          throw new HttpException(
            {
              error: true,
              statusCode: error.getStatus(),
              message: error.getResponse()["message"] ? error.getResponse()["message"] : error.getResponse(),
              data: [],
            },
            error.getStatus(),
          );
          // throw error;
        } else {
          // Otherwise, create a new HttpException with a custom message
          if (
            error.message.includes(
              'duplicate key value violates unique constraint',
            )
          ) {
            throw new ConflictException('Unique key constraint violation');
          }
          // throw new HttpException(
          //   'Unexpected Error, PLease check error details for more info.' +
          //     error,
          //   403,
          // );

          // if (
          //   context
          //     .switchToHttp()
          //     .getRequest()
          //     ?.url.includes('/api/v1/planholder-report')
          // ) {
          //   // console.log(context.switchToHttp().getRequest()?.url);
          //   // let res = `<error>${false}</error><statusCode>${200}</statusCode><message>OK</message>`;
          //   return `<error>${true}</error><statusCode>${403}</statusCode><message>${error}</message>`;
          // }

          throw new HttpException(
            {
              error: true,
              statusCode: 400,
              message:
                // 'Unexpected Error, PLease check error details for more info.' +
                error.message,
              data: [],
            },
            400,
          );
        }
      }),
    );
  }
}
