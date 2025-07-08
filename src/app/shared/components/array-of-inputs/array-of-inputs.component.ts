
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-array-of-inputs',
    imports: [
        TranslateModule,
        ReactiveFormsModule
    ],
    templateUrl: './array-of-inputs.component.html',
    styleUrls: [
        // '../../../../assets/styles/_custom-label.scss',
        // '../../../../assets/styles/_custom-input.scss',
        './array-of-inputs.component.scss'
    ]
})
export class ArrayOfInputsComponent {

  arrayForm!: FormGroup;

  @Input() default: boolean = false;
  @Input() label: string = '';
  @Input() inputType: string = 'textarea';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.arrayForm = this.fb.group({
      dataArray: this.fb.array([])
    });
    if (this.default) {
      this.addControl();
    }
  }

  get dataArray() {
    return this.arrayForm.get('dataArray') as FormArray;
  }

  addControl(): void {
    this.dataArray.push(this.fb.control('', [Validators.required]));
  }

  removeControl(index: number): void {
    this.dataArray.removeAt(index);
  }

  removeAllControls(): void {
    this.dataArray.markAsUntouched();
    this.dataArray.clear();
  }

  removeAllValidators(): void {
    this.dataArray.controls.forEach(control => {
      control.setValidators([]);
      control.updateValueAndValidity();
    });
  }

  addAllValidators(): void {
    this.dataArray.controls.forEach(control => {
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    });
  }

}
