import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user'


@Injectable({
  providedIn: "root"
})
export class TokenStorageService {
  constructor(private http: HttpClient, private router: Router) {
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, user);
  }

  public getToken() {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    } else {
      return undefined;
    }
  }

  public getUser() {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    } else {
      return {};
    }
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }
}
