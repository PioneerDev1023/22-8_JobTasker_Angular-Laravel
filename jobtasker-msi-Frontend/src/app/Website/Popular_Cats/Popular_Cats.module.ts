import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Popular_CatsComponent } from './Popular_Cats.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Popular_CatsComponent
      }
    ])
  ],
  declarations: [Popular_CatsComponent]
})
export class Popular_CatsModule { }
