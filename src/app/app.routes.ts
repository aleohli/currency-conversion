import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'converter',
    loadComponent: () =>
      import('./content/converter/components/converter.component').then(
        (mod) => mod.ConverterComponent,
      )
  },
  // Would be nice to have a wildcard path handling
  // { path: '**', component: PageNotFoundComponent }
];
