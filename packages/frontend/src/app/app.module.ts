import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FileUploadModule} from 'ng2-file-upload';
import {MatMomentDateModule,} from '@angular/material-moment-adapter';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppComponent} from "./app.component";
import {ComponentsModule} from "./components/components.module";

@NgModule({
    declarations: [
        AppComponent
    ]
    ,
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        FileUploadModule,
        MatMomentDateModule,
        ComponentsModule
    ],
    providers: [
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
    schemas: [],
})
export class AppModule {
}
