import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { MainHotelsComponent } from './main-hotels/main-hotels.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelsCitiesComponent } from './hotels-cities/hotels-cities.component';

export class HotelsRoutingModule { }


import { Route } from '@angular/router';

export default [
  {path:'', component:MainHotelsComponent, children:[

    {path:'hotels', component:HotelsCitiesComponent},
    {path:'hotels/:city' , component:AllHotelsComponent},
    {path:'hotel/:hotel' , component:HotelComponent},


  ]},
] as Route[];
