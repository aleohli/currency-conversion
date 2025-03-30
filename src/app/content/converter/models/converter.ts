import { FormControl } from '@angular/forms';

export interface ConverterData {
  from: string;
  to: string;
  amount: string;
}

export interface ConverterForm {
  from: FormControl<string>;
  to: FormControl<string>;
  amount: FormControl<string>;
}

export interface ConverterResponse {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}
