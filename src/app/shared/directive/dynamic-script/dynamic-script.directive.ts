import {
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appDynamicScript]',
  standalone: true
})
export class DynamicScriptDirective implements AfterViewInit, OnDestroy {
  private scriptElement: HTMLScriptElement | null = null;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadScript();
    }
  }

  private loadScript(): void {
    // Find div elements with src and data-widget attributes within this directive's element
    const widgetDivs = this.el.nativeElement.querySelectorAll('div[src][data-widget]');

    widgetDivs.forEach((widgetDiv: HTMLElement) => {
      const scriptSrc = widgetDiv.getAttribute('src');
      const dataWidget = widgetDiv.getAttribute('data-widget');

      if (scriptSrc && dataWidget) {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

        if (!existingScript) {
          // Create and load script
          this.scriptElement = this.renderer.createElement('script');
          this.renderer.setAttribute(this.scriptElement, 'src', scriptSrc);
          this.renderer.setAttribute(this.scriptElement, 'type', 'text/javascript');
          this.renderer.setAttribute(this.scriptElement, 'async', 'true');
          this.renderer.setAttribute(this.scriptElement, 'data-widget', dataWidget);

          // Add error handling
          this.renderer.listen(this.scriptElement, 'error', () => {
            console.error('Failed to load script:', scriptSrc);
          });

          // Add load success handling
          this.renderer.listen(this.scriptElement, 'load', () => {
            console.log('Script loaded successfully:', scriptSrc);
          });

          // Append script to document head
          this.renderer.appendChild(document.head, this.scriptElement);
        } else {
          console.log('Script already loaded, skipping duplicate load');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.scriptElement) {
      // Remove script from head when component is destroyed
      try {
        if (this.scriptElement.parentNode) {
          this.renderer.removeChild(document.head, this.scriptElement);
        }
      } catch (error) {
        console.warn('Error removing script:', error);
      }
    }
  }
}
