import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsDetailComponent } from './BlogsDetail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogsDetailComponent
      }
    ])
  ],
  declarations: [BlogsDetailComponent]
})
export class BlogsDetailModule { }
