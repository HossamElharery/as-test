
import { AllPagesComponent } from './all-pages/all-pages.component';
import { SinglePageComponent } from './single-page/single-page.component';


import { Route } from '@angular/router';


export default  [
  {path:'',component:AllPagesComponent},


  { path: 'page/:page',component:SinglePageComponent},


] as Route[];
