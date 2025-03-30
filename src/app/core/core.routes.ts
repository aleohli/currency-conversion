import { Routes } from '@angular/router';
import { HomeComponent } from 'app/content/home/home.component';
import { ConverterComponent } from 'app/content/converter/components/converter.component';

export const coreRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'converter',
    component: ConverterComponent,
  },
];
