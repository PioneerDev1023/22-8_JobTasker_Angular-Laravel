import { urls } from 'src/environments/environment';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';


@Component({
  selector: 'app-Portfolio',
  templateUrl: './Portfolio.component.html',
  styleUrls: ['./Portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  Description : any;
  Title : any;

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

  portfolioList : any;

  constructor(private ds : DataService,
    private ts : ToastrService,
    private ms : BsModalService) { 
      this.imageUrl = urls.BaseUrl + '/portfolio-image/';
      this.ds.getportfolio().subscribe((resp: any) => {
        if (resp.success) {
          // this.myBank = resp.data
          // this.Description = this.myBank.description
          // this.Title = this.myBank.title
          // this.isUpdate = true;
          this.portfolioList = resp.data;
        }
      })
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template, this.config);
  }

  addportfolio() : void {
    let obj = {
      title : this.Title,
      description : this.Description,
    };

    var myFormData = new FormData();
    myFormData.append('title', obj.title);
    myFormData.append('description', obj.description);
    myFormData.append('photo', this.filedata);

    this.ds.addportfolio(myFormData).subscribe((resp: any) => {
      if (resp.success) {
        this.modalRef?.hide();
        this.portfolioList = resp.data;
      } else {
        this.ts.warning('Try again later');
      }
    })

  }

  updatePortfolio() : void {
    let obj = {
      title : this.Title,
      description : this.Description,
    };

    this.ds.updateportfolio(obj).subscribe((resp: any) => {
      if (resp.success) {
        this.modalRef?.hide();
        this.ds.getportfolio().subscribe((resp: any) => {
          if (resp.success) {
            this.myBank = resp.data
            this.Description = this.myBank.description
            this.Title = this.myBank.title
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
