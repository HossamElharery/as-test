import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function whiteSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.trim() === '') {
      return { 'required': true };
    }
    return null;
  };
}
