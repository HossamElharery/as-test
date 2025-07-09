import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Blog } from '../../core/interfaces/blog';
import { socials } from '../../core/interfaces/socials';
import { destination } from '../../core/interfaces/destination';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { LayoutService } from '../services/layout.service';

@Component({
    selector: 'app-header',
    imports: [
        TranslateModule,
        RouterLink,
        FormsModule,
        SlicePipe
    ],
    providers: [LayoutService],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  socialsContainer: socials[] = [];
  destinationContainer: destination[] = [];
  desSlug: any
  img = "../../../../../assets/imgs/default.png"
  blogs: Blog[] = [];
  destinations: Blog[] = [];
  package: Blog[] = [];
  cruise: Blog[] = [];
  faq: Blog[] = [];
  excursion: Blog[] = [];
  category: Blog[] = [];
  hotel: Blog[] = [];
  page: Blog[] = [];
  travel_guide: Blog[] = [];

  // SAFE: Initialize language arrays
  en: any[] = []
  fr: any[] = []
  sp: any[] = []
  ger: any[] = []
  ru: any[] = []
  oneLang: any[] = []
  langArr: any[] = []

  currentLang: string = '';
  empty = false
  term: any;
  loading: boolean = true

  @ViewChild('closee') closee!: ElementRef

  Languages = [
    { lnaguage: "English", lang: 'en', image: "assets/imgs/en.png" },
    { lnaguage: "French", lang: 'fr', image: "assets/imgs/fr.png" },
    { lnaguage: "Spanish", lang: 'es', image: "assets/imgs/es.png" },
    { lnaguage: "German", lang: 'de', image: "assets/imgs/de.png" },
    { lnaguage: "Russian", lang: 'ru', image: "assets/imgs/ru.png" },
  ]

  textLang = '';
  imgLang = '';
  searchFlag: boolean = false;

  // SAFE: Initialize with fallback values
  phone1: string = '';
  mail: string = '';
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  yesChecked: boolean = false

  constructor(
    public translate: TranslateService,
    public header: LayoutService,
  ) {


  }

  ngOnInit(): void {
    this.loadSocials();
    this.loadLanguages();
  }

  private loadSocials(): void {
    this.header.getSocials().subscribe({
      next: (result) => {
        try {
          console.log('Socials response:', result);

          // SAFE: Check if result and data exist
          if (result?.data && Array.isArray(result.data) && result.data.length > 0) {
            this.socialsContainer = result.data;

            // SAFE: Access first element with fallback
            const firstSocial = result.data[0];
            if (firstSocial) {
              this.mail = firstSocial.mail || '';
              this.phone1 = firstSocial.phone1 || '';
            }
          } else {
            console.warn('No socials data received, using fallbacks');
            this.socialsContainer = [];
            this.mail = '';
            this.phone1 = '';
          }

          this.loading = false;
        } catch (error) {
          console.error('Error processing socials data:', error);
          this.setFallbackSocials();
        }
      },
      error: (error) => {
        console.error('Error loading socials:', error);
        this.setFallbackSocials();
      }
    });
  }

  private loadLanguages(): void {
    this.header.lang().subscribe({
      next: (result) => {
        try {
          console.log('Languages response:', result);

          // SAFE: Check if result and data exist
          if (result?.data && Array.isArray(result.data) && result.data.length > 0) {
            this.langArr.push(result.data);

            // SAFE: Access first element with fallback
            const firstLang = result.data[0];
            if (firstLang) {
              this.en = firstLang.english || [];
              this.fr = firstLang.french || [];
              this.sp = firstLang.spanish || [];
              this.ger = firstLang.deutsch || [];
              this.ru = firstLang.russian || [];
            }
          } else {
            console.warn('No language data received, using fallbacks');
            this.setFallbackLanguages();
          }
        } catch (error) {
          console.error('Error processing language data:', error);
          this.setFallbackLanguages();
        }
      },
      error: (error) => {
        console.error('Error loading languages:', error);
        this.setFallbackLanguages();
      }
    });
  }

  private setFallbackSocials(): void {
    this.socialsContainer = [];
    this.mail = '';
    this.phone1 = '';
    this.loading = false;
  }

  private setFallbackLanguages(): void {
    this.en = [];
    this.fr = [];
    this.sp = [];
    this.ger = [];
    this.ru = [];
    this.langArr = [];
  }

  changeCurrentLang(lang: any, i: any): void {
    this.Languages.forEach(data => {
    })

    this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
    this.textLang = i.text
    location.reload();
  }

  ddToggle(): void {
    this.closee.nativeElement.click()
    this.searchFlag = false

  }

  searchFire(term: any): void {
    if (term == "" && this.package.length > 0) {
      this.searchFlag = false;
    } else {
      this.searchFlag = true;
    }

    if (term?.length >= 3) {
      this.header.search(term).subscribe({
        next: (result) => {
          try {
            // SAFE: Access search results with fallbacks
            this.blogs = result?.data?.blogs || [];
            this.destinations = result?.data?.destinations || [];
            this.desSlug = result?.data?.destinations || [];
            this.package = result?.data?.package || [];
            this.cruise = result?.data?.cruise || [];
            this.excursion = result?.data?.excursion || [];
            this.category = result?.data?.category || [];
            this.faq = result?.data?.faq || [];
            this.hotel = result?.data?.hotel || [];
            this.page = result?.data?.page || [];
            this.travel_guide = result?.data?.travel_guide || [];
          } catch (error) {
            console.error('Error processing search results:', error);
            this.clearSearchResults();
          }
        },
        error: (error) => {
          console.error('Search error:', error);
          this.clearSearchResults();
        }
      });
    }
  }

  private clearSearchResults(): void {
    this.blogs = [];
    this.destinations = [];
    this.desSlug = [];
    this.package = [];
    this.cruise = [];
    this.excursion = [];
    this.category = [];
    this.faq = [];
    this.hotel = [];
    this.page = [];
    this.travel_guide = [];
  }

  focusInput() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }

  close(): void {
    this.term = '';
  }
}
