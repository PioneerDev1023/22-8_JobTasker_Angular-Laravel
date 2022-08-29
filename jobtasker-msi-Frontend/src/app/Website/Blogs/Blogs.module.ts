import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './Blogs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogsComponent
      }
    ])
  ],
  declarations: [BlogsComponent]
})
export class BlogsModule { }
