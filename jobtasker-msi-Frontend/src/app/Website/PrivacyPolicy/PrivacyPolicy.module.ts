import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './PrivacyPolicy.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivacyPolicyComponent
      }
    ])
  ],
  declarations: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule { }
