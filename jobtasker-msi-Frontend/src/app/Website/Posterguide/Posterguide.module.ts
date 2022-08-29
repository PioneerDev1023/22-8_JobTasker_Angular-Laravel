import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterguideComponent } from './Posterguide.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PosterguideComponent
      }
    ])
  ],
  declarations: [PosterguideComponent]
})
export class PosterguideModule { }
