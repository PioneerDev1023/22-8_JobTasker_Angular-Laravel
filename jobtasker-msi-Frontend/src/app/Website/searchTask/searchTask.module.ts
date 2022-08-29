import { GoogleMapApi } from './../../../environments/environment';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTaskComponent } from './searchTask.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: GoogleMapApi.apikey,
      libraries: ['places']
    }),
    CommonModule,
    FormsModule,
    SharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: SearchTaskComponent
      }
    ])
  ],
  declarations: [SearchTaskComponent]
})
export class SearchTaskModule { }
