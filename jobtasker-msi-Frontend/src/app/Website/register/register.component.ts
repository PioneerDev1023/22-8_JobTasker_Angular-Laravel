import { ApiService } from './../../servies/api.service';
import { googleLogin } from './../../../environments/environment';
import { FormHelper } from './../../shared/FormHelper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment, firebaseConfig } from 'src/environments/environment.prod';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';

// import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
// import geocoder = google.maps.Geocoder;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DataService]
})
export class RegisterComponent implements OnInit {

  auth2: any;

  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  fg: FormGroup;
  type: string;

  // Google Map Apis Function
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position);
        // var geocoder = new google.maps.Geocoder();
        // var latlngs = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // geocoder.geocode({location: latlngs}, function (results: any, status : any) {
        //   if (results[0]) {
        //     console.log(results[0].formatted_address);
            
        //   }
        // })
        // this.latitude = position.coords.latitude;
        // this.longitude = position.coords.longitude;
        // this.zoom = 12;
      });
    }
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private fh: FormHelper,
    private api: DataService,
    private apii: ApiService,
    public router: Router,
    private ts: ToastrService,
    private authService: SocialAuthService,) {
    this.type = String(this.route.snapshot.paramMap.get('type'));
    this.fg = this.fb.group({
      id: new FormControl(-1, []),
      email: new FormControl(null, [Validators.required, Validators.email]),
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required]),
      postcode: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      abn: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, []),
      agreeterm: new FormControl(null, [Validators.required]),
      user_type: this.type
    });
  }

  get g() {
    return this.fg.controls;
  }

  ngOnInit() {
    this.googleAuthSDK();
    this.setCurrentPosition();
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }

  public save(data: any): boolean {
    const messaging = getMessaging();

    this.fg.patchValue({ password_confirmation: data.value.password });
    if (data.status === 'INVALID') {
      this.ts.warning('There is validation issue kindly review the form again!!');

      return false;
    }

    getToken(messaging,
      { vapidKey: firebaseConfig.vapidKey }).then(
        (currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            let dataT = data.value;
            let temp = { ...dataT, fcm_token: currentToken }

            console.log(temp);
            

            let saveMethod = this.api.save(temp);
            if (data.value.id > 0) {
              saveMethod = this.api.update(temp);
            }
            saveMethod.subscribe((resp: any) => {
              if (resp.success === false) {
                this.ts.error(resp.message);
        
                return false;
              } else {
                console.log(resp);
                if (data.value.id > 0) {
                  // this.api.updateItem(resp.data.result, -1);
                  this.ts.success('Registered successfully!!');
                } else {
                  data.value.id = resp.data.id;
                  // this.api.addItem(resp.data.result);
                  this.ts.success('Registered successfully!!');
                }
        
                this.router.navigate(['/login']);
        
                return true;
              }
            });
        
          } else {
            console.log('No registration token available. Request permission to generate one.');

          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);

        });

   
    return false;
   

    
    return false;
  }

  callLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        let profile = googleAuthUser.getBasicProfile();
        //console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        //console.log();
        
        let fullName = profile.getName().split(' ');

        this.fg.controls['first_name'].setValue(fullName[0]);
        this.fg.controls['last_name'].setValue(fullName[1]);
        this.fg.controls['email'].setValue(profile.getEmail());

        //console.log(profile, profile.LX);




        // let obj = {
        //   email : profile.getEmail()
        // }

        // this.api.loginEmail(obj).subscribe((resp: any) => {
        //   if (resp.success === false) {
        //       this.ts.error(resp.errors.general);

        //       return false;
        //   } else {
        //     this.ts.success('login Successfully');
        //     if (localStorage.getItem('unsavepost')) {
        //       this.router.navigate(['/post-task']);
        //     } else {
        //       this.router.navigate(['/profile']);
        //     }
        //     return true;
        //   }
        // })

        /* Write Your Code Here */

      }, (error: any) => {
        console.log(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: googleLogin.client_id,
          cookiepolicy: 'single_host_origin',
          plugin_name: 'Web client 1',
          scope: 'profile email'
        });
        this.callLoginButton();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  // Facebook
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
