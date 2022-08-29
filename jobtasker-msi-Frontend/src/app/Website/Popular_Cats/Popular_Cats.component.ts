import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-Popular_Cats',
  templateUrl: './Popular_Cats.component.html',
  styleUrls: ['./Popular_Cats.component.scss'],
  providers : [DataService]
})
export class Popular_CatsComponent implements OnInit {

  taskerList : any = [];

  constructor(private ds : DataService) { }

  ngOnInit() {
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
