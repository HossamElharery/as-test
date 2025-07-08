


import { Route } from '@angular/router';
import { AllCruisesComponent } from './all-cruises/all-cruises.component';

export default [

  {
    path:'' , component:AllCruisesComponent
  }
  ,


  {
    path: 'all-destinations/:id/travel-cruises/:slug/hotel/:hotel',
    loadChildren: () =>
      import('../hotels/hotels-routes').then(
        (c) => c.default
      ),

  },

] as Route[];
