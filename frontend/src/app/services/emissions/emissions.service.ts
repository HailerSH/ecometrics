
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnualEmission } from '@models/annual-emission.model';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class EmissionsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl + '/emissions/';

  list(): Observable<AnnualEmission[]> {
    return this.http.get<AnnualEmission[]>(this.apiUrl);
  }

  retrieve(id: number): Observable<AnnualEmission> {
    return this.http.get<AnnualEmission>(this.apiUrl + id + '/');
  }

  create(payload: Partial<AnnualEmission>): Observable<AnnualEmission> {
    return this.http.post<AnnualEmission>(this.apiUrl, payload);
  }

  update(id: number, payload: Partial<AnnualEmission>): Observable<AnnualEmission> {
    return this.http.put<AnnualEmission>(this.apiUrl + id + '/', payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id + '/');
  }
}
