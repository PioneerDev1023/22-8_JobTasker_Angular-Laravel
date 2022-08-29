import { googleLogin } from './../../../environments/environment';
import { ApiService } from './../../servies/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../shared/FormHelper';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  auth2: any;

  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  fg: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private fh: FormHelper,
    public api: ApiService,
    public router: Router,
    private authService: SocialAuthService,
    private ts: ToastrService
  ) {
    this.fg = this.fb.group({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required]),
    });
  }

  get g() {
    return this.fg.controls;
  }

  ngOnInit() {
    this.googleAuthSDK();
    this.authService.initState.subscribe((isReady) => {
      if (isReady) {
        // this.signInWithFB();
      }
    }
    );
    this.authService.authState.subscribe((user) => {
      // this.user = user;
      // this.loggedIn = (user != null);
    });
  }

  login(data: any): boolean {
    if (data.status === 'INVALID') {
      this.ts.warning(
        'There is validation issue kindly review the form again!!'
      );

      return false;
    }

    this.api.login(data.value).subscribe((resp: any) => {
      if (resp.success === false) {
        this.ts.error(resp.errors.general);

        return false;
      } else {
        this.ts.success('login Successfully');
        localStorage.setItem('user_type', resp.data.user_type);
        if (localStorage.getItem('unsavepost')) {
          if (resp.data.user_type == 'poster') {
            this.router.navigate(['/post-task']);  
          } else {
            this.router.navigate(['/profile']).then(() => {
              window.location.reload();
            });
          }
          
        } else {
          this.router.navigate(['/profile']).then(() => {
            window.location.reload();
          });
        }
        return true;
      }
    });

    return false;
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  callLoginButton() {
    this.auth2.attachClickHandler(
      this.loginElement.nativeElement,
      {},
      (googleAuthUser: any) => {
        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        let obj = {
          email: profile.getEmail(),
        };

        this.api.loginEmail(obj).subscribe((resp: any) => {
          if (resp.success === false) {
            this.ts.error(resp.errors.general);

            return false;
          } else {
            this.ts.success('login Successfully');
            if (localStorage.getItem('unsavepost')) {
              this.router.navigate(['/post-task']);
            } else {
              this.router.navigate(['/profile']).then(() => {
                window.location.reload();
              });
            }
            return true;
          }
        });

        /* Write Your Code Here */
      },
      (error: any) => {
        console.log(JSON.stringify(error, undefined, 2));
      }
    );
  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: googleLogin.client_id,
          cookiepolicy: 'single_host_origin',
          plugin_name: 'Web client 1',
          scope: 'profile email',
        });
        this.callLoginButton();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement('script');
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  }
}
