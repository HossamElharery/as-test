import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CacheService } from '../../../core/services/cache/cache.service';

@Directive({
  selector: '[authorize]',
  standalone: true
})
export class AuthorizeDirective implements OnInit {

  @Input() authorize: string = '';

  constructor(
    private elRef: ElementRef,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    const permissions: string[] = this.cacheService.getItem('permissions') as any[];
    if (!permissions?.find((f) => f.trim() === this.authorize.trim())) {
      this.elRef.nativeElement.parentElement.removeChild(
        this.elRef.nativeElement
      );
    }
  }

}
