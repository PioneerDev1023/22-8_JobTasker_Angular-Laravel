import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './TermsConditions.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TermsConditionsComponent
      }
    ])
  ],
  declarations: [TermsConditionsComponent]
})
export class TermsConditionsModule { }
