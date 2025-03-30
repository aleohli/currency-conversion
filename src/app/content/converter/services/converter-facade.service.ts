import { inject, Injectable } from '@angular/core';
import { ConverterService } from './converter.service';
import { Currency, CurrencyResponse } from '../models/currrency';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  pipe,
  withLatestFrom,
} from 'rxjs';
import { ConverterData } from '../models/converter';

@Injectable()
export class ConverterFacadeService {
  private converterService = inject(ConverterService);
  private currencies = new BehaviorSubject<Currency[]>([]);
  private currenciesLoading = new BehaviorSubject<boolean>(false);
  private value = new BehaviorSubject<number | null>(null);
  private valueLoading = new BehaviorSubject<boolean>(false);

  currencies$ = this.currencies.asObservable();
  currenciesLoading$ = this.currenciesLoading.asObservable();
  value$ = this.value.asObservable();
  valueLoading$ = this.valueLoading.asObservable();

  // Better error handling could be done, e.g. common approach in interceptor to show an error toast
  loadCurrencies(): void {
    this.currenciesLoading.next(true);
    this.converterService
      .getCurrencies()
      .pipe(
        catchError(() => of([])),
        map((response) => this.mapToNonNullCurrencies(response))
      )
      .subscribe((currencies) => {
        this.currencies.next(currencies);
        this.currenciesLoading.next(false);
      });
  }

  private mapToNonNullCurrencies(
    currencyResponse: CurrencyResponse
  ): Currency[] {
    return Object.values(currencyResponse).filter(
      ({ short_code }) => !!short_code
    );
  }

  convert(converterData: ConverterData): void {
    this.valueLoading.next(true);
    this.converterService
      .convert(converterData)
      .pipe(
        catchError(() => of({ value: null })),
        map(({ value }) => value)
      )
      .subscribe((value) => {
        this.value.next(value);
        this.valueLoading.next(false);
      });
  }

  get currenciesLoadingFailed$(): Observable<boolean> {
    return this.currenciesLoading$.pipe(
      withLatestFrom(this.currencies$),
      pipe(map(([loading, currencies]) => !loading && !currencies?.length))
    );
  }
}
