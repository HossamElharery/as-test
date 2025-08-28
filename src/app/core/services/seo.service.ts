import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, Renderer2, RendererFactory2, TransferState } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { author, description, fb, google_site_verification, keywords, msvalidate, og, revisit_after, robots, twitter, viewport, yahoo, yandex_verification } from '../models/seo';
import { HomeserviceService } from './homeservice.service';
import { catchError, firstValueFrom, of, timeout, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { logSSR, logSSRTiming, logSSRTimingEnd } from '../utils/ssr-debug';

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
  private isBrowser: boolean;
  private baseUrl: string;

  constructor(
    @Inject(DOCUMENT) private dom: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private rendererFactory: RendererFactory2,
    private _meta: Meta,
    private _title: Title,
    private seo: HomeserviceService,
    private location: Location,
    private transferState: TransferState,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);
    // SAFE: Use environment baseUrl for consistent URL generation
    this.baseUrl = environment.baseUrl || 'https://new.ask-aladdin.com';
  }

  updateCanonicalUrl(url: string) {
    if (!this.isBrowser) {
      // For SSR, create link elements using Renderer2
      this.setCanonicalLinkSSR(url);
      return;
    }

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

  private setCanonicalLinkSSR(url: string) {
    // SAFE: SSR-safe way to set canonical link
    try {
      const existingCanonical = this.dom.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        this.renderer.setAttribute(existingCanonical, 'href', url);
      } else {
        const head = this.dom.querySelector('head');
        if (head) {
          const linkElement = this.renderer.createElement('link');
          this.renderer.setAttribute(linkElement, 'rel', 'canonical');
          this.renderer.setAttribute(linkElement, 'href', url);
          this.renderer.appendChild(head, linkElement);
        }
      }
      this.updateAlternateUrlSSR(url);
    } catch (error) {
      console.warn('SSR canonical link creation failed:', error);
    }
  }

  updateAlternateUrl(url: string) {
    if (!this.isBrowser) {
      this.updateAlternateUrlSSR(url);
      return;
    }

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

  private updateAlternateUrlSSR(url: string) {
    try {
      const head = this.dom.querySelector('head');
      if (head) {
        // Create en-us alternate link
        const enLinkElement = this.renderer.createElement('link');
        this.renderer.setAttribute(enLinkElement, 'rel', 'alternate');
        this.renderer.setAttribute(enLinkElement, 'hreflang', 'en-us');
        this.renderer.setAttribute(enLinkElement, 'href', url);
        this.renderer.appendChild(head, enLinkElement);

        // Create x-default alternate link
        const defaultLinkElement = this.renderer.createElement('link');
        this.renderer.setAttribute(defaultLinkElement, 'rel', 'alternate');
        this.renderer.setAttribute(defaultLinkElement, 'hreflang', 'x-default');
        this.renderer.setAttribute(defaultLinkElement, 'href', url);
        this.renderer.appendChild(head, defaultLinkElement);
      }
    } catch (error) {
      console.warn('SSR alternate link creation failed:', error);
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

    const currentPath = this.location.path();
    const fullUrl = `${this.baseUrl}${currentPath}`;

    // Comprehensive fallback meta data with actual content
    const fallbackData = {
      title: 'Ask Aladdin - Egypt Travel & Tours | Discover Ancient Wonders',
      description: 'Explore the magnificent wonders of Egypt with Ask Aladdin. From pyramids to Nile cruises, experience authentic Egyptian adventures with expert local guides and discover the magic of ancient civilization.',
      keywords: 'Egypt travel, pyramids tours, Nile cruise, Cairo tours, Luxor tours, ancient Egypt, travel packages, Egyptian adventures, cultural tours, historical sites',
      robots: 'index,follow',
      og_title: 'Ask Aladdin - Egypt Travel & Tours | Discover Ancient Wonders',
      facebook_description: 'Explore the magnificent wonders of Egypt with Ask Aladdin. From pyramids to Nile cruises, experience authentic Egyptian adventures with expert local guides.',
      facebook_image: `${this.baseUrl}/assets/imgs/ask.png`,
      facebook_title: 'Ask Aladdin - Egypt Travel & Tours',
      facebook_site_name: 'Ask Aladdin Travel',
      facebook_page_id: '590763524',
      facebook_admins: '590763524',
      twitter_title: 'Ask Aladdin - Egypt Travel & Tours',
      twitter_description: 'Explore the magnificent wonders of Egypt with Ask Aladdin. From pyramids to Nile cruises, experience authentic Egyptian adventures.',
      twitter_image: `${this.baseUrl}/assets/imgs/ask.png`,
      twitter_site: '@AskAladdin',
      twitter_card: 'summary_large_image',
      author: 'Ask Aladdin Travel',
      revisit_after: '7',
      og_type: 'website',
      microsoft_validate: '',
      google_site_verification: '',
      yandex_verification: ''
    };

    // Use the comprehensive setMetaTags method
    this.setMetaTags(fallbackData);
    this.updateCanonicalUrl(fullUrl);

    console.log('Fallback meta tags applied successfully');
  }
  // ORIGINAL METHOD - RESTORED EXACTLY AS IT WAS
  globalSeo(lang:any) {
    const seoData = this.transferState.get(SEO_KEY, null);

    if (seoData) {
      this.setMetaTags(seoData);
    } else {
      this.seo.globalSeo(lang).subscribe({
        next: (res) => {
          if (res && res.data && res.data[0]) {
            this.chat = res.data[0].live_chat_tag;
            this.setMetaTags(res.data[0]);
            this.transferState.set(SEO_KEY, res.data[0]);  // Save data for client-side rendering
          }
        },
        error: (error) => {
          console.error('globalSeo API failed:', error);
        }
      });
    }
  }

  // ENHANCED: Better method for SSR with fallbacks only when needed
  globalSeoForSSR(lang: string): Promise<void> {
    logSSR('globalSeoForSSR called with lang:', lang);
    logSSRTiming('globalSeoForSSR');

    const seoData = this.transferState.get(SEO_KEY, null);

    if (seoData) {
      logSSR('Using cached SEO data from TransferState');
      this.setMetaTags(seoData);
      logSSRTimingEnd('globalSeoForSSR');
      return Promise.resolve();
    } else {
      logSSR('Fetching SEO data from API...');
      const ssrTimeout = environment.ssrApiTimeout || 2000;
      logSSR(`Using SSR timeout: ${ssrTimeout}ms`);

      return firstValueFrom(this.seo.globalSeo(lang).pipe(
        timeout(ssrTimeout), // Use environment-specific SSR timeout
        tap(res => {
          logSSR('API response received:', JSON.stringify(res).substring(0, 200));
          if (res && res.data && res.data[0]) {
            logSSR('Setting meta tags from API response');
            logSSR('Title from API:', res.data[0].title);
            logSSR('Description from API:', res.data[0].description);
            this.setMetaTags(res.data[0]);
            // Only set transfer state on server
            if (!this.isBrowser) {
              this.transferState.set(SEO_KEY, res.data[0]);
            }
          } else {
            logSSR('No SEO data in response, using fallback');
            this.setFallbackMetaTags();
          }
        }),
        catchError(error => {
          logSSR('globalSeoForSSR API failed:', error.message || error);
          logSSR('Error type:', error.name);
          if (error.name === 'TimeoutError') {
            logSSR('API call timed out - check if SSR server can reach API');
          }
          this.setFallbackMetaTags();
          return of(null);
        })
      )).then(() => {
        logSSR('globalSeoForSSR completed');
        logSSRTimingEnd('globalSeoForSSR');
      });
    }
  }

  setMetaTags(data: any) {

    console.log(`[${this.isBrowser ? 'CLIENT' : 'SERVER'}] Setting meta tags:`, {
      title: data.title,
      description: data.description?.substring(0, 50) + '...',
      hasOgTitle: !!data.og_title,
      hasTwitterTitle: !!data.twitter_title
    });

    console.log();

    // Basic SEO tags
    if (data.title) {
      this._title.setTitle(data.title);
      console.log(`[${this.isBrowser ? 'CLIENT' : 'SERVER'}] Title set:`, data.title);
    }

    if (data.description) {
      this.updateDesTag(data.description);
      console.log(`[${this.isBrowser ? 'CLIENT' : 'SERVER'}] Description set`);
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
      console.log(`[${this.isBrowser ? 'CLIENT' : 'SERVER'}] OG title set:`, data.og_title);
    }

    if (data.facebook_description) {
      this._meta.updateTag({property: 'og:description', content: data.facebook_description});
      console.log(`[${this.isBrowser ? 'CLIENT' : 'SERVER'}] OG description set`);
    }

    if (data.facebook_image) {
      this._meta.updateTag({property: 'og:image', content: data.facebook_image});
    }

    if (data.og_type) {
      this._meta.updateTag({property: 'og:type', content: data.og_type});
    }

    const currentPath = this.location.path();
    const fullUrl = `${this.baseUrl}${currentPath}`;
    this._meta.updateTag({property: 'og:url', content: fullUrl});

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
      console.log(`[${this.isBrowser ? 'CLIENT' : 'SERVER'}] Twitter title set:`, data.twitter_title);
    }

    if (data.twitter_description) {
      this._meta.updateTag({name: 'twitter:description', content: data.twitter_description});
      console.log(`[${this.isBrowser ? 'CLIENT' : 'SERVER'}] Twitter description set`);
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

    this._meta.updateTag({name: 'twitter:url', content: fullUrl});

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
    // Only log in browser to avoid confusion
    if (this.isBrowser) {
      console.log('Setting complete meta tags from API:', data);
    }

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
    const currentPath = this.location.path();
    const fullUrl = `${this.baseUrl}${currentPath}`;
    this._meta.updateTag({property: 'og:url', content: fullUrl});
    this._meta.updateTag({name: 'twitter:url', content: fullUrl});

    // Update canonical URL
    this.updateCanonicalUrl(fullUrl);
  }

  updateDesTag(des: any) {
    let descriptionTag;
    if (!this._meta.getTag(`name='description'`)) {
      descriptionTag = this._meta.addTag({ name: 'description', content: `${des}` });
    } else {
      descriptionTag = this._meta.updateTag({ name: 'description', content: `${des}` });
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
    const currentPath = this.location.path();
    const fullUrl = `${this.baseUrl}${currentPath}`;
    this.updateCanonicalUrl(fullUrl);
  }
}
