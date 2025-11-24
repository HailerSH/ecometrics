
import { Routes } from '@angular/router';
import { HomePageComponent } from '@pages/home/home.page';
import { ExplorerPageComponent } from '@pages/explorer/explorer.page';
import { ComparePageComponent } from '@pages/compare/compare.page';
import { AboutTechnicalPageComponent } from '@pages/about-technical/about-technical.page';


export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'explorer', component: ExplorerPageComponent },
  { path: 'compare', component: ComparePageComponent },
  { path: 'about-technical', component: AboutTechnicalPageComponent }
];
