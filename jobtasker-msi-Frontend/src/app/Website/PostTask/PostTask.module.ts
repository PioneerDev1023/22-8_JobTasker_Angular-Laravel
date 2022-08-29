import { GoogleMapApi } from './../../../environments/environment';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTaskComponent } from './PostTask.component';
import { FormsModule } from '@angular/forms';

import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: GoogleMapApi.apikey,
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PostTaskComponent
      }
    ])
  ],
  declarations: [PostTaskComponent]
})
export class PostTaskModule { }
