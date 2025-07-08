import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogSchemaInjectionService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private dom: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  injectSchema(schema: any): void {
    // Remove old schema scripts if any
    this.removeOldSchemaScripts();

    const blogSchemaScript = this.renderer.createElement('script');
    blogSchemaScript.type = 'application/ld+json';
    blogSchemaScript.text = JSON.stringify(schema); // Ensure schema is a valid JSON string
    blogSchemaScript.setAttribute('id', 'blogSchema');

    // Find the last <meta> tag you want to insert after
    const referenceMetaTag = this.dom.querySelector('meta[name="keywords"]');

    // Insert the script after the referenceMetaTag
    if (referenceMetaTag) {
      const nextSibling = this.renderer.nextSibling(referenceMetaTag);
      this.renderer.insertBefore(this.dom.head, blogSchemaScript, nextSibling);
    } else {
      // Fallback: just append it to the head
      this.renderer.appendChild(this.dom.head, blogSchemaScript);
    }
  }

   removeOldSchemaScripts(): void {
    const oldScripts = this.dom.querySelectorAll('head script[id="blogSchema"]');
    oldScripts.forEach(script => this.renderer.removeChild(this.dom.head, script));
  }
}
