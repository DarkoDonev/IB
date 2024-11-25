import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:3500/api/auth'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  register(email: string, password: string) {
    return this.http.post(AUTH_API + '/register', {
      email: email,
      password: password
    })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API+ '/login', {
      email: email,
      password: password
    },
      httpOptions)
  }

  authTFA(email: string, tfa: string) {
    return this.http.post(AUTH_API+ '/authTfa', {
          email: email,
          tfa: tfa
        },
        httpOptions)
  }
}
