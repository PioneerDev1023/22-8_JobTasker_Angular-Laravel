import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './AboutUs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutUsComponent
      }
    ])
  ],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
