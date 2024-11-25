import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.tokenStorageService.getUser();

    if (user) {
      const token = this.tokenStorageService.getToken()
      if (token) {
        return true
      }
      if (route.url[0].path.includes("enterTfa")) {
        return true
      } else {
        this.router.navigate(['/enterTfa'])
        return false
      }
    }

    this.router.navigate(['/login'], {
      queryParams: {redirectURL: state.url},
    });
    return false;
  }
}
