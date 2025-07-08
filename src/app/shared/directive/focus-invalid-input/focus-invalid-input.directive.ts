import { Directive, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Directive({
  selector: '[appFocusInvalidInput]',
  standalone: true
})
export class FocusInvalidInputDirective {

  constructor() { }

  // * To listen to the submit event on our form element,
  @HostListener('click')
  onFormSubmit() {
    setTimeout(() => {
      const invalidControl = document.querySelector('form .ng-touched.ng-invalid');
      if (invalidControl) {
        this.scrollToFirstInvalidControl();
      }
    }, 50);
  }

  // * to get a list of invalid inputs. If there are any invalid elements,
  // *  we can then focus the first one in the list.
  private scrollToFirstInvalidControl() {
    let firstInvalidControl: HTMLElement = document.querySelector("form .ng-touched.ng-invalid")!;
    let tabsHead: any;
    let top: number = 0;
    if (firstInvalidControl.getAttribute('formControlName')?.includes('Ar') || firstInvalidControl.getAttribute('formControlName')?.includes('En')) {
      tabsHead = firstInvalidControl.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
      top = this.getTopOffset(tabsHead) - 20;
    } else {
      top = this.getTopOffset(firstInvalidControl) - 75
    }
    
    //  method scrolls the window to a first Invalid Control place in the document.
    window.scroll({
      top,
      left: 0,
      behavior: "smooth"
    });

    //  To listen to the window scroll event then focus the first on in the list
    fromEvent(window, "scroll")
      .pipe(
        debounceTime(100),
        take(1)
      )
      .subscribe(() => firstInvalidControl.focus());
  }

  /**
   *  to get an HTML element position.
   * @param controlEl
   * @returns
  */
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }

}
