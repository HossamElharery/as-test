import { FormControl } from '@angular/forms';
import { languageValidator } from './language-validator.directive';

describe('languageValidator', () => {
  it('should validate Arabic input', () => {
    const arabicValidatorFn = languageValidator('ar');

    const validArabicControl = new FormControl('مرحبا بالعالم');
    const invalidArabicControl = new FormControl('Hello World');

    expect(arabicValidatorFn(validArabicControl)).toBeNull();
    expect(arabicValidatorFn(invalidArabicControl)).toEqual({ 'invalidInput': true });
  });

  it('should validate English input', () => {
    const englishValidatorFn = languageValidator('en');

    const validEnglishControl = new FormControl('Hello World');
    const invalidEnglishControl = new FormControl('مرحبا بالعالم');

    expect(englishValidatorFn(validEnglishControl)).toBeNull();
    expect(englishValidatorFn(invalidEnglishControl)).toEqual({ 'invalidInput': true });
  });
});
