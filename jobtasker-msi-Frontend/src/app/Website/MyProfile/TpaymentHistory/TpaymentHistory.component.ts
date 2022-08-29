import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-TpaymentHistory',
  templateUrl: './TpaymentHistory.component.html',
  styleUrls: ['./TpaymentHistory.component.scss'],
})
export class TpaymentHistoryComponent implements OnInit {

  taskerPayments : any;
  isTasker: boolean = false;
  isPoster: boolean = false;
  isAuth: boolean = false;
  constructor(private ds : DataService,
    private ts : ToastrService) { }

    ngOnInit() {
      this.ds.myRecetiondetail().subscribe((resp:any) => {
        if (resp.success) {
          this.taskerPayments = resp.data;
        } else {
          this.ts.warning('There is samething wrong happen try again later');
        }
      })
    }

}
