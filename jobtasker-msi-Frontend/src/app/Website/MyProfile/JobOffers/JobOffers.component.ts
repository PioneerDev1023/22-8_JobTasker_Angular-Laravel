import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { stripeApi, urls } from 'src/environments/environment';
declare var Stripe : any;
@Component({
  selector: 'app-JobOffers',
  templateUrl: './JobOffers.component.html',
  styleUrls: ['./JobOffers.component.scss']
})
export class JobOffersComponent implements OnInit {

  modalRef?: BsModalRef;
  deliveryTime = new Date();

  stripe:any;
  card:any;
  TotalPayment:any;

  strikeCheckout:any = null;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  jobOffer : any;
  jobPostId : any;
  jobAssignId : any;
  offerId : any;

  // For Dispute
  filled_by_id : any;
  job_post_id : any;
  title : any;
  detail : any;
  reviews : any;
  makeReview= true;
  rating : any;
  total_rating : any;
  url : any;

  constructor(private ds : DataService,
              private router : ActivatedRoute,
              private ts : ToastrService,
              private ms : BsModalService) { 
      this.jobPostId = this.router.snapshot.paramMap.get('id');
      this.stripePaymentGateway();
      this.url = urls.BaseUrl +'/getprofileimage/';
  }
  
  counter(i: number) {
    return new Array(i);
}

  review(data: any) : boolean {
    data['job_id'] =  this.jobOffer.id;
    data['tasker_id'] = this.jobOffer.assign_to_id;
    this.ds.addReview(data).subscribe((resp:any) => {
      if (resp.status == true) {
        this.makeReview=false;
        window.location.reload();
        this.ts.success(resp.msg);
        return true; 
      } else {
        this.ts.error(resp.msg);
        return false;
      }
    });
    return true;
  }
  getReviews(data: any){
    this.ds.getReviews(data).subscribe((resp:any) => {
      if (resp.status == true) {
        this.reviews = [];
        this.rating = '';
        this.total_rating = '';
        this.reviews = resp.data;
        this.rating = resp.rating;
        this.total_rating = resp.total_rating;
        return true; 
      } else {
        this.ts.error(resp.msg);
        return false;
      }
    });
  }

  ngOnInit() {
    this.loadJobOffer();
  }

  loadJobOffer() : void {
    if (this.jobPostId) {
      this.ds.myJobOffer(this.jobPostId).subscribe((resp:any) => {
        if (resp.success) {
          this.jobOffer = resp.data; 
          this.reviews = resp.data.reviews;
        } else {
          this.ts.warning('There is samething wrong happen try again later');
        }
      });
    }
  }

  openModal(template: TemplateRef<any>,postId:any, taskerId:any) {
    this.jobAssignId = taskerId;
    this.offerId = postId;
    this.modalRef = this.ms.show(template, this.config);
  }

  assigneJob() : void {
    let postData = {
      id : this.jobPostId,
      job_offer_id : this.offerId,
      assign_to_id : this.jobAssignId,
      delivery_time : this.deliveryTime
    };

    this.ds.assignedJob(postData).subscribe((resp:any) => {
      if (resp.success) {
        this.jobOffer = resp.data;  
        this.ts.success('Job Assigned Successfully');
        this.modalRef?.hide();
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
  }

  completeJob() : void {
    let postData = {
      id : this.jobPostId,
      assign_to_id : this.jobAssignId,
      delivery_time : this.deliveryTime
    };

    this.ds.completeJob(postData).subscribe((resp:any) => {
      if (resp.success) {
        this.jobOffer = resp.data;  
        this.ts.success('Job Status updated');
        window.location.reload();
        this.modalRef?.hide();
      } else {
        this.ts.warning('There is samething wrong happen try again later');
      }
    })
  }

  dismiseModal() : void {
    this.modalRef?.hide();
  }

  // Strip 

  checkout(amount : number) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: stripeApi.publishable_key,
      locale: 'auto',
      token: function (stripeToken: any) {
        //console.log(stripeToken)
       
      }
    });
    
    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }

  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: stripeApi.publishable_key,
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }

  openDisputeModal(template: TemplateRef<any>,job_post_id:any) {
    //this.filled_by_id = filled_by_id;
    console.log(job_post_id);
    
    this.job_post_id = job_post_id;
    this.modalRef = this.ms.show(template, this.config);
  }

  createDispute() : void {
    if (this.title == '') {
      this.ts.warning('Please enter title');
      return;
    }
    if (this.detail == '') {
      this.ts.warning('Please enter detail');
      return;
    }

    const obj = {
      job_post_id : this.job_post_id,
      'title' : this.title,
      'detail' : this.detail,
    };

    this.ds.createDispute(obj).subscribe((resp : any) => {
      if (resp.success) {
        this.ts.success(resp.msg);
      } else {
        this.ts.warning('Try again later');
      }
      this.modalRef?.hide();
    })

  }

  // Stripe
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

  openModalPayment(template: TemplateRef<any>, amount: any) {
    this.TotalPayment = amount;
    this.modalRef = this.ms.show(template, this.config);
    this.setupStripe();
  }

  addPayment() : void {

    this.stripe.createToken(this.card).then((resp: any) => {
      if (resp.error) {
        this.ts.warning(resp.error.message);
      } else {
        // this.stripe.charges({
        //   amount: 999,
        //   currency: 'usd',
        //   description: 'Example charge',
        //   source: resp.token.id,
        //   statement_descriptor: 'Custom descriptor',
        // })

        let obj = {
          stripeToken : resp.token.id,
          amount : this.TotalPayment,
          description : this.jobOffer.what_do_you,
          job_posts_id : this.jobOffer.id
        }

        this.ds.payments(obj).subscribe((resp: any) => {
          if (resp.success) {
            this.ts.success(resp.msg);
          }
          this.loadJobOffer();
          this.modalRef?.hide();
        })

        //console.log(resp.token.id);
        
      }
    })

    // let obj = {
    //   type : 'card',
    //   card : this.card
    // }

    // this.stripe.createPaymentMethod(obj).then((result : any) => {
    //   if (result.error) {
    //     //var errorElement = document.getElementById('card-errors');
    //     this.ts.warning(result.error.message);
    //     //errorElement.textContent = result.error.message;
    //   } else {
    //     //this.showspinner=true
    //     //this.submitForm(result.token.id)
    //     //console.log(result.paymentMethod);

    //     const detail = result.paymentMethod;

    //     const customer = this.stripe.customers.create({
    //       payment_method: detail.id,
    //     });

    //     console.log('customer', customer);

    //     let obj = {
    //       last4 : detail.card.last4,
    //       exp_month  : detail.card.exp_month,
    //       exp_year  : detail.card.exp_year,
    //       brand  : detail.card.brand,
    //       alldata : JSON.stringify(detail),
    //       payment_id : detail.id
    //     }

    //     this.ds.addPaymentMethod(obj).subscribe((resp:any) => {
    //       if (resp.success) {
    //         this.paymentMethods = resp.data;
    //         this.ts.success('payment method added');
    //       } else {
    //         this.ts.warning('same error')
    //       }
    //       this.modalRef?.hide();
    //     })
        
    //   }
    // });
  }

}
