import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreComponent } from './core/components/core.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
