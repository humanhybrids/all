import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModelStateProvider } from '../model_lib/model_state_provider';
import { USER_MODEL_STATE } from '../models/user_model';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
    ],
    providers: [
        new ModelStateProvider(USER_MODEL_STATE)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
