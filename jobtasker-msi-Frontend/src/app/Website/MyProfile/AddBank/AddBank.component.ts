import { stripeApi } from './../../../../environments/environment.prod';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
declare var Stripe : any;
@Component({
  selector: 'app-AddBank',
  templateUrl: './AddBank.component.html',
  styleUrls: ['./AddBank.component.scss']
})
export class AddBankComponent implements OnInit {

  modalRef?: BsModalRef;
  stripe:any;
  card:any;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  AccountNo : any;
  AccountTitle : any;
  Bsb : any;

  isUpdate : boolean = false;

  paymentMethods : any = [];
  myBank : any;

  constructor(private ds : DataService,
    private ts : ToastrService,
    private ms : BsModalService) { 
      this.ds.getBank().subscribe((resp: any) => {
        if (resp.success) {
          if (resp.data){
            this.myBank = resp.data
            this.AccountNo = this.myBank.account_no
            this.AccountTitle = this.myBank.account_title
            this.Bsb = this.myBank.bsb
            this.isUpdate = true;
          }
          
        }
      })
  }

  ngOnInit() {
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template, this.config);
    this.setupStripe();
  }

  addPayment() : void {
    let obj = {
      account_title : this.AccountTitle,
      account_no : this.AccountNo,
      bsb : this.Bsb
    };

    this.ds.addBank(obj).subscribe((resp: any) => {
      if (resp.success) {
        this.myBank = resp.data
            this.AccountNo = this.myBank.account_no
            this.AccountTitle = this.myBank.account_title
            this.Bsb = this.myBank.bsb
            this.isUpdate = true;
        this.modalRef?.hide();
      } else {
        this.ts.warning('Try again later');
      }
    })

  }

  updatePayment() : void {
    let obj = {
      account_title : this.AccountTitle,
      account_no : this.AccountNo,
      bsb : this.Bsb
    };

    this.ds.updateBank(obj).subscribe((resp: any) => {
      if (resp.success) {
        this.modalRef?.hide();
        this.ds.getBank().subscribe((resp: any) => {
          if (resp.success) {
            this.myBank = resp.data
            this.AccountNo = this.myBank.account_no
            this.AccountTitle = this.myBank.account_title
            this.Bsb = this.myBank.bsb
            this.isUpdate = true;
          }
        })
      } else {
        this.ts.warning('Try again later');
      }
    })

  }

  setupStripe() {
    //this.stripe=Stripe('pk_test_51K4swPHMxcZ2hKOIVR5dUQkFwXlgV7qho4kovvWDHJkMWsfBQ2nAIWiBwullNDa4YotDKLT8ua9HodUNy1FzDOdo00hXVU7lG2');
    this.stripe=Stripe(stripeApi.publishable_key);
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    //var auBankAccountElement = elements.create('auBankAccount');

    //this.card.mount('#card-element');

    this.card.addEventListener('change', (event : any) => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {

        //displayError.textContent = event.error.message;
      } else {
        //displayError.textContent = '';
      }
    });
}

dismiseModal() : void {
  this.modalRef?.hide();
}

}
