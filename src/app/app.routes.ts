import { Routes } from '@angular/router';

import { CitiesBlogsComponent } from './pages/blogs/cities-blogs/cities-blogs.component';
import { AboutUsComponent } from './core/components/about-us/about-us.component';
import { ContactUsComponent } from './core/components/contact-us/contact-us.component';
import { MeetTheTeamComponent } from './core/components/meet-the-team/meet-the-team.component';
import { OurStoryComponent } from './core/components/our-story/our-story.component';
import { PrivacyPolicyComponent } from './core/components/privacy-policy/privacy-policy.component';
import { RedirectUrlComponent } from './core/components/redirect-url/redirect-url.component';
import { ThanksComponent } from './core/components/thanks/thanks.component';
import { UsefulLinksComponent } from './core/components/useful-links/useful-links.component';
import { MultiCountryPackagesComponent } from './pages/travel-package/components/multi-country-packages/multi-country-packages.component';
import { AskExpertsComponent } from './shared/components/ask-experts/ask-experts.component';
import { PageSeoResolver } from './core/guards/page-seo.resolver';
export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home-routes').then(c => c.default) },
  {
    path: 'all-destinations',
    loadChildren: () => import('./pages/destinations/destination-routes').then(c => c.default)
  },
  {
    path: 'all-destinations/:slug/category/:cat',
    loadChildren: () =>
      import('./pages/pages/pages-routes').then(
        (c) => c.default
      )

  },
  {
    path: 'all-packages',
    loadChildren: () =>
      import('./pages/travel-package/travel-package-routes').then(
        (c) => c.default
      ),

  },
  {
    path: 'myths-facts',
    loadChildren: () =>
      import('./pages/faqs/faqs-routes').then(
        (c) => c.default
      ),

  },
  {
    path: 'travel-guides',
    loadChildren: () =>
      import('./pages/travel-guide/travel-guide-routes').then(
        (c) => c.default
      ),
  },
  {
    path: 'all-destinations/:slug/blogs',
    loadChildren: () =>
      import('./pages/blogs/blogs-routes').then(
        (c) => c.default
      ),

  },


  {
    path: 'all-blogs', 
    component: CitiesBlogsComponent,
    resolve: {
      seoData: PageSeoResolver
    }
  },

  {
    path: 'about-us', 
    component: AboutUsComponent,
    resolve: {
      seoData: PageSeoResolver
    }
  },
  {
    path: 'useful-links/:slug', component: UsefulLinksComponent
  },

  {
    path: 'multi-country-tours',
    component: MultiCountryPackagesComponent
  },

  {
    path: 'ask-experts', component: AskExpertsComponent
  },
  {
    path: 'contact-us', component: ContactUsComponent
  },
  {
    path: 'thanks', component: ThanksComponent
  },


  {
    path: 'meet-the-team/development-team', component: MeetTheTeamComponent
  },
  {
    path: 'our-story', component: OurStoryComponent
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent
  },

//       {
//         path: item == '' ? 'all-destinations/:slug' : item + '/' + 'all-destinations/:slug',
//         loadChildren: () =>
//           import('./pages/hotels/hotels-routes').then(
//             (c) => c.default
//           ),

//       },
  // { path: '404', component: RedirectUrlComponent },

  // {
  //   path: '**',
  //   redirectTo: '/404',
  // }
]
// export function createRoutes(): Routes {
//   const locales = ['', 'fr', 'de', 'es', 'ru']

//   let routes: Routes = [
//     { path: '', redirectTo: locales[0], pathMatch: 'full' },
//     {
//       path: 'all-destinations',
//       loadChildren: () => import('./pages/destinations/destination-routes').then(c => c.default)
//     },
//     {
//       path: 'all-destinations/:slug/category/:cat',
//       loadChildren: () =>
//         import('./pages/pages/pages-routes').then(
//           (c) => c.default
//         ),

//     },
//     {
//       path: 'all-packages',
//       loadChildren: () =>
//         import('./pages/travel-package/travel-package-routes').then(
//           (c) => c.default
//         ),

//     },
//     {
//       path: 'travel-guides',
//       loadChildren: () =>
//         import('./pages/travel-guide/travel-guide-routes').then(
//           (c) => c.default
//         ),
//     },
//     {
//       path: 'all-destinations/:slug/blogs',
//       loadChildren: () =>
//         import('./pages/blogs/blogs-routes').then(
//           (c) => c.default
//         ),

//     },

//     {
//       path: 'all-blogs', component: CitiesBlogsComponent
//     },

//     {
//       path: 'about-us', component: AboutUsComponent
//     },
//     {
//       path: 'useful-links/:slug', component: UsefulLinksComponent
//     },

//     {
//       path: 'multi-country-tours',
//       component: MultiCountryPackagesComponent
//     },

//     {
//       path: 'ask-experts', component: AskExpertsComponent
//     },
//     {
//       path: 'contact-us', component: ContactUsComponent
//     },
//     {
//       path: 'thanks', component: ThanksComponent
//     },


