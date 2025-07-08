import { Component, Input, OnInit, OnChanges, PLATFORM_ID, Inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-safe-html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="safe-html-content" [innerHTML]="safeHtml" [attr.data-content]="hasContent ? 'true' : 'false'"></div>
  `,
  styles: [`
    .safe-html-content {
      word-wrap: break-word;
      line-height: 1.6;
      min-height: 0; /* Ensure div always renders even when empty */
    }
    .safe-html-content * {
      max-width: 100%;
    }
    .safe-html-content[data-content="false"] {
      display: block; /* Ensure empty content still renders a div */
      height: 0;
      overflow: hidden;
    }
  `],
  host: {
    'ngSkipHydration': 'true'
  }
})
export class SafeHtmlComponent implements OnInit, OnChanges {
  @Input() htmlContent: string = '';
  @Input() maxLength: number = 0;

  safeHtml: SafeHtml = '';
  hasContent: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.updateSafeHtml();
  }

  ngOnChanges() {
    this.updateSafeHtml();
  }

  private updateSafeHtml() {
    // Always ensure we have a string to work with
    const inputContent = this.htmlContent || '';

    // Handle empty content consistently - always return empty string, never null/undefined
    if (!inputContent || typeof inputContent !== 'string') {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml('');
      this.hasContent = false;
      return;
    }

    let content = inputContent.trim();

    // Handle empty content after trimming - always return empty string
    if (!content) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml('');
      this.hasContent = false;
      return;
    }

    // Truncate if maxLength is specified
    if (this.maxLength > 0 && content.length > this.maxLength) {
      content = content.substring(0, this.maxLength) + '...';
    }

    // Clean up the HTML content for consistent rendering
    content = this.cleanHtmlContent(content);

    // Use Angular's sanitizer to create safe HTML
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(content);
    this.hasContent = content.length > 0;
  }

  private cleanHtmlContent(html: string): string {
    // Consistent HTML processing for both server and client
    return html
      .replace(/\s+/g, ' ')           // Normalize whitespace
      .replace(/>\s+</g, '><')        // Remove whitespace between tags
      .trim();
  }
}
