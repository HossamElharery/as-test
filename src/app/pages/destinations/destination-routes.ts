import { Route } from "@angular/router";
import { DestinationsComponent } from "./destinations/destinations.component";
import { AllDestinationComponent } from "./components/all-destination/all-destination.component";
import { OneDestinationComponent } from "./components/one-destination/one-destination.component";
import { TourPackageComponent } from "../travel-package/components/tour-package/tour-package.component";
import { MultiCountryPackagesComponent } from "../travel-package/components/multi-country-packages/multi-country-packages.component";
import { SinglePackageComponent } from "../travel-package/components/single-package/single-package.component";
import { SingleTourTypeComponent } from "../travel-package/components/single-tour-type/single-tour-type.component";
import { BlogComponent } from "../blogs/blog/blog.component";
import { AllExcursionComponent } from "../travel-excursion/all-excursion/all-excursion.component";
import { SingleExcursionComponent } from "../travel-excursion/single-excursion/single-excursion.component";
import { SingleCruisesComponent } from "../travel-cruises/single-cruises/single-cruises.component";
import { FaqsComponent } from "../faqs/faqs/faqs.component";
import { TravelGuideComponent } from "../travel-guide/travel-guide/travel-guide.component";
import { SingleGuideComponent } from "../travel-guide/single-guide/single-guide.component";
import { CityExcursionComponent } from "../travel-excursion/city-excursion/city-excursion.component";

export default [
    { path: '', component: DestinationsComponent, children:[
      {path:'' , component:AllDestinationComponent},
      { path: ':slug', component: OneDestinationComponent },
      {path:':id/travel-packages', component:TourPackageComponent},

      {path:'multi-country-packages', component:MultiCountryPackagesComponent},

      {path:':id/travel-packages/:slug', component:SinglePackageComponent},
      {path:':id/tour-type/:slug', component:SingleTourTypeComponent},

      { path: ':id/blog/:blog', component: BlogComponent },
      {path:':id/travel-excursions/:city',component:AllExcursionComponent},
      {path:':id/travel-excursions/:city/:excursion',component:SingleExcursionComponent},
      // {path:':id/travel-excursions',component:CityExcursionComponent},


      {
        path: ':slug/travel-cruises',
        loadChildren: () =>
          import('../travel-cruises/travel-cruises-routes').then(
            (c) => c.default
          ),

      },
      {
        path: ':slug/travel-excursions',
        loadChildren: () =>
          import('../travel-excursion/travel-excursion-routes').then(
            (c) => c.default
          ),

      },
      {path:':id/travel-cruises/:cruis' , component:SingleCruisesComponent},

      {path:':slug/myths-facts',component:FaqsComponent},
      {path:':slug/travel-guides',component:TravelGuideComponent},
      {path:':id/travel-guide/:guide',component:SingleGuideComponent},
      {
        path: ':slug',
        loadChildren: () =>
          import('../hotels/hotels-routes').then(
            (c) => c.default
          ),
      },
    ] }
] as Route[];
