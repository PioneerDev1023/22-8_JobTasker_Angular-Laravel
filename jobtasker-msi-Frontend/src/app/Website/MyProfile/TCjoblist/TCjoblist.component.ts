import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-TCjoblist',
  templateUrl: './TCjoblist.component.html',
  styleUrls: ['./TCjoblist.component.scss']
})
export class TCjoblistComponent implements OnInit {

  jobList : any;

  constructor(private ds : DataService,
              private ts : ToastrService) { }

  ngOnInit() {
    this.ds.myJobListCompleted().subscribe((resp:any) => {
      if (resp.success) {
        this.jobList = resp.data;
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
  }

}
