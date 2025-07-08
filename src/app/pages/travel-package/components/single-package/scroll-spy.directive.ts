import { Directive, Injectable, Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
    @Input() public spiedTags :any[]= [];
    @Output() public sectionChange = new EventEmitter<string>();
    private currentSection: any;
    currentSectionn: any
    constructor(private _el: ElementRef) {}

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {

        const children = this._el.nativeElement.children;
        const scrollTop = event.target.scrollTop;
        const parentOffset = event.target.offsetTop;
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
                if ((element.offsetTop - parentOffset) <= scrollTop) {
                    this.currentSectionn = element.id;
                }
            }
        }
        if (this.currentSectionn !== this.currentSection) {
            this.currentSection = this.currentSectionn;
            this.sectionChange.emit(this.currentSection);
        }
    }

}
