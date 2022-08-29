import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../servies/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  fg: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private ts: ToastrService, public api : ApiService, public router: Router) {
    this.fg = this.fb.group({
      old_password : new UntypedFormControl(null, [Validators.required]),
      change_password : new UntypedFormControl(null, [Validators.required]),
    });
  }
  get g() {
    return this.fg.controls;
  }

  ngOnInit(): void {
  }
  changePassword(data: any) : boolean {
    if (data.status === 'INVALID'){
      this.ts.warning('There is validation issue kindly review the form again!!');
      return false;
    }
    
    this.api.changePassword(data.value).subscribe((resp: any) => {
      if (resp.status === false) {
          this.ts.error(resp.msg);
          return false;
      } else {
        this.ts.success(resp.msg);
        return true;
      }
    })

    return false;
  }

}
