
import { AllFaqsComponent } from './all-faqs/all-faqs.component';

import { Route } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';

export default  [
  {path:'',component:AllFaqsComponent},
  {path:':slug/myths-facts',component:FaqsComponent},

 ]as Route[];
