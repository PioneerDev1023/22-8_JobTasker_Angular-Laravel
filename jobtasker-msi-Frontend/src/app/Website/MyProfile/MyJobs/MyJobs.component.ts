import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-MyJobs',
  templateUrl: './MyJobs.component.html',
  styleUrls: ['./MyJobs.component.scss']
})
export class MyJobsComponent implements OnInit {

  jobList : any;

  constructor(private ds : DataService,
              private ts : ToastrService) { }

  ngOnInit() {
    this.ds.myJobList().subscribe((resp:any) => {
      if (resp.success) {
        this.jobList = resp.data;
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
  }

}
