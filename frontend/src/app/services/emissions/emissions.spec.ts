
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { EmissionsService } from './emissions.service';
import { AnnualEmission } from '@models/annual-emission.model';
import { environment } from '@/environments/environment';


describe('EmissionsService', () => {
  let service: EmissionsService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiBaseUrl + '/emissions/';

  const mockEmissions: AnnualEmission[] = [
    {
      id: 1,
      year: 2020,
      emissions: 100,
      emission_type: 'CO2',
      country: 'Spain',
      activity: 'Electricity',
    },
    {
      id: 2,
      year: 2021,
      emissions: 120,
      emission_type: 'CO2',
      country: 'Spain',
      activity: 'Transport',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmissionsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(EmissionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list() should GET an array of emissions', () => {
    let result: AnnualEmission[] | undefined;

    service.list().subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockEmissions);

    expect(result).toEqual(mockEmissions);
  });

  it('retrieve() should GET a single emission by id', () => {
    const mockOne = mockEmissions[0];

    let result: AnnualEmission | undefined;

    service.retrieve(mockOne.id).subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(baseUrl + mockOne.id + '/');
    expect(req.request.method).toBe('GET');

    req.flush(mockOne);

    expect(result).toEqual(mockOne);
  });

  it('create() should POST a new emission', () => {
    const payload: Partial<AnnualEmission> = {
      year: 2022,
      emissions: 150,
      emission_type: 'CO2',
      country: 'Spain',
      activity: 'Industry',
    };

    const created: AnnualEmission = {
      id: 3,
      ...payload,
    } as AnnualEmission;

    let result: AnnualEmission | undefined;

    service.create(payload).subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(created);

    expect(result).toEqual(created);
  });

  it('update() should PUT an existing emission', () => {
    const updateId = 1;
    const payload: Partial<AnnualEmission> = {
      emissions: 200,
    };

    const updated: AnnualEmission = {
      ...mockEmissions[0],
      ...payload,
    };

    let result: AnnualEmission | undefined;

    service.update(updateId, payload).subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(baseUrl + updateId + '/');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);

    req.flush(updated);

    expect(result).toEqual(updated);
  });

  it('delete() should DELETE an emission', () => {
    const deleteId = 1;
    let completed = false;

    service.delete(deleteId).subscribe({
      next: () => {},
      complete: () => {
        completed = true;
      },
    });

    const req = httpMock.expectOne(baseUrl + deleteId + '/');
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
    expect(completed).toBe(true);
  });
});
