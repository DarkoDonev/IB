import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FileUploadModule} from "ng2-file-upload";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {EnterTfaComponent} from "./enterTfa/enterTfa.component";
import {HomeComponent} from "./home/home.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        EnterTfaComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        FileUploadModule,
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        EnterTfaComponent,
        HomeComponent
    ],
    bootstrap: [],
})
export class ComponentsModule {
}
