import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService, private token: TokenStorageService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['',Validators.required],
        });
    }



    onSubmit() {
        this.auth.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe({
            next: (data) => {
                if (data.status === 'success') {
                    const user = JSON.stringify(data.data)
                    this.token.saveUser(user)
                    this.router.navigate(['/enterTfa']);
                } else {
                    alert(data.message)
                }
            }
        })
    }
}
