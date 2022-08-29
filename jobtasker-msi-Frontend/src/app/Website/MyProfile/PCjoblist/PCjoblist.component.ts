import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-PCjoblist',
  templateUrl: './PCjoblist.component.html',
  styleUrls: ['./PCjoblist.component.scss']
})
export class PCjoblistComponent implements OnInit {

  jobList : any;

  constructor(private ds : DataService,
              private ts : ToastrService) { }

  ngOnInit() {
    this.ds.myJobListCompletedPoster().subscribe((resp:any) => {
      if (resp.success) {
        this.jobList = resp.data;
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
  }

}
