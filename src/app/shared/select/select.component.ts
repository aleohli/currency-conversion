import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormFieldBaseDirective } from 'app/shared/form-field-base/form-field-base.directive';

@Component({
  selector: 'app-select',
  imports: [NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent extends FormFieldBaseDirective<string> {
  @Input() options: string[];

  onChange({ target: { value } }: any ): void {
    this.value = value;
    this._onChange(this.value);
    this._onTouched();
  }

  onBlur(): void {
    this._onTouched();
  }
}
