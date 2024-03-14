import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService, private storage: LocalStorageService) { 
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void {
    this.$user.next(user);

    this.storage.store('user-email', user.email);
    this.storage.store('user-roles', user.roles.join(','));

    //localStorage.setItem('user-email', user.email);
    //localStorage.setItem('user-roles', user.roles.join(','));
  }

  getUser(): User | undefined {
    const email = this.storage.retrieve('user-email'); //localStorage.getItem('user-email');
    const roles = this.storage.retrieve('user-roles'); //localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles?.split(',')
      }

      return user;
    }

    return undefined;
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  logout(): void {
    this.storage.clear();
    //localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
