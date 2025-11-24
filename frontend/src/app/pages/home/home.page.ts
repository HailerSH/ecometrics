
import { Component } from '@angular/core';
import { HeroComponent } from '@components/home/hero/hero.component';
import { FeatureLinksComponent } from '@components/home/feature-links/feature-links.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponent, FeatureLinksComponent],
  templateUrl: './home.page.html',
})
export class HomePageComponent {}
