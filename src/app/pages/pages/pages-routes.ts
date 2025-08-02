
import { AllPagesComponent } from './all-pages/all-pages.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { PageSeoResolver } from '../../core/guards/page-seo.resolver';

import { Route } from '@angular/router';

export default  [
  {path:'',component:AllPagesComponent},
  { path: 'page/:page', component:SinglePageComponent, resolve: { pageData: PageSeoResolver }},
] as Route[];
