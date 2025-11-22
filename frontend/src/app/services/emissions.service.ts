
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface AnnualEmission {
  id?: number;
  year: number;
  emissions: number;
}

@Injectable({ providedIn: 'root' })
export class EmissionsService {
  private baseUrl = 'http://localhost:8000/api/emissions/';

  constructor(private http: HttpClient) {}

  list(): Observable<AnnualEmission[]> {
    return this.http.get<AnnualEmission[]>(this.baseUrl);
  }
}
