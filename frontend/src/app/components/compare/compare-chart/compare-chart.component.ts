
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';


@Component({
  selector: 'app-compare-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './compare-chart.component.html',
})
export class CompareChartComponent {
  @Input() lineChartData!: ChartConfiguration['data'];
  @Input() lineChartOptions!: ChartConfiguration['options'];
  @Input() lineChartType!: ChartType;
}
