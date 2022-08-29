import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormHelper } from './shared/FormHelper';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './servies/api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorsService } from './interceptors/api-interceptors.service';
import { HttpErrorsInterceptorService } from './interceptors/http-errors-interceptor.service';
import { LoaderService } from './servies/loader.service';
import { LoaderInterceptorService } from './interceptors/loader.interceptor.service';
import * as AOS from "aos";
import {Router} from "@angular/router";
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from 'src/environments/environment';
initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    FormHelper,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorsService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          // {
          //   id: GoogleLoginProvider.PROVIDER_ID,
          //   provider: new GoogleLoginProvider(
          //     '577681692975-n8onofb5cvi8edofvkv28b6hm6dadda3.apps.googleusercontent.com'
          //   )
          // },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('409007551297208')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    SocialAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  isAuth : boolean = false;

  isTasker: boolean = false;
  isPoster: boolean = false;
  constructor(public api : ApiService) {
    if (this.api.isAuthenticated()) {
      this.api.loginSource.next(true);
      this.isAuth = true;
    }
    if (localStorage.getItem('user_type') == 'tasker'){
      this.isTasker=true;
    }else if (localStorage.getItem('user_type') == 'poster'){
      this.isPoster=true;
    }
  }
}
