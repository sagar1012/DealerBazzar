import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
    return next.handle(authReq)
      .pipe(catchError((err: any) => {
        console.log('this log isn\'t');
        if (err instanceof HttpErrorResponse) {
          console.log('Unauthorized');
        }

        return new Observable<HttpEvent<any>>();
      }));
  }
}
