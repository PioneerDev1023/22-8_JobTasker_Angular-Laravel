import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../servies/api.service';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { urls } from './../../../../environments/environment';



@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  files : any;
  fg = this.fb.group({
    postcode : new UntypedFormControl(null, [Validators.required]),
    state : new UntypedFormControl(null, [Validators.required]),
    abn : new UntypedFormControl(null, [Validators.required]),
    first_name : new UntypedFormControl(null, [Validators.required]),
    last_name : new UntypedFormControl(null, [Validators.required]),
    phone_number : new UntypedFormControl(null, [Validators.required]),
    profile_image : new UntypedFormControl(null)
  });
  ngOnInit(): void {
  }
  url = "";
  constructor(private fb: UntypedFormBuilder, private ts: ToastrService, public ds : DataService, public router: Router, private api : ApiService,) {
    this.ds.get().subscribe((resp:any) => {
      if (resp.success) {
        this.fg = this.fb.group({
          postcode : new UntypedFormControl(resp.data.postcode, [Validators.required]),
          state : new UntypedFormControl(resp.data.state, [Validators.required]),
          abn : new UntypedFormControl(resp.data.abn, [Validators.required]),
          first_name : new UntypedFormControl(resp.data.first_name, [Validators.required]),
          last_name : new UntypedFormControl(resp.data.last_name, [Validators.required]),
          phone_number : new UntypedFormControl(resp.data.phone_number, [Validators.required]),
          profile_image : new UntypedFormControl(null)
        });
        if(resp.data.profile_image){
          this.url = urls.ImageUrl+'/'+resp.data.profile_image;
        }
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
    
  }
  filedata:any;
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

  get g() {
    return this.fg.controls;
  }

  updateProfile(data: any) : boolean {
    if (data.status === 'INVALID'){
      this.ts.warning('There is validation issue kindly review the form again!!');
      return false;
    }
    var myFormData = new FormData();
  
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    myFormData.append('profile_image', this.filedata);
    myFormData.append('user_id', user.id);
    myFormData.append('first_name', data.value.first_name);
    myFormData.append('last_name', data.value.last_name);
    myFormData.append('phone_number', data.value.phone_number);
    myFormData.append('postcode', data.value.postcode);
    myFormData.append('state', data.value.state);
    myFormData.append('abn', data.value.abn);
    this.api.updateProfile(myFormData).subscribe((resp: any) => {
      if (resp.status === false) {
          this.ts.error(resp.msg);
          return false;
      } else {
        window.location.reload();
        this.ts.success(resp.msg);
        return true
      }
    })
    

    return false;
  }

  

}
