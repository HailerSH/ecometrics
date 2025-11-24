
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@/environments/environment';


@Component({
  selector: 'app-feature-links',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './feature-links.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureLinksComponent {
  protected apiDocsUrl = `${environment.apiBaseUrl}/docs/`;
  protected adminUrl = `${environment.backendUrl}/admin/`;
}
