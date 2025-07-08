import { FormControl } from '@angular/forms';
import { whiteSpacesValidator } from './white-spaces-validator.directive';

describe('whiteSpacesValidator', () => {
  it('should return null if control value is not only white spaces', () => {
    const control = new FormControl('valid input');
    const validatorFn = whiteSpacesValidator();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return a validation error if control value is only white spaces', () => {
    const control = new FormControl('    ');
    const validatorFn = whiteSpacesValidator();
    const result = validatorFn(control);
    expect(result).toEqual({ 'required': true });
  });

  it('should return null if control value is null or undefined', () => {
    const control = new FormControl(null);
    const validatorFn = whiteSpacesValidator();
    const result = validatorFn(control);
    expect(result).toBeNull();

    const controlUndefined = new FormControl(undefined);
    const resultUndefined = validatorFn(controlUndefined);
    expect(resultUndefined).toBeNull();
  });

});
