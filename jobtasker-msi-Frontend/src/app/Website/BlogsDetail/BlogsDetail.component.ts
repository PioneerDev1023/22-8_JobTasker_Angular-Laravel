import { ApiService } from './../../servies/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { urls } from '../../../environments/environment';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-BlogsDetail',
  templateUrl: './BlogsDetail.component.html',
  styleUrls: ['./BlogsDetail.component.scss'],
  providers: [DataService]
})
export class BlogsDetailComponent implements OnInit {

  picUrl = urls.BaseUrl + '/get-posts-image/';
  blogDetail : any;
  blogComments : any;
  id = 0;

  comment = '';

  constructor(private ds : DataService, 
              private route : ActivatedRoute,
              private ts : ToastrService,
              private api : ApiService) { 
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {

    this.ds.getBlog(this.id).subscribe((resp: any) => {
      if (resp.success) {
        this.blogDetail = resp.data
        this.blogComments = resp.data.comments
      }
    })
  }

  addComment() : void {
    if (!this.api.isAuthenticated()) {
      this.ts.warning('Please Login ');
      return;
    }
    if (this.comment == '') {
      this.ts.warning('Please enter the comment');
      return;
    }

    const obj = {
      post_id : this.id,
      detail : this.comment
    }

    this.ds.save(obj).subscribe((resp: any) => {
      if (resp.success) {
        this.blogComments = resp.data;
        this.comment = ''
      }
    })
  }

}
