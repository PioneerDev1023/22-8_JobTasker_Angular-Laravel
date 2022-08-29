import { stripeApi } from './../../../../environments/environment.prod';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
declare var Stripe : any;
@Component({
  selector: 'app-PaymentMethod',
  templateUrl: './PaymentMethod.component.html',
  styleUrls: ['./PaymentMethod.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  modalRef?: BsModalRef;
  stripe:any;
  card:any;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  paymentMethods : any = [];

  constructor(private ds : DataService,
    private ts : ToastrService,
    private ms : BsModalService) { 
      this.ds.getPyamentMethod().subscribe((resp: any) => {
        if (resp.success) {
          this.paymentMethods = resp.data
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
      type : 'card',
      card : this.card
    }

    this.stripe.createPaymentMethod(obj).then((result : any) => {
      if (result.error) {
        //var errorElement = document.getElementById('card-errors');
        this.ts.warning(result.error.message);
        //errorElement.textContent = result.error.message;
      } else {
        //this.showspinner=true
        //this.submitForm(result.token.id)
        //console.log(result.paymentMethod);

        const detail = result.paymentMethod;

        // const customer = this.stripe.customers.create({
        //   payment_method: detail.id,
        // });

        // console.log('customer', customer);
        

        

        let obj = {
          last4 : detail.card.last4,
          exp_month  : detail.card.exp_month,
          exp_year  : detail.card.exp_year,
          brand  : detail.card.brand,
          alldata : JSON.stringify(detail),
          payment_id : detail.id
        }

        this.ds.addPaymentMethod(obj).subscribe((resp:any) => {
          if (resp.success) {
            this.paymentMethods = resp.data;
            this.ts.success('payment method added');
          } else {
            this.ts.warning('same error')
          }
          this.modalRef?.hide();
        })
        
      }
    });
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

    this.card.mount('#card-element');

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
