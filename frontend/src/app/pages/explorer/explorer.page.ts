
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EmissionsService } from '@services/emissions/emissions.service';

import { ExplorerFiltersComponent } from '@components/explorer/explorer-filters/explorer-filters.component';
import { ExplorerGridComponent } from '@components/explorer/explorer-grid/explorer-grid.component';
import { ExplorerPaginatorComponent } from '@components/explorer/explorer-paginator/explorer-paginator.component';
import { AnnualEmission } from '@models/annual-emission.model';


@Component({
  selector: 'app-explorer-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExplorerFiltersComponent,
    ExplorerGridComponent,
    ExplorerPaginatorComponent,
  ],
  templateUrl: './explorer.page.html',
})
export class ExplorerPageComponent implements OnInit {
  filters = new FormGroup({
    yearFrom: new FormControl<number | null>(null),
    yearTo: new FormControl<number | null>(null),
    emission_type: new FormControl<string | null>(null),
    country: new FormControl<string | null>(null),
    activity: new FormControl<string | null>(null),
  });

  allEmissions: AnnualEmission[] = [];
  filteredEmissions: AnnualEmission[] = [];

  years: number[] = [];
  emissionTypes: string[] = [];
  countries: string[] = [];
  activities: string[] = [];

  pageSize = 9;
  currentPage = 1;

  constructor(private emissionsService: EmissionsService) {}

  ngOnInit(): void {
    this.emissionsService.list().subscribe((data) => {
      this.allEmissions = data;
      this.initFilters();
      this.applyFilters();
    });

    this.filters.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.applyFilters();
    });
  }

  private initFilters() {
    const years = new Set<number>();
    const types = new Set<string>();
    const countries = new Set<string>();
    const activities = new Set<string>();

    this.allEmissions.forEach((e) => {
      years.add(e.year);
      types.add(e.emission_type);
      countries.add(e.country);
      activities.add(e.activity);
    });

    this.years = Array.from(years).sort((a, b) => a - b);
    this.emissionTypes = Array.from(types).sort();
    this.countries = Array.from(countries).sort();
    this.activities = Array.from(activities).sort();

    if (this.years.length) {
      this.filters.patchValue(
        {
          yearFrom: this.years[0],
          yearTo: this.years[this.years.length - 1],
        },
        { emitEvent: false }
      );
    }
  }

  private applyFilters() {
    const { yearFrom, yearTo, emission_type, country, activity } = this.filters.value;

    this.filteredEmissions = this.allEmissions.filter((e) => {
      const okYearFrom = yearFrom == null || e.year >= yearFrom;
      const okYearTo = yearTo == null || e.year <= yearTo;
      const okType = !emission_type || e.emission_type === emission_type;
      const okCountry = !country || e.country === country;
      const okActivity = !activity || e.activity === activity;
      return okYearFrom && okYearTo && okType && okCountry && okActivity;
    });
  }

  // pagination helpers
  get totalPages(): number {
    if (!this.filteredEmissions.length) return 1;
    return Math.ceil(this.filteredEmissions.length / this.pageSize);
  }

  get pagedEmissions(): AnnualEmission[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmissions.slice(start, start + this.pageSize);
  }

  get pageStart(): number {
    if (!this.filteredEmissions.length) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get pageEnd(): number {
    if (!this.filteredEmissions.length) return 0;
    const end = this.currentPage * this.pageSize;
    return end > this.filteredEmissions.length ? this.filteredEmissions.length : end;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
