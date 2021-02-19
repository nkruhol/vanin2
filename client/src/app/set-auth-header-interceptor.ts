import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./services/auth.service";

@Injectable()
export class SetAuthHeaderInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthService,
  ) {}

  intercept(
      req: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const user = this.authService.getUser();

    const token = user?.stsTokenManager?.accessToken;

    req = req.clone({
      setHeaders: {
          Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req).pipe(
      tap(
        (x) => x,
        (err) => {
          console.error(
            `Error performing request, status code = ${err.status}`
          );
        }
      )
    );
  }
}
