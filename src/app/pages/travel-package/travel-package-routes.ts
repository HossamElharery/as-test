import { Route } from "@angular/router";
import { AllPackagesComponent } from "./components/all-packages/all-packages.component";
import { MainPackagesComponent } from "./components/main-packages/main-packages.component";
import { PageSeoResolver } from "../../core/guards/page-seo.resolver";

export default [
  {
    path:'',
    component:MainPackagesComponent,
    resolve: {
      seoData: PageSeoResolver
    },
    children:[
      {path:'',component:AllPackagesComponent},
    ]
  },
] as Route[];
