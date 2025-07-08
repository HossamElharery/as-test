import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockNumbers]',
  standalone: true
})
export class BlockNumbersDirective {

  @HostListener('keypress', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const newChar = parseInt(event.key);
    if (isNaN(newChar)) {
      event.preventDefault();
    }
    if (newChar < 0) {
      event.preventDefault();
    }
  }

}
