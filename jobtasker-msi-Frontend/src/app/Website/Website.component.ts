import {  Router } from '@angular/router';
import { ApiService } from './../servies/api.service';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { LoaderService } from '../servies/loader.service';
import * as firebase from 'firebase/app';
import { firebaseConfig,urls,stripeApi } from '../../environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-Website',
  templateUrl: './Website.component.html',
  styleUrls: ['./Website.component.scss']
})
export class WebsiteComponent implements OnInit {
  isLoading: boolean = false;


  isAuth : boolean = false;
  status: boolean = false;

  user : any;
  url = '';
  profile_name = '';
  site_logo_url = '';
  setting_data:any;

  isTasker: boolean = false;
  isPoster: boolean = false;
  constructor(private loader: LoaderService, public api : ApiService, private router : Router, public title : Title) {
    //firebase.initializeApp(firebaseConfig);
    this.loader.isLoading.asObservable().subscribe((state) => {
        //console.log(state);

        setTimeout((_ : any) => this.isLoading = state, 0)
    })
    if (this.api.isAuthenticated()) { 
      this.api.getProfile().subscribe((resp:any) => {
        if (resp.success) {
          if(resp.data.profile_image){
            this.url = urls.BaseUrl +'/get-profile-image/'+resp.data.profile_image;
          }
          this.profile_name = resp.data.first_name + ' ' + resp.data.last_name;
          return true;
        } else {
          return false;
        }
      })
    }
    this.api.getSettings().subscribe((resp:any) => {
      console.log(resp);
      if (resp.status === true) {
        if(resp.data.site_logo){
          this.site_logo_url = urls.ImageUrl+'/'+resp.data.site_logo;
        }
        this.setting_data = resp.data;
        stripeApi.publishable_key = resp.data.stripe_publishkey;
        stripeApi.secret_key = resp.data.stripe_secretkey;
        this.title.setTitle(this.setting_data.site_title);
        return true;
      } else {
        return false;
      }
    })

    if (this.api.isAuthenticated()) {
      this.isAuth = true;
      this.user = this.api.getRegUser();
      this.api.loginSource.next(true);
    }

    this.api.loginSource.subscribe((resp: any) => {
      this.isAuth = resp;
    })

  }

  ngOnInit() {
    AOS.init();
    if (localStorage.getItem('user_type') == 'tasker'){
      this.isTasker=true;
    }else if (localStorage.getItem('user_type') == 'poster'){
      this.isPoster=true;
    }

    if (this.api.isAuthenticated()) {
      this.isAuth = true;
    }

  }

  logout() : void {
    if (this.api.logOut()) {
      this.router.navigate(['/']);
    }
  }
  clickEvent(){
      this.status = !this.status;       
  }
}
