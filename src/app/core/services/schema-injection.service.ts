// import { DOCUMENT } from '@angular/common';
// import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

// export class SchemaInjectionService {
//   private renderer!: Renderer2;

//   constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private dom: any){
//     this.renderer = rendererFactory.createRenderer(null, null);
//   }
//   injectSchema(schema: any): void {
//     const head = document.head;

//     // Remove old schema scripts if any
//     this.removeOldSchemaScripts();

//     // Create a script element
//     // const script = document.createElement('script');
//     // script.type = 'application/ld+json';

//     // Check the type of the schema and set innerHTML accordingly
//     // if (typeof schema === 'string') {
//     //   script.innerHTML = schema;
//     // } else {
//     //   script.innerHTML = JSON.stringify(schema, null, 2);
//     // }
//     // script.innerHTML = JSON.stringify(schema, null, 2);
//     let schemas = this.renderer.createElement('script');
//     schemas.type = 'application/ld+json'
//     schemas.text = schema;
//     // Find the last <meta> tag you want to insert after
//     const referenceMetaTag = this.dom.querySelector('meta[name="keywords"]');

//     // Insert the script after the referenceMetaTag
//     if (referenceMetaTag) {

//      let schematag =  this.renderer.nextSibling(referenceMetaTag)
//       this.renderer.insertBefore(this.dom.head, schemas , schematag)

//     } else {
//       // Fallback: just append it to the head

//       this.renderer.appendChild(this.dom.head, schemas);

//     }

//     // new
//     // this.renderer.appendChild(this.dom.head, schemas);

//   }

//   private removeOldSchemaScripts(): void {
//     const oldScripts = document.querySelectorAll('head script[type="application/ld+json"]');
//     oldScripts.forEach(script => script.remove());
//   }
// }

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaInjectionService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private dom: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  injectSchema(schema: any): void {
    // Remove old schema scripts if any
    this.removeOldSchemaScripts();

    const schemas = this.renderer.createElement('script');
    schemas.type = 'application/ld+json';
    schemas.text = schema;
    schemas.setAttribute('id', 'schema')

    // Find the last <meta> tag you want to insert after
    const referenceMetaTag = this.dom.querySelector('meta[name="keywords"]');

    // Insert the script after the referenceMetaTag
    if (referenceMetaTag) {
      const nextSibling = this.renderer.nextSibling(referenceMetaTag);
      this.renderer.insertBefore(this.dom.head, schemas, nextSibling);
    } else {
      // Fallback: just append it to the head
      this.renderer.appendChild(this.dom.head, schemas);
    }
  }

  private removeOldSchemaScripts(): void {
    const oldScripts = this.dom.querySelectorAll('head script[id="schema"]');
    oldScripts.forEach(script => this.renderer.removeChild(this.dom.head, script));
  }
}
