
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-explorer-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './explorer-filters.component.html',
})
export class ExplorerFiltersComponent {
  @Input() filters!: FormGroup;
  @Input() years: number[] = [];
  @Input() emissionTypes: string[] = [];
  @Input() countries: string[] = [];
  @Input() activities: string[] = [];
}
