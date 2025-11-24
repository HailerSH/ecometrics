
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

import { EmissionsService } from '@services/emissions/emissions.service';
import { AnnualEmission } from '@models/annual-emission.model';

import { CompareFiltersComponent } from '@components/compare/compare-filters/compare-filters.component';
import { CompareChartComponent } from '@components/compare/compare-chart/compare-chart.component';

import { ChartConfiguration, ChartType } from 'chart.js';
import 'chart.js/auto';


@Component({
  selector: 'app-compare-page',
  standalone: true,
  imports: [CommonModule, CompareFiltersComponent, CompareChartComponent],
  templateUrl: './compare.page.html',
})
export class ComparePageComponent implements OnInit {
  // ---- Filters ----
  filters = new FormGroup({
    country: new FormControl<string | null>(null),
    emission_type: new FormControl<string | null>(null),
    activity: new FormControl<string | null>(null),
    yearFrom: new FormControl<number | null>(null),
    yearTo: new FormControl<number | null>(null),
  });

  allEmissions: AnnualEmission[] = [];
  filteredEmissions: AnnualEmission[] = [];

  countries: string[] = [];
  emissionTypes: string[] = [];
  activities: string[] = [];
  years: number[] = [];

  // ---- Chart config ----
  lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Emissions',
        data: [],
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 4,
        borderColor: '#34d399', // emerald-400
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
      },
    ],
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: { size: 11 },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#020617',
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#1f2937' },
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#1f2937' },
      },
    },
  };

  lineChartType: ChartType = 'line';

  constructor(private emissionsService: EmissionsService) {}

  ngOnInit(): void {
    this.emissionsService.list().subscribe((data) => {
      this.allEmissions = data;
      this.initFilterOptions();
      this.applyFilters();
    });

    this.filters.valueChanges.subscribe(() => this.applyFilters());
  }

  private initFilterOptions() {
    const countries = new Set<string>();
    const types = new Set<string>();
    const activities = new Set<string>();
    const years = new Set<number>();

    this.allEmissions.forEach((e) => {
      if (e.country) countries.add(e.country);
      if ((e as any).emission_type) types.add((e as any).emission_type);
      if (e.activity) activities.add(e.activity);
      if (e.year) years.add(e.year);
    });

    this.countries = Array.from(countries).sort();
    this.emissionTypes = Array.from(types).sort();
    this.activities = Array.from(activities).sort();
    this.years = Array.from(years).sort((a, b) => a - b);

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
    const { country, emission_type, activity, yearFrom, yearTo } = this.filters.value;

    this.filteredEmissions = this.allEmissions.filter((e) => {
      const okCountry = !country || e.country === country;
      const okType = !emission_type || (e as any).emission_type === emission_type;
      const okActivity = !activity || e.activity === activity;
      const okYearFrom = yearFrom == null || e.year >= yearFrom;
      const okYearTo = yearTo == null || e.year <= yearTo;
      return okCountry && okType && okActivity && okYearFrom && okYearTo;
    });

    this.updateChart();
  }

  private updateChart() {
    const byYear = new Map<number, number>();

    this.filteredEmissions.forEach((e) => {
      const prev = byYear.get(e.year) ?? 0;
      byYear.set(e.year, prev + (Number(e.emissions) || 0));
    });

    const sortedYears = Array.from(byYear.keys()).sort((a, b) => a - b);
    const values = sortedYears.map((y) => byYear.get(y) ?? 0);

    this.lineChartData = {
      labels: sortedYears,
      datasets: [
        {
          label: 'Emissions',
          data: values,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 3,
          pointHoverRadius: 4,
          borderColor: '#34d399',
          backgroundColor: 'rgba(52, 211, 153, 0.12)',
        },
      ],
    };
  }
}
