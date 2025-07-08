import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../environments/environment";
import { isPlatformBrowser, Location } from "@angular/common";
import { catchError, timeout } from "rxjs/operators";

const API_TIMEOUT = 15000; // 15 seconds timeout for API calls

@Injectable({
  providedIn: "root",
})
export class HomeserviceService {
  currentLang: string = "en";
  public Add = new BehaviorSubject<string>('');

  constructor(
    private _http: HttpClient,
    public translate: TranslateService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = this.translate.currentLang || localStorage.getItem('lang') || 'en';
    } else {
      this.currentLang = 'en'; // Default for server-side
    }
  }

  getcat() {
    return this.Add.asObservable();
  }

  private handleApiError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  private apiGet<T>(url: string): Observable<T> {
    return this._http.get<T>(url).pipe(
      timeout(API_TIMEOUT),
      catchError(this.handleApiError<T>('apiGet', {} as T))
    );
  }

  getSlider(): Observable<any> {
    return this.apiGet(`${environment.url}sliders/${this.currentLang}`);
  }

  getAlldestination(): Observable<any> {
    return this.apiGet(`${environment.url}destinations/${this.currentLang}`);
  }

  getBlogs(): Observable<any> {
    return this.apiGet(`${environment.url}blog/1/${this.currentLang}`);
  }

  getDestinationEgy(): Observable<any> {
    return this.apiGet(`${environment.url}destination/blogs/1/${this.currentLang}`);
  }

  getSingleBlogs(des: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}blog/${des}/${id}/${this.currentLang}`);
  }

  getDestinationBlogs(id: any, page: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/blogs/${id}/${this.currentLang}?page=${page}`);
  }

  getPackages(): Observable<any> {
    return this.apiGet(`${environment.url}packages/${this.currentLang}`);
  }

  getAboutAs(): Observable<any> {
    return this.apiGet(`${environment.url}abouts/${this.currentLang}`);
  }

  getSocials(): Observable<any> {
    return this.apiGet(`${environment.url}socials/${this.currentLang}`);
  }

  getSubscribe(email: any): Observable<any> {
    return this._http.post(`${environment.url}email-subscription`, email);
  }

  getSingleDestination(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/packages/${id}/${this.currentLang}`);
  }

  getSeoCategory(des: any, cat: any): Observable<any> {
    return this.apiGet(`${environment.url}${des}/single_category/${cat}/${this.currentLang}`);
  }

  getTourTypePackages(des: any, cat: any): Observable<any> {
    return this.apiGet(`${environment.url}single-tour-type/${des}/${cat}/${this.currentLang}`);
  }

  getSingleDestinationFilter(id: any, rangePric: number, rangePriceMax: number, minDay: number, maxDay: number, minRate: number, MaxRate: number): Observable<any> {
    return this.apiGet(
      `${environment.url}filter-package/${id}/${rangePric}/${rangePriceMax}/${minDay}/${maxDay}/${minRate}/${MaxRate}/${this.currentLang}`
    );
  }

  getSingleDestinationDetails(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/${id}/${this.currentLang}`);
  }

  getStaticDes(): Observable<any> {
    return this.apiGet(`${environment.url}categories/1/${this.currentLang}`);
  }

  getOneDistination(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/${id}/${this.currentLang}`);
  }

  getOneDestinationDetails(id: any): Observable<any> {
    return this.apiGet(`${environment.url}categories/${id}/${this.currentLang}`);
  }

  getHotelsCities(id: any): Observable<any> {
    return this.apiGet(`${environment.url}hotels-cities/${id}/${this.currentLang}`);
  }

  getHotOffer(id: any): Observable<any> {
    return this.apiGet(`${environment.url}hot-offer/${id}/${this.currentLang}`);
  }

  getSinglepackage(des: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}package/${des}/${id}/${this.currentLang}`);
  }

  getMultiCoutryTours(): Observable<any> {
    return this.apiGet(`${environment.url}multi-country-packages/${this.currentLang}`);
  }

  getHotelsList(id: any, city: any, page: any): Observable<any> {
    return this.apiGet(`${environment.url}hotels-list/${id}/${city}/${this.currentLang}?page=${page}`);
  }

  getDestinationFact(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/faqs/${id}/${this.currentLang}`);
  }

  getSingleFaq(id: any): Observable<any> {
    return this.apiGet(`${environment.url}faq/${id}/${this.currentLang}`);
  }

  getDestinationGuides(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/travel-guides/${id}/${this.currentLang}`);
  }

  getSingleGuide(des: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}travel-guide/${des}/${id}/${this.currentLang}`);
  }

  getHomeBlog(): Observable<any> {
    return this.apiGet(`${environment.url}home/blog/${this.currentLang}`);
  }

  getPage(id: any): Observable<any> {
    return this.apiGet(`${environment.url}${id}/pages/${this.currentLang}`);
  }

  getPageContry(coutry: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}${coutry}/${id}/pages/${this.currentLang}`);
  }

  getSinglePage(des: any, cat: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}page/${des}/${cat}/${id}/${this.currentLang}`);
  }

  getSinglePageGeneral(id: any): Observable<any> {
    return this.apiGet(`${environment.url}page/general/general/${id}/${this.currentLang}`);
  }

  getDestinationExcursions(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/excursions/${id}/${this.currentLang}`);
  }

  getSingleExcursion(des: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}excursion/${des}/${id}/${this.currentLang}`);
  }

  getTravelCruises(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/cruises/${id}/${this.currentLang}`);
  }

  getSingleCruise(des: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}cruise/${des}/${id}/${this.currentLang}`);
  }

  Counter(): Observable<any> {
    return this.apiGet(`${environment.url}counter`);
  }

  getSingleHotel(des: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}hotel/${des}/${id}/${this.currentLang}`);
  }

  getLogo(): Observable<any> {
    return this.apiGet(`${environment.url}testimonials`);
  }

  search(term: string): Observable<any> {
    return this.apiGet(`${environment.url}search/${term}/${this.currentLang}`);
  }

  categoryFooter(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/footer/${id}/${this.currentLang}`);
  }

  side(des: any, slug: any): Observable<any> {
    return this.apiGet(`${environment.url}side-photos/${des}/${slug}/${this.currentLang}`);
  }

  lang(): Observable<any> {
    return this.apiGet(`${environment.url}lang-control`);
  }

  globalSeo(lang: any): Observable<any> {
    return this.apiGet(`${environment.url}global-seo/${lang || this.currentLang}`);
  }

  getCategoryPackage(des: any, id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/packages/${des}/${id}/${this.currentLang}`);
  }

  getTourType(des: any): Observable<any> {
    return this.apiGet(`${environment.url}tour-types/${des}/${this.currentLang}`);
  }

  postForm(data: any, id: any): Observable<any> {
    return this._http.post(`${environment.url}download/package/${id}/tripdossier/${this.currentLang}`, data);
  }

  getCruisesFilter(id: any, rangePric: number, rangePriceMax: number, minDay: number, maxDay: number, minRate: number, MaxRate: number): Observable<any> {
    return this.apiGet(
      `${environment.url}filter-cruise/${id}/${rangePric}/${rangePriceMax}/${minDay}/${maxDay}/${minRate}/${MaxRate}/${this.currentLang}`
    );
  }

  getExcursionsFilter(id: any, rangePric: number, rangePriceMax: number, minDay: number, maxDay: number, minRate: number, MaxRate: number, city: any): Observable<any> {
    return this.apiGet(
      `${environment.url}filter-excursion/${id}/${rangePric}/${rangePriceMax}/${minDay}/${maxDay}/${minRate}/${MaxRate}/${city}/${this.currentLang}`
    );
  }

  ExcursionCity(id: any): Observable<any> {
    return this.apiGet(`${environment.url}destination/${id}/cities/${this.currentLang}`);
  }

  allExcursionCity(id: any): Observable<any> {
    return this.apiGet(`${environment.url}city/excursion/${id}/${this.currentLang}`);
  }

  getMegaMenu(): Observable<any>{
    return this.apiGet(`${environment.url}menus/${this.currentLang}`);
  }
}
