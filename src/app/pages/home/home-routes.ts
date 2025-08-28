import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PageSeoResolver } from "../../core/guards/page-seo.resolver";

export default [
    { 
        path: '', 
        component: HomeComponent,
        resolve: {
            seoData: PageSeoResolver
        }
    }
] as Route[];