import { ApiService } from './../../servies/api.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from './data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { urls } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchTask',
  templateUrl: './searchTask.component.html',
  styleUrls: ['./searchTask.component.scss'],
  providers: [DataService]
})
export class SearchTaskComponent implements OnInit {
  modalRef?:BsModalRef;

  jobList : any;
  card_show = false;
  ImageUrl = urls.BaseUrl;
  currentUserId : any;

  postTime : any;
  status: boolean = false;

  selectJobPostData : any;
  offerText : string = '';
  selectedPostId : number = 0;
  offerAmount : number = 0;
  offerNote : string = '';

  searchText : string = '';

  lat = -33.8482439;
  long = 150.9319747;
  zoom=10;
  markers : any
  url : any;

  reportNote = '';

  isPoster : boolean = false;

  imageulr : any;

  constructor(private ds: DataService,
              private api : ApiService,
              private ts: ToastrService,
              private ms: BsModalService,
              private route : ActivatedRoute) {
                this.isPoster = this.api.isPoster();
                this.imageulr = urls.BaseUrl + '/getjobpostimage/'

           


  }
  
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  openModalReport(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template, this.config);
  }

  dismiseModal() : void {
    this.modalRef?.hide();
  }

  addReport() : void {
    let obj = {
      job_post_id : this.selectedPostId,
      detail : this.reportNote
    };

    this.ds.addReport(obj).subscribe((resp:any) => {
      if (resp.success) {
        this.ts.success(resp.msg);
        this.modalRef?.hide();
      }
    })
  }

  ngOnInit() {
    this.ds.list().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });

        let cat = String(this.route.snapshot.paramMap.get('title'));
        this.searchText = cat;

      }
    });
    if (this.api.isAuthenticated()) {
      this.currentUserId = this.api.getRegUser().id;
    } 
  }

  search() : void {
    // if (this.searchText != '') {
    //   this.jobList = this.jobList.filter((i:any) => i.what_do_you == this.searchText);
    // }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template, Object.assign({}, { class: 'modal-lg modal-dialog-centered' }));
  }

  selectJobPost(id : any) : void {
    
    this.ds.getJobPost(id).subscribe((resp: any) => {
      if (resp.success) {
        this.selectedPostId = id;
        this.card_show = true;  
        this.selectJobPostData = resp.data;
        this.timeDifferent(resp.data.created_at, new Date());
      } else {
        this.ts.warning('There is something wrong, try again later');
      }
    })
  }

  timeDifferent(start_date: any, end_date:any) : any {
    var date1 = new Date(start_date); 
	  var date2 = new Date(end_date);    

    let Time : number = date2.getTime() - date1.getTime(); 
    let days : any = Math.floor(Time / 86400000);
    let hour : any = Math.floor((Time % 86400000) / 3600000);
    let mint : any = Math.round(((Time % 86400000) % 3600000) / 60000);
    
    this.postTime = ((days != 0) ? days + ' : ' : '') + ((hour != 0) ? hour + ' : ' : '') + ((mint != 0) ? mint : '');
    
  }

  closeJobPost() : void {
    this.card_show = false;
  }

  saveOffer() : void {
    if (this.offerAmount < 1) {
      this.ts.warning('Enter some budget to submit the offer');
    } else {
      let postData = {
        job_post_id : this.selectedPostId,
        amount : this.offerAmount,
        detail : this.offerNote
      };

      this.ds.saveOffer(postData).subscribe((resp: any) => {
        if (resp.success) {
          let selectedData = this.jobList.filter((i:any) => i.id == this.selectedPostId);
          selectedData[0].total_offer.push(resp.data);
          this.modalRef?.hide();
          this.offerAmount = 0;
          this.ts.success('The offer submited successfully');
        } else {
          this.ts.warning('There is samething wrong, please try again later');
        }
      });
    }
  }

  saveQuestion() : void {
    if (this.offerText.trim() == '') {
      this.ts.warning('Enter some text to submit the question');
    } else {
      let postData = {
        job_post_id : this.selectedPostId,
        detail : this.offerText
      };

      this.ds.save(postData).subscribe((resp: any) => {
        if (resp.success) {
          this.selectJobPostData.total_question.push(resp.data);
          this.offerText = '';
          this.ts.success('The qustion submited successfully');
        } else {
          this.ts.warning('There is samething wrong, please try again later');
        }
      });
    }
  }

  // Filters
  priceHightToLow() : void {
    this.ds.priceHighLow().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });
      }
    });
  }

  priceLowToHigh() : void {
    this.ds.priceLowHigh().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });
      }
    });
  }

  dueDateEarly() : void {
    this.ds.dueDateEarly().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });
      }
    });
  }

  dueDateLast() : void {
    this.ds.dueDateLast().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });
      }
    });
  }

  newTask() : void {
    this.ds.list().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });
      }
    });
  }

  oldTask() : void {
    this.ds.oldTask().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });
      }
    });
  }

  closeToMe() : void {
    this.ds.clostToMe().subscribe((resp: any) => {
      if (resp.success) {
        this.jobList = resp.data;
        this.url = urls.BaseUrl +'/getprofileimage/';
        this.markers = [];
        this.jobList.forEach((post: any) => {
          if (post.place_id != null) {          
            let mark = {
              lat : post.lat,
              lng : post.lng,
              label : post.where_do_you
            };
            this.markers.push(mark);
          }
        });
      }
    });
  }
  clickEvent(){
    this.status = !this.status;       
}
}
