import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../servies/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  fg: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private ts: ToastrService, public api : ApiService, public router: Router) {
    this.fg = this.fb.group({
      email : new UntypedFormControl(null, [Validators.required, Validators.email]),
      password : new UntypedFormControl(null, [Validators.required])
    });
  }

  get g() {
    return this.fg.controls;
  }

  ngOnInit(): void {
  }
  reset(data: any) : boolean {
    if (data.status === 'INVALID'){
      this.ts.warning('There is validation issue kindly review the form again!!');
      return false;
    }
    
    this.api.resetPassword(data.value).subscribe((resp: any) => {
      if (resp.status === false) {
          this.ts.error(resp.msg);
          return false;
      } else {
        this.ts.success(resp.msg);
        this.router.navigate(['/login']);
        return true;
      }
    })

    return false;
  }

}
