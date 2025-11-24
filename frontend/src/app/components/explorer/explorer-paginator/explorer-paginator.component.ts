
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-explorer-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorer-paginator.component.html',
})
export class ExplorerPaginatorComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() pageStart = 0;
  @Input() pageEnd = 0;
  @Input() totalItems = 0;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
