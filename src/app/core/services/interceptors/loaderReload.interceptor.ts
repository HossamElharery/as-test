import { SecondLoaderService } from './../services/SecondLoader.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
@Injectable({
    providedIn:'root'
})
export class LoaderReload implements HttpInterceptor{
  private totalRequest = 0
    constructor(public _loader:SecondLoaderService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.totalRequest++
            this._loader.setLoading(true)
            this._loader.loaderFalse = true
        return next.handle(req).pipe(
            finalize(
                () => {
                  this.totalRequest--
                  if ( this.totalRequest ==  0) {
                    this._loader.setLoading(false)
                    this._loader.loaderFalse = false
                  }

                }
            )
        )
    }

}
