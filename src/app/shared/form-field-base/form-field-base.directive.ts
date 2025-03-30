import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ValidationMessages } from './validation-messages';

@Directive()
export abstract class FormFieldBaseDirective<T> implements ControlValueAccessor  {
  @Input({ required: true }) id: string;
  @Input() label: string;
  @Input() validationMessages: ValidationMessages = {};

  constructor(@Self() @Optional() public control: NgControl) {
    if (control) {
      control.valueAccessor = this;
    }
  }

  value: T;
  disabled: boolean;
  protected _onChange = (value: T) => {};
  protected _onTouched = () => {};

  get errorMessages(): string[] {
    const errorKeys = this.control?.errors ? Object.keys(this.control.errors) : [];
    return errorKeys.map(key => this.validationMessages[key]);
  }

  get isInvalid(): boolean {
    return !!this.control.invalid && !!this.control.touched;
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
