import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular'

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent
      }
    ])
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }
