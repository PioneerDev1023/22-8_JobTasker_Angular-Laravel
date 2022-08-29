import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteComponent } from './Website.component';
import { WebsiteRoutes } from './Website.routing';

@NgModule({
  imports: [
    CommonModule,
    WebsiteRoutes
  ],
  declarations: [WebsiteComponent]
})
export class WebsiteModule implements OnInit  {
  isTasker: boolean = false;
  isPoster: boolean = false;
  ngOnInit() {
    if (localStorage.getItem('user_type') == 'tasker'){
      this.isTasker=true;
    }else if (localStorage.getItem('user_type') == 'poster'){
      this.isPoster=true;
    }
  }
}
