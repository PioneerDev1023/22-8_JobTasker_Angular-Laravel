import { WebsiteComponent } from './Website.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./index/index.module')
        .then(m => m.IndexModule)
      },
      {
        path: 'be-a-tasker',
        loadChildren: () => import('./beatasker/beatasker.module')
        .then(m => m.BeataskerModule)
      },
      {
        path: 'register/:type',
        loadChildren: () => import('./register/register.module')
        .then(m => m.RegisterModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module')
        .then(m => m.LoginModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./forgot-password/forgot-password.module')
        .then(m => m.ForgotPasswordModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password.module')
        .then(m => m.ResetPasswordModule)
      },
      {
        path: 'post-task',
        loadChildren: () => import('./PostTask/PostTask.module')
        .then(m => m.PostTaskModule)
      },
      {
        path: 'search-job',
        loadChildren: () => import('./searchTask/searchTask.module')
        .then(m => m.SearchTaskModule)
      },
      {
        path: 'search-job/:title',
        loadChildren: () => import('./searchTask/searchTask.module')
        .then(m => m.SearchTaskModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./MyProfile/MyProfile.module')
        .then(m => m.MyProfileModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./AboutUs/AboutUs.module')
        .then(m => m.AboutUsModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./Contactus/Contactus.module')
        .then(m => m.ContactusModule)
      },
      {
        path: 'popular_categories',
        loadChildren: () => import('./Popular_Cats/Popular_Cats.module')
        .then(m => m.Popular_CatsModule)
      },
      {
        path: 'guidelines',
        loadChildren: () => import('./Cguidelines/Cguidelines.module')
        .then(m => m.CguidelinesModule)
      },
      {
        path: 'tasker-guidelines',
        loadChildren: () => import('./Taskerguide/Taskerguide.module')
        .then(m => m.TaskerguideModule)
      },
      {
        path: 'poster-guidelines',
        loadChildren: () => import('./Posterguide/Posterguide.module')
        .then(m => m.PosterguideModule)
      },
      // {
      //   path: 'portfolio',
      //   loadChildren: () => import('./Portfolio/Portfolio.module')
      //   .then(m => m.PortfolioModule)
      // },
      {
        path: 'privacy-policy',
        loadChildren: () => import('./PrivacyPolicy/PrivacyPolicy.module')
        .then(m => m.PrivacyPolicyModule)
      },
      {
        path: 'terms-conditions',
        loadChildren: () => import('./TermsConditions/TermsConditions.module')
        .then(m => m.TermsConditionsModule)
      },
      {
        path: 'faqs',
        loadChildren: () => import('./Faqs/Faqs.module')
        .then(m => m.FaqsModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('./Chat/Chat.module')
        .then(m => m.ChatModule)
      },
      {
        path: 'blogs',
        loadChildren: () => import('./Blogs/Blogs.module')
        .then(m => m.BlogsModule)
      },
      {
        path: 'blogsdetail/:id',
        loadChildren: () => import('./BlogsDetail/BlogsDetail.module')
        .then(m => m.BlogsDetailModule)
      }
    ]
  },
];

export const WebsiteRoutes = RouterModule.forChild(routes);
