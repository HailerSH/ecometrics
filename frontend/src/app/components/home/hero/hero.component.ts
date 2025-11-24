
import { Component } from '@angular/core';
import { ArchitectureCardComponent } from '@components/home/architecture-card/architecture-card.component';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ArchitectureCardComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {}
