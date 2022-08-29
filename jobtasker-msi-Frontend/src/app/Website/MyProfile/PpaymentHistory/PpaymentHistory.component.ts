import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-PpaymentHistory',
  templateUrl: './PpaymentHistory.component.html',
  styleUrls: ['./PpaymentHistory.component.scss'],
})
export class PpaymentHistoryComponent implements OnInit {

  myPayments : any;
  isTasker: boolean = false;
  isPoster: boolean = false;
  isAuth: boolean = false;
  constructor(private ds : DataService,
    private ts : ToastrService) { }

    ngOnInit() {
      this.ds.myTransectiondetail().subscribe((resp:any) => {
        if (resp.success) {
          this.myPayments = resp.data;
        } else {
          this.ts.warning('There is samething wrong happen try again later');
        }
      })
    }

}
