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
    // { lnaguage: "Italian ",lang: 'it', image: "assets/imgs/italy.png" },
  ]
  textLang = '';
  imgLang = '';
  searchFlag: boolean = false;
  phone1: any;
  mail: any
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  yesChecked: boolean = false

  constructor(
    public translate: TranslateService,
    public header: LayoutService,
  ) {


  }

  ngOnInit(): void {

    this.header.getSocials().subscribe(result => {
      this.socialsContainer = result.data
      this.mail = result.data[0].mail
      this.phone1 = result.data[0].phone1
      this.loading = false
    });

    this.header.lang().subscribe(result => {
      this.langArr.push(result.data)

      this.en = result.data[0].english;
      this.fr = result.data[0].french;
      this.sp = result.data[0].spanish;
      this.ger = result.data[0].deutsch;
      this.ru = result.data[0].russian;

    })

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
      this.searchFlag = false
    }
    else {
      this.searchFlag = true
    }

    if (term?.length >= 3) {
      this.header.search(term).subscribe(result => {
        this.blogs = result.data.blogs
        this.destinations = result.data.destinations
        this.desSlug = result.data.destinations
        this.package = result.data.package
        this.cruise = result.data.cruise
        this.excursion = result.data.excursion
        this.category = result.data.category
        this.faq = result.data.faq
        this.hotel = result.data.hotel
        this.page = result.data.page
        this.travel_guide = result.data.travel_guide
      })
    }

  }
  focusInput() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();

    }, 0);
  }

  close(): void {
    this.term = ''
  }
}
