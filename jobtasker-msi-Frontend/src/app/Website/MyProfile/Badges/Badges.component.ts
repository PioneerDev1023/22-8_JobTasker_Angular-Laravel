import { urls } from 'src/environments/environment';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';


@Component({
  selector: 'app-Badges',
  templateUrl: './Badges.component.html',
  styleUrls: ['./Badges.component.scss']
})
export class BadgesComponent implements OnInit {

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  Lic_badge : any;
  First_name : any;
  Last_name : any;
  Jt_email  : any;
  Lic_number: any;
  Lic_exp : any;
  Lic_rest: any;

  isUpdate : boolean = false;

  myBank : any;

  filedata:any;
  url = "";
  imageUrl = "";
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

  BadgeList : any;

  constructor(private ds : DataService,
    private ts : ToastrService,
    private ms : BsModalService) { 
      this.imageUrl = urls.BaseUrl + '/badge-image/';
      this.ds.getbadges().subscribe((resp: any) => {
        if (resp.success) {
          // this.myBank = resp.data
          // this.Description = this.myBank.description
          // this.Title = this.myBank.title
          // this.isUpdate = true;
          this.BadgeList = resp.data;
        }
      })
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template, this.config);
  }

  addbadges() : void {
    let obj = {
      lic_badge : this.Lic_badge,
      first_name  : this.First_name,
      last_name  : this.Last_name,
      jt_email  : this.Jt_email,
      lic_number : this.Lic_number,
      lic_exp  : this.Lic_exp,
      lic_rest : this.Lic_rest,
    };

    var myFormData = new FormData();
    myFormData.append('lic_badge', obj.lic_badge);
    myFormData.append('first_name', obj.first_name);
    myFormData.append('last_name', obj.last_name);
    myFormData.append('jt_email', obj.jt_email);
    myFormData.append('lic_number', obj.lic_number);
    myFormData.append('lic_exp', obj.lic_exp);
    myFormData.append('lic_rest', obj.lic_rest);
    myFormData.append('photo', this.filedata);

    this.ds.addbadges(myFormData).subscribe((resp: any) => {
      if (resp.success) {
        this.modalRef?.hide();
        this.BadgeList = resp.data;
      } else {
        this.ts.warning('Try again later');
      }
    })

  }

  updateBadges() : void {
    let obj = {
      lic_badge : this.Lic_badge,
      first_name  : this.First_name,
      last_name  : this.Last_name,
      jt_email  : this.Jt_email,
      lic_number : this.Lic_number,
      lic_exp  : this.Lic_exp,
      lic_rest : this.Lic_rest,
    };

    this.ds.updatebadges(obj).subscribe((resp: any) => {
      if (resp.success) {
        this.modalRef?.hide();
        this.ds.getbadges().subscribe((resp: any) => {
          if (resp.success) {
            this.myBank = resp.data
            this.Lic_badge = this.myBank.lic_badge
            this.First_name = this.myBank.first_name
            this.Last_name = this.myBank.last_name
            this.Jt_email = this.myBank.jt_email
            this.Lic_number = this.myBank.lic_number
            this.Lic_exp = this.myBank.lic_exp
            this.Lic_rest = this.myBank.lic_rest
            this.isUpdate = true;
          }
        })
      } else {
        this.ts.warning('Try again later');
      }
    })

  }

  dismiseModal() : void {
    this.modalRef?.hide();
  }

}
