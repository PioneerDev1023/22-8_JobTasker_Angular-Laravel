import { ProfileCategoryComponent } from './ProfileCategory/ProfileCategory.component';
import { AddBankComponent } from './AddBank/AddBank.component';
import { PaymentMethodComponent } from './PaymentMethod/PaymentMethod.component';
import { DisputeChatComponent } from './DisputeChat/DisputeChat.component';
import { SkillsComponent } from './Skills/Skills.component';
import { MyTaskerJobComponent } from './MyTaskerJob/MyTaskerJob.component';
import { PpaymentHistoryComponent } from './PpaymentHistory/PpaymentHistory.component';
import { TpaymentHistoryComponent } from './TpaymentHistory/TpaymentHistory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JobOffersComponent } from './JobOffers/JobOffers.component';
import { MyJobsComponent } from './MyJobs/MyJobs.component';
import { BadgesComponent } from './Badges/Badges.component';
import { PCjoblistComponent } from './PCjoblist/PCjoblist.component';
import { TCjoblistComponent } from './TCjoblist/TCjoblist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './MyProfile.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { PortfolioComponent } from './Portfolio/Portfolio.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DisputeComponent } from './Dispute/Dispute.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { TaskerReviewComponent } from './tasker-review/tasker-review.component';
import { PosterReviewComponent } from './poster-review/poster-review.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: MyProfileComponent,
        children: [
          {
            path: '',
            component: DashboardComponent
          },
          {
            path: 'job-list',
            component: MyJobsComponent
          },
          {
            path: 'pcjob-list',
            component: PCjoblistComponent
          },
          {
            path: 'tcjob-list',
            component: TCjoblistComponent
          },
          {
            path: 'job-offers/:id',
            component: JobOffersComponent
          },
          {
            path: 'my-tasker-job',
            component: MyTaskerJobComponent
          },
          {
            path: 'payment-history',
            component: PpaymentHistoryComponent
          },
          {
            path: 'tpayment-history',
            component: TpaymentHistoryComponent
          },
          {
            path: 'poster-cjoblist',
            component: PpaymentHistoryComponent
          },
          {
            path: 'tasker-cjoblist',
            component: TpaymentHistoryComponent
          },
          {
            path: 'skills',
            component: SkillsComponent
          },
          {
            path: 'dispute',
            component: DisputeComponent
          },
          {
            path: 'dispute-chat',
            component: DisputeChatComponent
          },
          {
            path: 'dispute-chat/:roomname',
            component: DisputeChatComponent
          },
          {
            path: 'paymentmethod',
            component: PaymentMethodComponent
          },
          {
            path: 'update-profile',
            component: UpdateProfileComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent
          },
          {
            path: 'add-bank',
            component: AddBankComponent
          },
          {
            path: 'portfolio',
            component: PortfolioComponent
          },
          {
            path: 'badges',
            component: BadgesComponent
          },
          {
            path: 'profile-category',
            component: ProfileCategoryComponent
          },
          {
            path: 'tasker_reviews',
            component: TaskerReviewComponent
          },
          {
            path: 'poster_reviews',
            component: PosterReviewComponent
          },
        ]
      }
    ])
  ],
  declarations: [MyProfileComponent,
                 HomeComponent, 
                 DashboardComponent,
                 PortfolioComponent,
                 MyJobsComponent, 
                 PCjoblistComponent,
                 TCjoblistComponent,
                 JobOffersComponent, 
                 MyTaskerJobComponent, 
                 SkillsComponent,
                 DisputeComponent,
                 DisputeChatComponent,
                 PaymentMethodComponent,
                 ChangePasswordComponent,
                 UpdateProfileComponent,
                 PpaymentHistoryComponent,
                 TpaymentHistoryComponent,
                 AddBankComponent,
                 AddBankComponent,
                 BadgesComponent,
                 ProfileCategoryComponent,
                 TaskerReviewComponent,
                 PosterReviewComponent]
})
export class MyProfileModule { }
