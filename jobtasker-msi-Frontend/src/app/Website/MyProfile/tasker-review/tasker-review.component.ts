import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasker-review',
  templateUrl: './tasker-review.component.html',
  styleUrls: ['./tasker-review.component.scss']
})
export class TaskerReviewComponent implements OnInit {
  user:any  = JSON.parse(localStorage.getItem('user') ?? '');
  reviews:any = [];
  constructor(private ds : DataService,
              private ts : ToastrService) {
                this.ds.getTaskerReview(this.user.id).subscribe((resp:any) => {
                  if (resp.status == true) {
                    this.reviews = resp.data;
                    return true; 
                  } else {
                    this.ts.error(resp.msg);
                    return false;
                  }
                });
              }

  ngOnInit(): void {
  }
  counter(i: number) {
    return new Array(i);
  }

}
