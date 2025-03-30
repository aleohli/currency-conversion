import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from 'app/shared/input/input.component';
import { SelectComponent } from 'app/shared/select/select.component';
import { ConverterData, ConverterForm } from '../../models/converter';
import {
  commonValidationMessages,
  ValidationMessages,
} from 'app/shared/form-field-base/validation-messages';
import { Currency } from 'app/content/converter/models/currrency';

@Component({
  selector: 'app-converter-form',
  imports: [InputComponent, SelectComponent, ReactiveFormsModule],
  templateUrl: './converter-form.component.html',
  styleUrl: './converter-form.component.scss',
})
export class ConverterFormComponent implements OnInit {
  @Input() currencies: Currency[] | null;
  @Output() formSubmit = new EventEmitter<ConverterData>();

  form: FormGroup<ConverterForm>;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    // Custom validator for from !== to could be added
    this.form = this.fb.nonNullable.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  get validationMessages(): ValidationMessages {
    const { required } = commonValidationMessages;
    return { required };
  }

  get options(): string[] {
    return this.currencies?.map(({ short_code }) => short_code) || [];
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    this.formSubmit.emit(formValue);
  }
}
