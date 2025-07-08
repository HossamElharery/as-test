import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function languageValidator(lang: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let pattern: RegExp = lang === 'ar' ? /^[\u0621-\u064A\u0660-\u06690-9_ ,\s()\.'\/|\\_+\-]+$/ : /^[a-zA-Z\u0660-\u06690-9_\s()+.,'\/|\\\-][a-zA-Z\u0660-\u06690-9_\s()+.,'\/|\\\-]*$/u;
    const allowed = pattern.test(control.value);
    return control.value && !allowed ? { 'invalidInput': true } : null;
  };
}
