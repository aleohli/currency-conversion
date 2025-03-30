import { inject, Injectable } from '@angular/core';
import { ConverterService } from './converter.service';
import { Currency, CurrencyResponse } from '../models/currrency';
import { catchError, map, Observable, of } from 'rxjs';
import { ConverterData } from '../models/converter';

@Injectable()
export class ConverterFacadeService {
  private converterService = inject(ConverterService);

  // Better error handling could be done, e.g. common approach in interceptor to show an error toast
  loadCurrencies(): Observable<Currency[]> {
    return this.converterService.getCurrencies().pipe(
      catchError(() => of([])),
      map((response) => this.mapToNonNullCurrencies(response)),
    );
  }

  private mapToNonNullCurrencies(
    currencyResponse: CurrencyResponse,
  ): Currency[] {
    return Object.values(currencyResponse).filter(
      ({ short_code }) => !!short_code,
    );
  }

  convert(converterData: ConverterData): Observable<number | null> {
    return this.converterService.convert(converterData).pipe(
      catchError(() => of({ value: null })),
      map(({ value }) => value),
    );
  }
}
