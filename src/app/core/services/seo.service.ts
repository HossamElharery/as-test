import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, Renderer2, RendererFactory2, TransferState } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { author, description, fb, google_site_verification, keywords, msvalidate, og, revisit_after, robots, twitter, viewport, yahoo, yandex_verification } from '../models/seo';
import { HomeserviceService } from './homeservice.service';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

const SEO_KEY = makeStateKey<any>('seo-data');

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  chat: any;
  canURL = ''
  private renderer!: Renderer2;
  data = { title: '', twitterImage: '', twitterDes: '', twitterTit: '', fbImg: '', fbDes: '', fbTit: '', keywords: '', robots: '', description: '' }
  currentlang: any;

  constructor(
    @Inject(DOCUMENT) private dom: any,
    private rendererFactory: RendererFactory2,
    private _meta: Meta,
    private _title: Title,
    private seo: HomeserviceService,
    private location: Location,
    private transferState: TransferState,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // this._lang.initializeLanguage();
  }

  updateCanonicalUrl(url: string) {
    const head = this.dom.getElementsByTagName('head')[0];
    let element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    this.updateAlternateUrl(url);
    this.updateAlternateXdefault(url);
  }

  updateAlternateUrl(url: string) {
    const head = this.dom.getElementsByTagName('head')[0];
    let element: HTMLLinkElement = this.dom.querySelector(`link[hreflang='en-us']`) || null;

    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'alternate');
    element.setAttribute('hreflang', 'en-us');

    if (this.location.path() == '') {
      element.setAttribute('href', url + 'en-us');
    } else {
      element.setAttribute('href', url);
    }
  }

  updateAlternateXdefault(url: string) {
    const head = this.dom.getElementsByTagName('head')[0];
    let element: HTMLLinkElement = this.dom.querySelector(`link[hreflang='x-default']`) || null;
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'alternate');
    element.setAttribute('hreflang', 'x-default');
    element.setAttribute('href', url);
  }
  setFallbackMetaTags(): void {
    console.log('Setting fallback meta tags during SSR');

    const fallbackData = {
      title: 'Ask Aladdin - Egypt Travel & Tours',
      description: 'Discover Egypt with Ask Aladdin - Your trusted travel companion for unforgettable experiences.',
      keywords: 'Egypt travel, tours, vacation, Ask Aladdin',
      robots: 'index,follow',
      og_title: 'Ask Aladdin - Egypt Travel & Tours',
      facebook_description: 'Discover Egypt with Ask Aladdin - Your trusted travel companion for unforgettable experiences.',
      facebook_image: 'https://www.ask-aladdin.com/assets/imgs/ask.png',
      facebook_site_name: 'Ask Aladdin Travel',
      facebook_page_id: '590763524',
      facebook_admins: '590763524',
      twitter_title: 'Ask Aladdin - Egypt Travel & Tours',
      twitter_description: 'Discover Egypt with Ask Aladdin - Your trusted travel companion for unforgettable experiences.',
      twitter_image: 'https://www.ask-aladdin.com/assets/imgs/ask.png',
      twitter_site: '@AskAladdin',
      twitter_card: 'summary_large_image',
      author: 'Ask Aladdin Travel',
      revisit_after: '7 days',
      og_type: 'website'
    };

    this.setMetaTags(fallbackData);
  }
  // ORIGINAL METHOD - RESTORED EXACTLY AS IT WAS
  globalSeo(lang:any) {
    const seoData = this.transferState.get(SEO_KEY, null);

    if (seoData) {
      this.setMetaTags(seoData);
    } else {
      this.seo.globalSeo(lang).subscribe(res => {
        this.chat = res.data[0].live_chat_tag;
        this.setMetaTags(res.data[0]);
        this.transferState.set(SEO_KEY, res.data[0]);  // Save data for client-side rendering
      });
    }
  }

  // NEW: MINIMAL METHOD ONLY FOR SSR - RETURNS PROMISE
  globalSeoForSSR(lang: string): Promise<void> {
    const seoData = this.transferState.get(SEO_KEY, null);
    if (seoData) {
      this.setMetaTags(seoData);
      return Promise.resolve();
    }

    const ssrTimeout = environment.ssrApiTimeout || 5000;
    console.log(`SSR SEO call with ${ssrTimeout}ms timeout`);

    return firstValueFrom(
      this.seo.globalSeo(lang).pipe(
        timeout(ssrTimeout),
        catchError((error) => {
          console.error('SSR SEO failed:', error);
          this.setFallbackMetaTags();
          return of(null);
        })
      )
    )
    .then((res: any) => {
      if (res && res.data && res.data[0]) {
        this.setMetaTags(res.data[0]);
        this.transferState.set(SEO_KEY, res.data[0]);
      } else {
        this.setFallbackMetaTags();
      }
    })
    .catch(() => {
      this.setFallbackMetaTags();
    });
  }

  setMetaTags(data: any) {
    console.log('Setting global meta tags:', data);

    // Basic SEO tags
    if (data.title) {
      this._title.setTitle(data.title);
    }

    if (data.description) {
      this.updateDesTag(data.description);
    }

    if (data.keywords) {
      this.updateKeywords(data.keywords);
    }

    if (data.robots) {
      this.updateRobots(data.robots);
    }

    // Open Graph tags
    if (data.facebook_site_name) {
      this._meta.updateTag({property: 'og:site_name', content: data.facebook_site_name});
    }

    if (data.og_title) {
      this._meta.updateTag({property: 'og:title', content: data.og_title});
    }

    if (data.facebook_description) {
      this._meta.updateTag({property: 'og:description', content: data.facebook_description});
    }

    if (data.facebook_image) {
      this._meta.updateTag({property: 'og:image', content: data.facebook_image});
    }

    if (data.og_type) {
      this._meta.updateTag({property: 'og:type', content: data.og_type});
    }

    this._meta.updateTag({property: 'og:url', content: `https://www.ask-aladdin.com${this.location.path()}`});

    // Facebook specific tags
    if (data.facebook_page_id) {
      this._meta.updateTag({property: 'fb:page_id', content: data.facebook_page_id.toString()});
    }

    if (data.facebook_admins) {
      this._meta.updateTag({property: 'fb:admins', content: data.facebook_admins.toString()});
    }

    // Twitter tags
    if (data.twitter_title) {
      this._meta.updateTag({name: 'twitter:title', content: data.twitter_title});
    }

    if (data.twitter_description) {
      this._meta.updateTag({name: 'twitter:description', content: data.twitter_description});
    }

    if (data.twitter_image) {
      this._meta.updateTag({name: 'twitter:image', content: data.twitter_image});
    }

    if (data.twitter_site) {
      this._meta.updateTag({name: 'twitter:site', content: data.twitter_site});
    }

    if (data.twitter_card) {
      this._meta.updateTag({name: 'twitter:card', content: data.twitter_card});
    }

    this._meta.updateTag({name: 'twitter:url', content: `https://www.ask-aladdin.com${this.location.path()}`});

    if (data.twitter_label1) {
      this._meta.updateTag({name: 'twitter:label1', content: data.twitter_label1});
    }

    if (data.twitter_data1) {
      this._meta.updateTag({name: 'twitter:data1', content: data.twitter_data1});
    }

    // Additional SEO tags
    if (data.author) {
      this._meta.updateTag({name: 'author', content: data.author});
    }

    if (data.revisit_after) {
      this._meta.updateTag({name: 'revisit-after', content: `${data.revisit_after} days`});
    }

    if (data.microsoft_validate) {
      this._meta.updateTag({name: 'msvalidate.01', content: data.microsoft_validate});
    }

    if (data.google_site_verification) {
      this._meta.updateTag({name: 'google-site-verification', content: data.google_site_verification});
    }

    if (data.yandex_verification) {
      this._meta.updateTag({name: 'yandex-verification', content: data.yandex_verification});
    }

    // Update canonical URL
    this.updateCanonicalUrl(`https://www.ask-aladdin.com${this.location.path()}`);
  }

  /**
   * Handle complete SEO data from API response (both global and page-specific)
   * Use this method for direct API responses with facebook_title, facebook_description etc.
   */
  updateCompleteMetaTags(data: any) {
    console.log('Setting complete meta tags from API:', data);

    // Basic SEO tags
    if (data.title) {
      this._title.setTitle(data.title);
    }

    if (data.description) {
      this.updateDesTag(data.description);
    }

    if (data.keywords) {
      this.updateKeywords(data.keywords);
    }

    if (data.robots) {
      this.updateRobots(data.robots);
    }

    // Open Graph tags (using API field names)
    if (data.facebook_title) {
      this._meta.updateTag({property: 'og:title', content: data.facebook_title});
    }

    if (data.facebook_description) {
      this._meta.updateTag({property: 'og:description', content: data.facebook_description});
    }

    if (data.facebook_image) {
      this._meta.updateTag({property: 'og:image', content: data.facebook_image});
    }

    // Twitter tags (using API field names)
    if (data.twitter_title) {
      this._meta.updateTag({name: 'twitter:title', content: data.twitter_title});
    }

    if (data.twitter_description) {
      this._meta.updateTag({name: 'twitter:description', content: data.twitter_description});
    }

    if (data.twitter_image) {
      this._meta.updateTag({name: 'twitter:image', content: data.twitter_image});
    }

    // Set URL for current page
    this._meta.updateTag({property: 'og:url', content: `https://www.ask-aladdin.com${this.location.path()}`});
    this._meta.updateTag({name: 'twitter:url', content: `https://www.ask-aladdin.com${this.location.path()}`});

    // Update canonical URL
    this.updateCanonicalUrl(`https://www.ask-aladdin.com${this.location.path()}`);
  }

  updateDesTag(des: any) {
    let descriptionTag;
    if (!this._meta.getTag(`name='${description.description}'`)) {
      descriptionTag = this._meta.addTag({ name: `${description.description}`, content: `${des}` });
    } else {
      descriptionTag = this._meta.updateTag({ name: `${description.description}`, content: `${des}` });
    }
    return descriptionTag;
  }

  updateKeywords(keyword: any) {
    let keywordTag;
    if (!this._meta.getTag(`name='${keywords.keywords}'`)) {
      keywordTag = this._meta.addTag({ name: `${keywords.keywords}`, content: `${keyword}` });
    } else {
      keywordTag = this._meta.updateTag({ name: `${keywords.keywords}`, content: `${keyword}` });
    }
    return keywordTag;
  }

  updateRobots(robot: any) {
    return this._meta.updateTag({ name: `${robots.robots}`, content: `${robot}` });
  }

  updateTwtDesTag(twt_des: any) {
    let twtTag;
    if (!this._meta.getTag(`name='${twitter.description}'`)) {
      twtTag = this._meta.addTag({ name: `${twitter.description}`, content: `${twt_des}` });
    } else {
      twtTag = this._meta.updateTag({ name: `${twitter.description}`, content: `${twt_des}` });
    }
    return twtTag;
  }

  updateTwtTitTag(twt_title: any) {
    let twtTitTag;
    if (!this._meta.getTag(`name='${twitter.title}'`)) {
      twtTitTag = this._meta.addTag({ name: `${twitter.title}`, content: `${twt_title}` });
    } else {
      twtTitTag = this._meta.updateTag({ name: `${twitter.title}`, content: `${twt_title}` });
    }
    return twtTitTag;
  }

  updateTwtImgTag(twt_img: any) {
    let twtImageTag;
    if (!this._meta.getTag(`name='${twitter.image}'`)) {
      twtImageTag = this._meta.addTag({ name: `${twitter.image}`, content: `${twt_img}` });
    } else {
      twtImageTag = this._meta.updateTag({ name: `${twitter.image}`, content: `${twt_img}` });
    }
    return twtImageTag;
  }

  updateFbDes(og_description: any) {
    let ogDes;
    if (!this._meta.getTag(`property='${og.og_description}'`)) {
      ogDes = this._meta.addTag({ property: `${og.og_description}`, content: `${og_description}` });
    } else {
      ogDes = this._meta.updateTag({ property: `${og.og_description}`, content: `${og_description}` });
    }
    return ogDes;
  }

  updateFbImg(og_Img: any) {
    let ogImage;
    if (!this._meta.getTag(`property='${og.og_image}'`)) {
      ogImage = this._meta.addTag({ property: `${og.og_image}`, content: `${og_Img}` });
    } else {
      ogImage = this._meta.updateTag({ property: `${og.og_image}`, content: `${og_Img}` });
    }
    return ogImage;
  }

  updateFbtit(og_tit: any) {
    let ogImage;
    if (!this._meta.getTag(`property='${og.og_title}'`)) {
      ogImage = this._meta.addTag({ property: `${og.og_title}`, content: `${og_tit}` });
    } else {
      ogImage = this._meta.updateTag({ property: `${og.og_title}`, content: `${og_tit}` });
    }
    return ogImage;
  }

  updateTags(data: any) {
    console.log('Setting page-specific meta tags:', data);

    // Basic SEO tags
    if (data.title) {
      this._title.setTitle(data.title);
    }

    if (data.description) {
      this.updateDesTag(data.description);
    }

    if (data.keywords) {
      this.updateKeywords(data.keywords);
    }

    if (data.robots) {
      this.updateRobots(data.robots);
    }

    // Open Graph tags
    if (data.fbTit) {
      this.updateFbtit(data.fbTit);
    }

    if (data.fbDes) {
      this.updateFbDes(data.fbDes);
    }

    if (data.fbImg) {
      this.updateFbImg(data.fbImg);
    }

    // Twitter tags
    if (data.twitterTit) {
      this.updateTwtTitTag(data.twitterTit);
    }

    if (data.twitterDes) {
      this.updateTwtDesTag(data.twitterDes);
    }

    if (data.twitterImage) {
      this.updateTwtImgTag(data.twitterImage);
    }

    // Update canonical URL for the specific page
    this.updateCanonicalUrl(`https://www.ask-aladdin.com${this.location.path()}`);
  }
}
