import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-core',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent {}
