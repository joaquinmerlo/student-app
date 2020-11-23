import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    const authHeader = !userToken ? '' : `Bearer ${userToken}`;
    const modifiedReq = req.clone({
      setHeaders: { Authorization: authHeader },
    });
    return next.handle(modifiedReq);
  }
}
