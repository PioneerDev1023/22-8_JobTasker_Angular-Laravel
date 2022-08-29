import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-MyTaskerJob',
  templateUrl: './MyTaskerJob.component.html',
  styleUrls: ['./MyTaskerJob.component.scss']
})
export class MyTaskerJobComponent implements OnInit {

  modalRef?: BsModalRef;
  myJobs : any;

  deletingIndex = -1;
  deletePop: any;

  filled_by_id : any;
  job_post_id : any;
  title : any;
  detail : any;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private ds : DataService,
              private ts : ToastrService,
              private ms : BsModalService) { }

  ngOnInit() {
    this.ds.myTaskerJob().subscribe((resp: any) => {
      if (resp.success) {
        this.myJobs = resp.data;
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
  }

  paymentRequest() : void {
    let obj = {
      id : this.deletingIndex
    };

    this.ds.paymentRequest(obj).subscribe((resp: any) => {
      if (resp.success) {
        this.myJobs = resp.data;
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
  }

  openModal(template: TemplateRef<any>,job_post_id:any) {
    //this.filled_by_id = filled_by_id;
    this.job_post_id = job_post_id;
    this.modalRef = this.ms.show(template, this.config);
  }
  counter(i: number) {
    return new Array(i);
  }

  createDispute() : void {
    if (this.title == '') {
      this.ts.warning('Please enter title');
      return;
    }
    if (this.detail == '') {
      this.ts.warning('Please enter detail');
      return;
    }

    const obj = {
      job_post_id : this.job_post_id,
      'title' : this.title,
      'detail' : this.detail,
    };

    this.ds.createDispute(obj).subscribe((resp : any) => {
      if (resp.success) {
        this.ts.success(resp.msg);
      } else {
        this.ts.warning('Try again later');
      }
      this.modalRef?.hide();
    })

  }
  review(data: any, poster_id:any, job_id:any) : boolean {
    data['job_id'] =  job_id;
    data['poster_id'] = poster_id;
    this.ds.addTaskerReview(data).subscribe((resp:any) => {
      if (resp.status == true) {
        window.location.reload();
        this.ts.success(resp.msg);
        return true; 
      } else {
        this.ts.error(resp.msg);
        return false;
      }
    });
    return true;
  }

  dismiseModal() : void {
    this.modalRef?.hide();
  }

}
