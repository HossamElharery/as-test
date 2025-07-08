import { AuthorizeDirective } from './authorize.directive';
import { ElementRef } from '@angular/core';

describe('AuthorizeDirective', () => {
  let mockElementRef: ElementRef;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement('div'));
  });

  it('should create an instance', () => {
    const directive = new AuthorizeDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});