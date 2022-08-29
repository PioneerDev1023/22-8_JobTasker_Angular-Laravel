import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeataskerComponent } from './beatasker.component';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: BeataskerComponent
      }
    ])
  ],
  declarations: [BeataskerComponent]
})
export class BeataskerModule { }
