import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servies/api.service';
import { urls } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';


@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  show = false;

  url = '';
  profile : any;

  constructor(public api : ApiService) { 
    this.api.getProfile().subscribe((resp:any) => {
      
      if (resp.success) {
        if(resp.data.profile_image){
          this.url = urls.BaseUrl +'/get-profile-image/'+resp.data.profile_image;
        }
        this.profile = resp.data;
        console.log('Profile',this.profile);
        
        return true;
      } else {
        return false;
      }
    })
  }

  ngOnInit() {
  }

}
