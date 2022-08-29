import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CguidelinesComponent } from './Cguidelines.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CguidelinesComponent
      }
    ])
  ],
  declarations: [CguidelinesComponent]
})
export class CguidelinesModule { }
