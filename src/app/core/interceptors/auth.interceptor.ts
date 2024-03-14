import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  if (req.urlWithParams.indexOf('addAuth=true', 0) > -1? true: false) {
    const authRequest = req.clone({
      setHeaders: {
        'Authorization': cookie.get('Authorization')
      }
    });

    return next(authRequest);
  }
  
  else {
    return next(req);
  }
};

