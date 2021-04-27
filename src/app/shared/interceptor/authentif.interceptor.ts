import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import {AuthentifService} from '../service/authentif/authentif.service'

@Injectable()
export class AuthentifInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authentifService: AuthentifService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('noauth')) return next.handle(request.clone());
    else {
      const cloneRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.authentifService.getToken()
        ),
      });
      return next.handle(cloneRequest).pipe(
        tap(
          (event) => {},
          (err) => {
            if (err.error.auth == false) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
    }
  }
}
