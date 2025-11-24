
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualEmission } from '@models/annual-emission.model';


@Component({
  selector: 'app-explorer-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorer-grid.component.html',
})
export class ExplorerGridComponent {
  @Input() emissions: AnnualEmission[] = [];
  @Input() hasData = false;
}
