import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  
  let token = cookie.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
    } 

    else {
      if (user.roles.includes('Writer')) {
        return true;
      }

      else {
        alert('Unauthorized');
        return false;
      }
    }
  }

  else {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
  }
};
