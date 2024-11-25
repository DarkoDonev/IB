import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['',Validators.required],
        });
    }



    onSubmit() {
        this.auth.register(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).pipe(finalize(() => {
            this.router.navigate(['/login']);

        })).subscribe()
    }
}
