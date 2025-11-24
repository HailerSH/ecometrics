
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-compare-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compare-filters.component.html',
})
export class CompareFiltersComponent {
  @Input() filters!: FormGroup;
  @Input() countries: string[] = [];
  @Input() emissionTypes: string[] = [];
  @Input() activities: string[] = [];
  @Input() years: number[] = [];
}
