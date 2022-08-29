import { firebaseConfig,urls } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../servies/api.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-MyProfile',
  templateUrl: './MyProfile.component.html',
  styleUrls: ['./MyProfile.component.scss'],
  providers: [DataService]
})
export class MyProfileComponent implements OnInit {

  profile : any;
  isTasker: boolean = false;
  isPoster: boolean = false;
  ImageUrl = urls.BaseUrl;
  url = '';
  isAuth: boolean = false;
  constructor(private ds : DataService,
              private api : ApiService,
              private ts : ToastrService) {
                firebase.initializeApp(firebaseConfig)
              }

  ngOnInit() {
    this.ds.get().subscribe((resp:any) => {
      if (resp.success) {
        this.profile = resp.data
        if(resp.data.profile_image){
          this.url = this.ImageUrl+'/get-profile-image/'+resp.data.profile_image;
        }
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
    if (localStorage.getItem('user_type') == 'tasker'){
      this.isTasker=true;
    }else if (localStorage.getItem('user_type') == 'poster'){
      this.isPoster=true;
    }
    if (this.api.isAuthenticated()) {
      this.isAuth = true;
    }
  }

}
