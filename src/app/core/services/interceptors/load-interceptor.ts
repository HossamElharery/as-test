import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "../loader.service";
@Injectable({
    providedIn:'root'
})
export class loadInterceptor implements HttpInterceptor{
    constructor(public _loader:LoaderService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            this._loader.loader.next(true)
        return next.handle(req).pipe(
            finalize(
                () => {
                    this._loader.loader.next(false)
                }
            )
        )
    }

}
