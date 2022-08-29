import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskerguideComponent } from './Taskerguide.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskerguideComponent
      }
    ])
  ],
  declarations: [TaskerguideComponent]
})
export class TaskerguideModule { }
