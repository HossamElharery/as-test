
import { CityExcursionComponent } from './city-excursion/city-excursion.component';



import { Route } from '@angular/router';
import { SingleExcursionComponent } from './single-excursion/single-excursion.component';
import { AllExcursionComponent } from './all-excursion/all-excursion.component';


export default [
  {path:'',component:CityExcursionComponent},
  {path:':id/travel-excursions/:excursion',component:SingleExcursionComponent},
  {path:':id/:city/travel-excursions',component:AllExcursionComponent}

] as Route[];
