
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface AnnualEmission {
  id?: number;
  year: number;
  emissions: number;
}

@Injectable({ providedIn: 'root' })
export class EmissionsService {
  private baseUrl = `${environment.apiBaseUrl}/emissions/`;

  constructor(private http: HttpClient) {}

  list(): Observable<AnnualEmission[]> {
    return this.http.get<AnnualEmission[]>(this.baseUrl);
  }
}
