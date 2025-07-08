import { MultiContentDirective } from './multi-content.directive';
import { TemplateRef } from '@angular/core';

describe('MultiContentDirective', () => {
  let mockTemplateRef: TemplateRef<unknown>;

  beforeEach(() => {
    mockTemplateRef = {} as TemplateRef<unknown>;
  });

  it('should create an instance', () => {
    const directive = new MultiContentDirective(mockTemplateRef);
    expect(directive).toBeTruthy();
  });
});
