import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ConverterFormComponent } from './converter-form/converter-form.component';
import { ConverterFacadeService } from '../services/converter-facade.service';
import { Currency } from '../models/currrency';
import { ConverterService } from '../services/converter.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConverterData } from '../models/converter';

@Component({
  selector: 'app-converter',
  imports: [ConverterFormComponent],
  providers: [ConverterFacadeService, ConverterService],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  private converterFacadeService = inject(ConverterFacadeService);
  private destroyRef = inject(DestroyRef);

  currencies: Currency[];
  value: number | null;
  targetCurrency:  string;
  loading: boolean = true;
  valueLoading: boolean;

  // Better state management could be introduced - subjects, ngrx component store or ngrx (for more complex app)
  ngOnInit(): void {
    this.converterFacadeService
      .loadCurrencies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currencies) => {
        this.currencies = currencies;
        this.loading = false;
      });
  }

  // Same as above
  convert(converterData: ConverterData): void {
    this.valueLoading = true;
    this.targetCurrency = converterData.to;
    this.converterFacadeService
      .convert(converterData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.value = value;
        this.valueLoading = false;
      });
  }

  get loadingFailed(): boolean {
    return !this.loading && !this.currencies?.length;
  }

  get valueInfo(): string {
    return this.valueLoading
      ? 'Loading...'
      : this.value
        ? `Result: ${this.value} ${this.targetCurrency}.`
        : 'Currently there is no value converted.';
  }
}
