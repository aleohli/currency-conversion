import { Component, inject, OnInit } from '@angular/core';
import { ConverterFormComponent } from './converter-form/converter-form.component';
import { ConverterFacadeService } from '../services/converter-facade.service';
import { ConverterService } from '../services/converter.service';
import { ConverterData } from '../models/converter';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Currency } from '../models/currrency';

@Component({
  selector: 'app-converter',
  imports: [ConverterFormComponent, AsyncPipe],
  providers: [ConverterFacadeService, ConverterService],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  private converterFacadeService = inject(ConverterFacadeService);
  targetCurrency: string;

  // State management could be improved with the usage of e.g. ngrx
  ngOnInit(): void {
    this.converterFacadeService.loadCurrencies();
  }

  // Same as above
  convert(converterData: ConverterData): void {
    this.targetCurrency = converterData.to;
    this.converterFacadeService.convert(converterData);
  }

  get currenciesLoading$(): Observable<boolean> {
    return this.converterFacadeService.currenciesLoading$;
  }

  get currenciesLoadingFailed$(): Observable<boolean> {
    return this.converterFacadeService.currenciesLoadingFailed$;
  }

  get currencies$(): Observable<Currency[]> {
    return this.converterFacadeService.currencies$;
  }

  get valueLoading$(): Observable<boolean> {
    return this.converterFacadeService.valueLoading$;
  }

  get value$(): Observable<number | null> {
    return this.converterFacadeService.value$;
  }
}
