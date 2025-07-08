import { Route } from "@angular/router";
import { AllPackagesComponent } from "./components/all-packages/all-packages.component";
import { MainPackagesComponent } from "./components/main-packages/main-packages.component";



export default [
  {path:'',component:MainPackagesComponent, children:[
    {path:'',component:AllPackagesComponent},


    // {path: "hotel/:hotel",loadChildren: () => import('../hotels/hotels.module').then(m => m.HotelsModule)},


  ]},
] as Route[];
