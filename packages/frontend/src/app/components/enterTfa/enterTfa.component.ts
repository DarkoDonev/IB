import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'enter-tfa',
  templateUrl: './enterTfa.component.html',
  styleUrls: ['./enterTfa.component.scss'],
  standalone: false
})
export class EnterTfaComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private token: TokenStorageService, private router: Router) {
    this.loginForm = this.fb.group({
      tfa: ['', [Validators.required]],
    });
  }


  onSubmit() {
    const user = JSON.parse(<string>window.localStorage.getItem('user'));
    if (!user) {
      this.token.logout();
    }
    this.auth.authTFA(user.email, this.loginForm.get('tfa')?.value).subscribe({
      next: (data: any) => {
        if (data.status === 'success') {
          this.token.saveToken(data.data.token)
          this.router.navigate(['/home']);
        } else {
          alert(data.message)
        }
      }
    })
  }
}
