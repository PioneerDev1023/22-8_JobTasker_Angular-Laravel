import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catwise_taskersComponent } from './Catwise_taskers.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Catwise_taskersComponent
      }
    ])
  ],
  declarations: [Catwise_taskersComponent]
})
export class Catwise_taskersModule { }