//     {
//       path: 'meet-the-team/development-team', component: MeetTheTeamComponent
//     },
//     {
//       path: 'our-story', component: OurStoryComponent
//     },
//     {
//       path: 'privacy-policy', component: PrivacyPolicyComponent
//     },

//     { path: '404', component: RedirectUrlComponent },

//     {
//       path: '**',
//       redirectTo: '/404',
//     },
//   ]
//   locales.forEach(item => {
//     routes.push(
//       {
//         path: item, loadChildren: () => import('./pages/home/home-routes').then(c => c.default),
//         resolve: {
//           seoData: SeoResolver
//         },


//       },
//       {
//         path: item == '' ? 'all-destinations' : item + '/' + 'all-destinations',
//         loadChildren: () => import('./pages/destinations/destination-routes').then(c => c.default)
//       },
//       {
//         path: item == '' ? 'all-destinations/:slug/category/:cat' : item + '/' + 'all-destinations/:slug/category/:cat',
//         loadChildren: () =>
//           import('./pages/pages/pages-routes').then(
//             (c) => c.default
//           ),

//       },
//       {
//         path: item == '' ? 'all-packages': item + '/' + 'all-packages',
//         loadChildren: () =>
//           import('./pages/travel-package/travel-package-routes').then(
//             (c) => c.default
//           ),

//       },
//       {
//         path: item == '' ? 'travel-guides' : item + '/' + 'travel-guides',
//         loadChildren: () =>
//           import('./pages/travel-guide/travel-guide-routes').then(
//             (c) => c.default
//           ),

//       },
//       {
//         path: item == '' ? 'all-destinations/:slug' : item + '/' + 'all-destinations/:slug',
//         loadChildren: () =>
//           import('./pages/hotels/hotels-routes').then(
//             (c) => c.default
//           ),

//       },
//       {
//         path: item == '' ? 'myths-facts' : item + '/' + 'myths-facts',
//         loadChildren: () =>
//           import('./pages/faqs/faqs-routes').then(
//             (c) => c.default
//           ),

//       },


//       {
//         path: item == '' ? 'all-destinations/:slug/travel-excursions' : item + '/' + 'all-destinations/:slug/travel-excursions',
//         loadChildren: () =>
//           import('./pages/travel-excursion/travel-excursion-routes').then(
//             (c) => c.default
//           ),

//       },
//       {
//         path: item == '' ? 'all-destinations/:slug/blogs' : item + '/' + 'all-destinations/:slug/blogs',
//         loadChildren: () =>
//           import('./pages/blogs/blogs-routes').then(
//             (c) => c.default
//           ),

//       },

//       {
//         path: item == '' ? 'all-blogs' : item + '/' + 'all-blogs', component: CitiesBlogsComponent
//       },

//       {
//         path: item == '' ? 'about-us' : item + '/' + 'about-us', component: AboutUsComponent
//       },
//       {
//         path: item == '' ? 'useful-links/:slug' : item + '/' + 'useful-links/:slug', component: UsefulLinksComponent
//       },

//       { path: item == '' ? 'multi-country-tours' : item + '/' + 'multi-country-tours',
//          component: MultiCountryPackagesComponent },

//       {
//         path: item == '' ? 'ask-experts' : item + '/' + 'ask-experts', component: AskExpertsComponent
//       },
//       {
//         path: item == '' ? 'contact-us' : item + '/' + 'contact-us' , component: ContactUsComponent
//       },
//       {
//         path: 'thanks', component: ThanksComponent
//       },


//       {
//         path: 'meet-the-team/development-team', component: MeetTheTeamComponent
//       },
//       {
//         path: item == '' ? 'our-story' : item + '/' + 'our-story', component: OurStoryComponent
//       },
//       {
//         path: item == '' ? 'privacy-policy' : item + '/' + 'privacy-policy', component: PrivacyPolicyComponent
//       },

//       { path: '404', component: RedirectUrlComponent },

//       {
//         path: '**',
//         redirectTo: '/404',
//       },

//     )
//   })
//   return routes;
// };
// export const routes: Routes = createRoutes();

// export const routes: Routes = [
//   {path:'', loadChildren: () => import('./pages/home/home-routes').then(c => c.default)}
// ];
// Create an instance of RouteManager and dynamically generate the routes
// const locales = ['en', 'fr', 'de', 'es', 'ru']

// let routes: Routes = [
//   { path: '', redirectTo: ${locales[0]}, pathMatch: 'full' }
// ];

// locales.forEach(item => {
//   routes.push(
//     {
//       path: ${item},
//       loadChildren: () => import('./pages/home/home-routes').then(c => c.default), resolve: {
//         seoData: SeoResolver
//       }
//     },
//     {
//       path: item == '' ? all-destinations : ${item}/all-destinations,
//       loadChildren: () => import('./pages/destinations/destination-routes').then(c => c.default)
//     }
//   )
//     loadChildren: () =>
//       import('./pages/home/home-routes').then((m) => m.default),
//   },
//   {
//     path: ':lang', // Language code in the URL
//     children: [
//       {path:'' , loadChildren: () =>
//         import('./pages/home/home-routes').then((m) => m.default),}
//     ],

//   },
//   // { path: '**', redirectTo: '/' }
// ];
