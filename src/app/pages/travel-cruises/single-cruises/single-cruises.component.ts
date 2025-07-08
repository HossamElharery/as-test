import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Cruises } from '../../../core/interfaces/cruises';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';


import { FormsModule } from '@angular/forms';
import { NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';
import { SplanderComponent } from "../../../shared/components/splander/splander.component";
import { GalleryNewComponent } from "../../../shared/components/gallery-new/gallery-new.component";
import { TourBookingComponent } from "../../../shared/components/side-bar/tour-booking/tour-booking.component";
import { ExpertReviewsComponent } from "../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { OptionalExpertsComponent } from "../../../shared/components/side-bar/optional-experts/optional-experts.component";
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { ExperiencesComponent } from "../../../shared/components/experiences/experiences.component";
import { ReviewsComponent } from "../../../shared/components/reviews/reviews.component";
import { NgStyle, CommonModule, isPlatformBrowser } from '@angular/common';
import { DynamicScriptDirective } from '../../../shared/directive/dynamic-script/dynamic-script.directive';

@Component({
    selector: 'app-single-cruises',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        NgbRatingModule,
        NgbCollapseModule,
        FormsModule, NgStyle, CommonModule,
        SplanderComponent,
        GalleryNewComponent,
        ExpertReviewsComponent,
        OptionalExpertsComponent,
        ScrollButtonComponent,
        ExperiencesComponent,
        ReviewsComponent,
        SafeHtmlComponent,
        DynamicScriptDirective
    ],
    templateUrl: './single-cruises.component.html',
    styleUrls: ['./single-cruises.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})

export class SingleCruisesComponent implements OnInit, OnDestroy {
  cruis1 = true
  cruis2 = true
  type = true
  idCru: any;
  id: any;
  Deafult = `../../../../assets/imgs/7.jpg`
  desSlug: any;
  desName: any;
  cruName: any;
  cruises: any
  cruisesHotels: any;
  gallery: any;
  related_cruises: any;
  id_num: any;
  cruises_push: any;
  isReadonly = true;

  // Widget properties
  widgetId: string = '';
  isWidgetVisible = false;
  private widgetCheckInterval?: number;
  private widgetObserver?: MutationObserver;
  private visibilityCheckInterval?: number;

  loading: boolean = true
  rate: number = 0;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    public _cruises: HomeserviceService,
    private active: ActivatedRoute,
    private seo: SeoService,
    private router: Router,
    private schema: SchemaInjectionService
  ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((params:ParamMap)=>{
      this.idCru=params.get('cruis')
      this.id=params.get('id')
      this.loading=true

    this._cruises.getSingleCruise(this.id,this.idCru).subscribe({

      next: (result) => {
                 //seo
                 this.seo.data.title = result.data[0].seo.title
                 this.seo.data.description =  result.data[0].seo.description
                 this.seo.data.robots =  result.data[0].seo.robots
                 this.seo.data.keywords =  result.data[0].seo.keywords
                 this.seo.data.fbDes =  result.data[0].seo.facebook_description
                 this.seo.data.fbImg =  result.data[0].seo.facebook_image
                 this.seo.data.fbTit =  result.data[0].seo.facebook_title
                 this.seo.data.twitterDes =  result.data[0].seo.twitter_description
                 this.seo.data.twitterImage =  result.data[0].seo.twitter_image
                 this.seo.data.twitterTit =  result.data[0].seo.twitter_title
                 this.seo.updateTags(this.seo.data)
                 if (result.data[0].seo.schema) {
                  this.schema.injectSchema(result.data[0].seo.schema)
                }
                 // end seo
        this.cruises = result.data[0];
        this.rate=result.data[0].rate
        this.cruises_push = result.data;
        this.cruisesHotels = result.data[0].hotels;
        this.related_cruises = result.data[0].related_cruises;
        this.id_num = result.data[0].id;
        this.gallery=result.data[0].gallery
        this.widgetId = result.data[0].btn || ''; // Get widget ID from API

        // Widget ID retrieved from API - ready for use

        this.loading=false

        this._cruises.getTravelCruises(this.id).subscribe(result => {
          this.desName = result.data.destination[0].name;
          let idName = result.data.destination[0].id;
          this._cruises.getOneDestinationDetails(idName).subscribe(res => {
          this.cruName = res.data[0].categories[3].name
        })
      })

      },
      error: () => {
         this.router.navigate(['/404']);
      },
     });
      })
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getSafeContent(content: string, maxLength?: number): string {
    if (!this.isBrowser || !content) {
      return '';
    }
    const stringContent = String(content);
    return maxLength ? stringContent.slice(0, maxLength) : stringContent;
  }

  // Widget methods
  openWidget(): void {
    if (this.isBrowser && this.widgetId) {
      this.isWidgetVisible = true;
      // Prevent body scrolling and add modal class
      document.body.style.overflow = 'hidden';
      document.body.classList.add('widget-modal-open');

      // Hide any existing widgets immediately
      this.hideExistingWidgets();

      // Wait a moment for the modal to render, then move any existing widgets
      setTimeout(() => {
        this.moveExistingWidgetToModal();
      }, 100);

      // Start both interval checking and mutation observer
      this.startWidgetMonitoring();
      this.startMutationObserver();

      // Start continuous visibility check to combat CSS overrides
      this.startVisibilityCheck();
    }
  }

  private moveExistingWidgetToModal(): void {
    if (!this.isBrowser) return;

    console.log('🔍 Searching for widgets to move to modal...');

    // More comprehensive widget selectors including iframe-specific ones
    const selectors = [
      '#checkout',
      'div[data-widget]',
      'iframe[src*="ticketinghub"]',
      'iframe[src*="assets.ticketinghub.com"]',
      'iframe[allowpaymentrequest]',
      'iframe[allow*="payment"]',
      '.th-widget',
      '[id*="checkout"]',
      '[id*="ticketing"]',
      '[class*="ticketing"]',
      '[id*="th-widget"]',
      '[class*="th-widget"]',
      '[id*="th_widget"]',
      '[class*="th_widget"]',
      '[data-th-widget]'
    ];

    const modalContainer = document.getElementById('cruise-booking-widget');
    if (!modalContainer) {
      console.warn('❌ Modal container not found!');
      return;
    }

    let widgetFound = false;

    for (const selector of selectors) {
      const widgets = document.querySelectorAll(selector);
      console.log(`🔎 Selector "${selector}" found ${widgets.length} elements:`, widgets);

      widgets.forEach((widget, index) => {
        // Skip if widget is already in the modal
        if (widget.closest('#cruise-booking-widget')) {
          console.log(`⏭️ Widget ${index} already in modal, skipping`);
          return;
        }

        // Skip if it's part of the modal structure itself
        if (widget.closest('.booking-widget-overlay')) {
          console.log(`⏭️ Widget ${index} is part of modal structure, skipping`);
          return;
        }

        console.log(`✅ Found widget outside modal, moving it:`, widget);
        widgetFound = true;

        try {
          // Clear modal content and move the widget
          modalContainer.innerHTML = '';
          modalContainer.appendChild(widget);

          // Apply modal-specific styles
          this.applyModalStyles(widget as HTMLElement);

          console.log('🎉 Widget moved to modal successfully');
        } catch (error) {
          console.warn('❌ Error moving widget to modal:', error);
        }
      });
    }

    if (!widgetFound) {
      console.log('🤔 No widgets found outside modal');
      // Log all elements that might be widgets for debugging
      const allDivs = document.querySelectorAll('div');
      const suspiciousElements = Array.from(allDivs).filter(div =>
        div.innerHTML.includes('ticketing') ||
        div.innerHTML.includes('checkout') ||
        div.id.includes('checkout') ||
        div.className.includes('checkout')
      );
      console.log('🕵️ Suspicious elements that might be widgets:', suspiciousElements);
    }
  }

  private applyModalStyles(widget: HTMLElement): void {
    console.log('🎨 Applying modal styles to widget:', widget);

    // FIRST: Clear all hiding styles that were applied
    widget.style.removeProperty('display');
    widget.style.removeProperty('visibility');
    widget.style.removeProperty('opacity');
    widget.style.removeProperty('left');
    widget.style.removeProperty('top');
    widget.style.removeProperty('z-index');
    widget.style.removeProperty('pointer-events');

    // Apply proper display styles with !important to override any CSS
    widget.style.setProperty('display', 'block', 'important');
    widget.style.setProperty('visibility', 'visible', 'important');
    widget.style.setProperty('opacity', '1', 'important');
    widget.style.setProperty('position', 'relative', 'important');
    widget.style.setProperty('left', 'auto', 'important');
    widget.style.setProperty('top', 'auto', 'important');
    widget.style.setProperty('z-index', 'auto', 'important');
    widget.style.setProperty('pointer-events', 'auto', 'important');

    // Apply modal-specific styles
    widget.style.width = '100%';
    widget.style.maxWidth = '100%';
    widget.style.height = 'auto';
    widget.style.minHeight = '900px';
    widget.style.maxHeight = '90vh';
    widget.style.overflowY = 'auto';
    widget.style.overflowX = 'hidden';
    widget.style.background = 'rgba(255, 255, 255, 0)';
    // widget.style.borderRadius = '12px';
    // widget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    widget.style.margin = '0';
    widget.style.padding = '10px';

    // Handle iframes specifically
    if (widget.tagName === 'IFRAME') {
      const iframe = widget as HTMLIFrameElement;

      // Clear iframe hiding styles specifically
      iframe.style.removeProperty('display');
      iframe.style.removeProperty('visibility');
      iframe.style.removeProperty('opacity');
      iframe.style.removeProperty('left');
      iframe.style.removeProperty('top');
      iframe.style.removeProperty('z-index');
      iframe.style.removeProperty('pointer-events');

      // Apply iframe-specific styles with !important
      iframe.style.setProperty('display', 'block', 'important');
      iframe.style.setProperty('visibility', 'visible', 'important');
      iframe.style.setProperty('opacity', '1', 'important');
      iframe.style.setProperty('position', 'relative', 'important');
      iframe.style.setProperty('left', 'auto', 'important');
      iframe.style.setProperty('top', 'auto', 'important');
      iframe.style.setProperty('z-index', 'auto', 'important');
      iframe.style.setProperty('pointer-events', 'auto', 'important');

      iframe.style.width = '100%';
      iframe.style.height = '900px';
      // iframe.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      // iframe.style.borderRadius = '12px';

      console.log('🎨 Applied iframe-specific styles');
    }

    // Apply styles to child elements
    const childElements = widget.querySelectorAll('*');
    childElements.forEach(child => {
      const childElement = child as HTMLElement;
      if (childElement.style.position === 'absolute' || childElement.style.position === 'fixed') {
        childElement.style.position = 'relative';
      }
    });

    console.log('✅ Modal styles applied successfully');
  }

  private startVisibilityCheck(): void {
    if (!this.isBrowser) return;

    // Force visibility check every 500ms to combat CSS overrides
    this.visibilityCheckInterval = window.setInterval(() => {
      const modalContainer = document.getElementById('cruise-booking-widget');
      if (!modalContainer) return;

      const iframe = modalContainer.querySelector('iframe[src*="ticketinghub"]') as HTMLIFrameElement;
      if (iframe) {
        // Force visibility if it's been hidden by CSS
        const computedStyle = window.getComputedStyle(iframe);
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
          console.log('🔄 Widget hidden by CSS, forcing visibility...');
          this.forceIframeVisibility(iframe);
        }
      }
    }, 500);
  }

  private forceIframeVisibility(iframe: HTMLIFrameElement): void {
    // Remove all hiding properties
    iframe.style.removeProperty('display');
    iframe.style.removeProperty('visibility');
    iframe.style.removeProperty('opacity');
    iframe.style.removeProperty('left');
    iframe.style.removeProperty('top');
    iframe.style.removeProperty('z-index');
    iframe.style.removeProperty('pointer-events');
    iframe.style.removeProperty('height');
    iframe.style.removeProperty('width');
    iframe.style.removeProperty('max-height');
    iframe.style.removeProperty('max-width');
    iframe.style.removeProperty('overflow');
    iframe.style.removeProperty('position');

    // Force visible styles with !important
    iframe.style.setProperty('display', 'block', 'important');
    iframe.style.setProperty('visibility', 'visible', 'important');
    iframe.style.setProperty('opacity', '1', 'important');
    iframe.style.setProperty('position', 'relative', 'important');
    iframe.style.setProperty('left', 'auto', 'important');
    iframe.style.setProperty('top', 'auto', 'important');
    iframe.style.setProperty('z-index', 'auto', 'important');
    iframe.style.setProperty('pointer-events', 'auto', 'important');
    iframe.style.setProperty('width', '100%', 'important');
    iframe.style.setProperty('height', '900px', 'important');
    iframe.style.setProperty('max-width', '100%', 'important');
    iframe.style.setProperty('max-height', '70vh', 'important');
    iframe.style.setProperty('overflow', 'auto', 'important');

    console.log('✅ Forced iframe visibility');
  }

  private stopVisibilityCheck(): void {
    if (this.visibilityCheckInterval) {
      clearInterval(this.visibilityCheckInterval);
      this.visibilityCheckInterval = undefined;
    }
  }

  closeWidget(): void {
    if (this.isBrowser) {
      this.isWidgetVisible = false;
      // Restore body scrolling and remove modal class
      document.body.style.overflow = 'auto';
      document.body.classList.remove('widget-modal-open');
      // Stop widget monitoring
      this.stopWidgetMonitoring();
      this.stopMutationObserver();
      this.stopVisibilityCheck();
    }
  }

  onWidgetBackdropClick(event: Event): void {
    // Close widget when clicking on backdrop
    if (event.target === event.currentTarget) {
      this.closeWidget();
    }
  }

    private startWidgetMonitoring(): void {
    if (!this.isBrowser) return;

    // Check for widgets every 250ms for up to 15 seconds (more frequent and longer)
    let checkCount = 0;
    const maxChecks = 60; // 15 seconds

    this.widgetCheckInterval = window.setInterval(() => {
      checkCount++;

      // Specifically look for TicketingHub iframes in problematic locations
      this.checkForProblematicIframes();

      // Check if we found and moved a widget
      const modalContainer = document.getElementById('cruise-booking-widget');
      const hasWidgetInModal = modalContainer && modalContainer.children.length > 0;

      if (hasWidgetInModal || checkCount >= maxChecks) {
        this.stopWidgetMonitoring();
        return;
      }

      // Try to move any widgets that appeared
      this.moveExistingWidgetToModal();
    }, 250); // More frequent checks
  }

  private checkForProblematicIframes(): void {
    // Check for iframes specifically under footer or body
    const problematicSelectors = [
      'app-footer iframe[src*="ticketinghub"]',
      'footer iframe[src*="ticketinghub"]',
      'body > iframe[src*="ticketinghub"]',
      'app-footer iframe[src*="assets.ticketinghub.com"]',
      'footer iframe[src*="assets.ticketinghub.com"]',
      'body > iframe[src*="assets.ticketinghub.com"]',
      'iframe[allowpaymentrequest]',
      'iframe[allow*="payment"]'
    ];

    problematicSelectors.forEach(selector => {
      const iframes = document.querySelectorAll(selector);
      if (iframes.length > 0) {
        console.log(`🚨 Found problematic iframe with selector: ${selector}`, iframes);
        iframes.forEach(iframe => {
          // Hide it immediately
          (iframe as HTMLElement).style.setProperty('display', 'none', 'important');
          // Try to move it
          this.moveSpecificElementToModal(iframe);
        });
      }
    });
  }

  private stopWidgetMonitoring(): void {
    if (this.widgetCheckInterval) {
      clearInterval(this.widgetCheckInterval);
      this.widgetCheckInterval = undefined;
    }
  }

  private hideExistingWidgets(): void {
    if (!this.isBrowser) return;

    // Immediately hide any widgets that might already exist
    const selectors = [
      '#checkout',
      'div[data-widget]',
      'iframe[src*="ticketinghub"]',
      '.th-widget',
      '[id*="checkout"]',
      '[id*="ticketing"]',
      '[class*="ticketing"]'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (!element.closest('#cruise-booking-widget')) {
          (element as HTMLElement).style.display = 'none';
          (element as HTMLElement).style.visibility = 'hidden';
          (element as HTMLElement).style.position = 'fixed';
          (element as HTMLElement).style.left = '-99999px';
          (element as HTMLElement).style.top = '-99999px';
        }
      });
    });
  }

    private startMutationObserver(): void {
    if (!this.isBrowser) return;

    this.widgetObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            // Check if this is a TicketingHub iframe specifically
            const isTicketingHubIframe = element.tagName === 'IFRAME' &&
                                       (element as HTMLIFrameElement).src?.includes('ticketinghub');

            // Check if this is any other TicketingHub widget
            const isWidget = element.id === 'checkout' ||
                           element.id?.includes('checkout') ||
                           element.id?.includes('ticketing') ||
                           element.querySelector('#checkout') ||
                           element.querySelector('iframe[src*="ticketinghub"]') ||
                           (element as HTMLElement).dataset?.['widget'];

            if (isTicketingHubIframe || isWidget) {
              console.log('🚨 MutationObserver detected TicketingHub element:', element);
              console.log('🚨 Element details:', {
                tagName: element.tagName,
                id: element.id,
                className: element.className,
                src: (element as any).src,
                parent: element.parentElement?.tagName
              });

              // Hide it immediately and more aggressively
              const htmlElement = element as HTMLElement;
              htmlElement.style.setProperty('display', 'none', 'important');
              htmlElement.style.setProperty('visibility', 'hidden', 'important');
              htmlElement.style.setProperty('position', 'fixed', 'important');
              htmlElement.style.setProperty('left', '-99999px', 'important');
              htmlElement.style.setProperty('top', '-99999px', 'important');
              htmlElement.style.setProperty('z-index', '-9999', 'important');

              // Try to move it to modal immediately and also after delays
              this.moveSpecificElementToModal(element);
              setTimeout(() => {
                this.moveSpecificElementToModal(element);
              }, 50);
              setTimeout(() => {
                this.moveExistingWidgetToModal();
              }, 100);
            }
          }
        });
      });
    });

    this.widgetObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'data-widget']
    });
  }

  private stopMutationObserver(): void {
    if (this.widgetObserver) {
      this.widgetObserver.disconnect();
      this.widgetObserver = undefined;
    }
  }

  private moveSpecificElementToModal(element: Element): void {
    if (!this.isBrowser) return;

    const modalContainer = document.getElementById('cruise-booking-widget');
    if (!modalContainer) {
      console.warn('❌ Modal container not found for specific element move');
      return;
    }

    // Skip if element is already in the modal
    if (element.closest('#cruise-booking-widget')) {
      console.log('⏭️ Element already in modal, skipping specific move');
      return;
    }

    // Skip if it's part of the modal structure itself
    if (element.closest('.booking-widget-overlay')) {
      console.log('⏭️ Element is part of modal structure, skipping specific move');
      return;
    }

    console.log('🎯 Moving specific element to modal:', element);

    try {
      // Clear modal content and move the element
      modalContainer.innerHTML = '';
      modalContainer.appendChild(element);

      // Apply modal-specific styles
      this.applyModalStyles(element as HTMLElement);

      console.log('🎉 Specific element moved to modal successfully');
    } catch (error) {
      console.warn('❌ Error moving specific element to modal:', error);
    }
  }

  // Simplified widget management - no complex observers needed

  ngOnDestroy(): void {
    // Cleanup when component is destroyed
    if (this.isBrowser && this.isWidgetVisible) {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('widget-modal-open');
    }
    // Clean up widget monitoring
    this.stopWidgetMonitoring();
    this.stopMutationObserver();
  }
  }
