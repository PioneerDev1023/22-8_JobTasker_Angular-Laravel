import { Component, OnInit } from '@angular/core';
import { urls } from '../../../environments/environment';
import { DataService } from './data.service';

@Component({
  selector: 'app-Blogs',
  templateUrl: './Blogs.component.html',
  styleUrls: ['./Blogs.component.scss'],
  providers : [DataService]
})
export class BlogsComponent implements OnInit {

  picUrl = urls.BaseUrl + '/get-posts-image/';
  blogPost : any = [];

  constructor(private ds : DataService) { }

  ngOnInit() {
    this.ds.list().subscribe((resp: any) => {
      if (resp.success) {
        this.blogPost = resp.data
      }
    })
  }

}
