import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appMultiContent]',
  standalone: true
})
export class MultiContentDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
