import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlockInvalidChars]',
  standalone: true
})
export class BlockInvalidCharsDirective {

  @Input() invalidKeys: string[] = [];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

}
