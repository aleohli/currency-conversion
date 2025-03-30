import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConverterData, ConverterResponse } from '../models/converter';

@Injectable()
export class ConverterService {
  private currenciesUrl = 'currencies';
  private convertUrl = 'convert';

  private http = inject(HttpClient);

  getCurrencies(): Observable<any> {
    return this.http.get(this.currenciesUrl);
  }

  convert(converterData: ConverterData): Observable<ConverterResponse> {
    const params = new HttpParams()
      .set('from', converterData.from)
      .set('to', converterData.to)
      .set('amount', converterData.amount);

    return this.http.get<ConverterResponse>(this.convertUrl, {
      params,
    });
  }
}
