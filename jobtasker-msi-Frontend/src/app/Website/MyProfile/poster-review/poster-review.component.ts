import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poster-review',
  templateUrl: './poster-review.component.html',
  styleUrls: ['./poster-review.component.scss']
})
export class PosterReviewComponent implements OnInit {
  user:any  = JSON.parse(localStorage.getItem('user') ?? '');
  reviews:any = [];
  constructor(private ds : DataService,
              private ts : ToastrService) {
                this.ds.getPosterReview(this.user.id).subscribe((resp:any) => {
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
