import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {TokenStorageService} from "./services/token-storage.service";
import {AuthService} from "./services/auth.service";


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },

  display: {
    dateInput: 'DD/MM/YYYY',

    monthYearLabel: 'MMMM YYYY',

    dateA11yLabel: 'LL',

    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [

    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }

  ]
})
export class AppComponent implements OnInit {
     isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {

  }

  logout(): void {

  }
}
