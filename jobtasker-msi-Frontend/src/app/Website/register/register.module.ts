import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapApi } from 'src/environments/environment';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: GoogleMapApi.apikey,
      libraries: ['places']
    }),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent
      }
    ])
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
