import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from '../services/auth.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  refreshingToken = false;
  refreshTokenSubject = new BehaviorSubject<any>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
