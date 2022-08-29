import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../servies/api.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-PostTask',
  templateUrl: './PostTask.component.html',
  styleUrls: ['./PostTask.component.scss'],
  providers: [DataService]
})
export class PostTaskComponent implements OnInit {

  step: number = 2;

  //form fields
  what_do_you = '';
  where_do_you = '';
  required_Date = '';
  required_time_range = 0;
  detail = '';
  budget = 0;

  public appearance = Appearance;
  public zoom: number = 10;
  public latitude: number = 0;
  public longitude: number = 0;
  public place_id: any = '';
  public plase_url: any = '';

  constructor(private api : ApiService,
              private ts : ToastrService,
              public router: Router,
              private ds : DataService) { }

  ngOnInit() {
    if (localStorage.getItem('unsavepost')) {
      //this.api.logOut();
      let user = JSON.parse(localStorage.getItem('unsavepost') ?? '');
      //console.log(user.what_do_you);
      this.what_do_you = user.what_do_you;
      this.where_do_you = user.where_do_you;
      this.required_Date = user.required_Date;
      this.required_time_range = user.required_time_range;
      this.detail = user.detail;
      this.budget = user.budget;
      this.step = 3;
    }
  }

  changeStep(newStep: number) : void {

    if (this.what_do_you.trim() == '' && this.where_do_you.trim() == '' && this.required_Date == '' && this.required_time_range == 0) {
      this.ts.warning('Please fill all the fields');
    } else {
      this.step = newStep;
    }
  }

  changeTypeRange(newTime: number) : void {
    this.required_time_range = newTime;
  }

  getQuotes() : void {

    if (this.detail.trim() == '' && this.budget < 1) {
      this.ts.warning('Please fill all the fields')
    }
    else {
      if (this.api.isAuthenticated()) {

        let pd = {
          what_do_you : this.what_do_you,
          where_do_you : this.where_do_you,
          required_Date : this.required_Date,
          required_time_range : this.required_time_range,
          detail : this.detail,
          budget : this.budget,
          lat : this.latitude,
          lng : this.longitude,
          place_id : this.place_id,
          place_url : this.plase_url
        };

        var myFormData = new FormData();
        myFormData.append('what_do_you', pd.what_do_you);
        myFormData.append('where_do_you', pd.where_do_you);
        myFormData.append('required_Date', pd.required_Date);
        myFormData.append('required_time_range', String(pd.required_time_range));
        myFormData.append('detail', pd.detail);
        myFormData.append('budget', String(pd.budget));
        myFormData.append('lat', String(pd.lat));
        myFormData.append('lng', String(pd.lng));
        myFormData.append('place_id', String(pd.place_id));
        myFormData.append('place_url', String(pd.place_url));
        myFormData.append('photo', this.filedata);

        this.ds.save(myFormData).subscribe((resp : any) => {
          if (resp.success) {
            this.ts.success('Posted success fully')
          } else {
            this.ts.error(resp.errors.general);
          }
        })

        if (localStorage.getItem('unsavepost')) {
          localStorage.removeItem('unsavepost');
        }
        this.router.navigate(['/profile/job-list']);
      } else {
        let postData = {
          what_do_you : this.what_do_you,
          where_do_you : this.where_do_you,
          required_Date : this.required_Date,
          required_time_range : this.required_time_range,
          detail : this.detail,
          budget : this.budget,
          lat : this.latitude,
          lng : this.longitude,
          place_id : this.place_id,
          place_url : this.plase_url,
        };

        localStorage.setItem('unsavepost', JSON.stringify(postData))

        this.ts.warning('first register');
        this.router.navigate(['/register','poster']);
      }
    }
  }

  // Google Map Apis Function
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    //console.log(result.url, result);
    this.place_id = result.place_id;
    this.plase_url = result.url;
  }

  onLocationSelected(location: Location) {
    //console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  onGermanAddressMapped($event: GermanAddress) {
    //console.log('onGermanAddressMapped', $event);
  }

  filedata:any;
  url = "";
  fileEvent(e:any){
    this.filedata = e.target.files[0];
      if(e.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event:any)=>{
          this.url = event.target.result;
        }
      }
  }
}
