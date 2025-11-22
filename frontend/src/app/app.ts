
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmissionsService, AnnualEmission } from './services/emissions.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Emissions</h2>
    <ul>
      @for (e of emissions$ | async; track e.id) {
      <li>{{ e.year }} — {{ e.emissions }}</li>
      }
    </ul>
  `,
})
export class App {
  emissions$!: Observable<AnnualEmission[]>;

  constructor(private emissionsService: EmissionsService) {
    this.emissions$ = this.emissionsService.list();
  }
}
