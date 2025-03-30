import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormFieldBaseDirective } from 'app/shared/form-field-base/form-field-base.directive';

@Component({
  selector: 'app-input',
  imports: [NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent extends FormFieldBaseDirective<string> {
  @Input() type: 'text' | 'number' = 'text';

  onInput({ target: { value } }: any ): void {
    this.value = value;
    this._onChange(this.value);
  }

  onBlur(): void {
    this._onTouched();
  }
}
