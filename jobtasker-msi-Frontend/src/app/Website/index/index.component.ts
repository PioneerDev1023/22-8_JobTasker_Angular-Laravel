import { push } from 'firebase/database';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import Swiper, { Autoplay } from 'swiper';
import { urls } from '../../../environments/environment';
Swiper.use([Autoplay]);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DataService]
})
export class IndexComponent implements OnInit {

  picUrl = urls.BaseUrl + '/get-posts-image/';
  blogPost : any = [];

  taskerList : any = [];


  constructor(private ds : DataService) { }

  ngOnInit() {
    this.ds.list().subscribe((resp: any) => {
      if (resp.success) {
        this.blogPost = resp.data
      }
    })
    this.ds.getTaskersByCategory().subscribe((resp:any) => {
      if (resp.success) {
        let data = resp.data;
        //taskerList = [];
        data.forEach((item: any, i: number) => {
          if (item.profile.categories.length > 0) {
            this.taskerList.push(item)
          }
        });


        
        console.log(resp.data);
        
      }
    })
  }

}
