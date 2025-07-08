import { Directive, ElementRef, Input, PLATFORM_ID, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[hydrationSafeHtml]',
  standalone: true
})
export class HydrationSafeHtmlDirective implements OnChanges {
  @Input() hydrationSafeHtml: string | SafeHtml = '';

  constructor(
    private el: ElementRef,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hydrationSafeHtml']) {
      this.updateContent();
    }
  }

  private updateContent(): void {
    if (!this.hydrationSafeHtml) {
      this.el.nativeElement.innerHTML = '';
      return;
    }

    // For SSR, we need to ensure consistent rendering
    if (isPlatformBrowser(this.platformId)) {
      // Client-side: Use Angular's sanitizer for security
      const sanitizedHtml = typeof this.hydrationSafeHtml === 'string'
        ? this.sanitizer.sanitize(1, this.hydrationSafeHtml) // 1 = SecurityContext.HTML
        : this.hydrationSafeHtml;

      this.el.nativeElement.innerHTML = sanitizedHtml || '';
    } else {
      // Server-side: Use simple text content to avoid hydration mismatch
      const textContent = this.extractTextContent(this.hydrationSafeHtml.toString());
      this.el.nativeElement.textContent = textContent;
    }
  }

  private extractTextContent(html: string): string {
    // Simple HTML tag removal for SSR consistency
    return html
      .replace(/<[^>]*>/g, ' ')  // Remove HTML tags
      .replace(/\s+/g, ' ')      // Normalize whitespace
      .trim()
      .substring(0, 200) + (html.length > 200 ? '...' : ''); // Truncate for performance
  }
}
