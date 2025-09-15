import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Coordinates } from '../../shared/model/coordinates.model';
import { PageRequest, PageResponse } from '../../shared/model/paginator.model';
import { Agency } from '../model/agency.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private baseUrl = 'http://localhost:8080/api';
  private reload$ = new BehaviorSubject<void>(void 0);
  reloadTrigger$ = this.reload$.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) { }


  list(pageRequest: PageRequest): Observable<PageResponse<Agency>> {
    let params = new HttpParams()
      .set('page', pageRequest.page)
      .set('size', pageRequest.size)
      .set('sort', pageRequest.sort ?? 'id')
      .set('direction', pageRequest.direction ?? 'desc');

    return this.http.get<PageResponse<Agency>>(`${this.baseUrl}/agencies`, { params });
  }

  getById(id: number): Observable<Agency> {
    return this.http.get<Agency>(`${this.baseUrl}/agencies/${id}`);
  }

  create(agency: Partial<Agency>): Observable<Agency> {
    return this.http.post<Agency>(`${this.baseUrl}/agencies`, agency).pipe(
      tap(() => this.reload$.next())
    );
  }

  update(id: number, agency: Partial<Agency>): Observable<Agency> {
    return this.http.put<Agency>(`${this.baseUrl}/agencies/${id}`, agency).pipe(
      tap(() => this.reload$.next())
    );;
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/agencies/${id}`).pipe(
      tap(() => this.reload$.next())
    );;
  }

  searchAgencies(pageRequest: PageRequest, coordinates?: Coordinates | undefined): Observable<PageResponse<Agency>> {
    let params = new HttpParams();
    const baseParams = new HttpParams()
      .set('page', pageRequest.page)
      .set('size', pageRequest.size);

    if (coordinates) {
      params = baseParams
        .set('posX', coordinates.posX)
        .set('posY', coordinates.posY);
    } else {
      params = baseParams
        .set('sort', pageRequest.sort ?? 'name')
        .set('direction', pageRequest.direction ?? 'asc');
    }

    return this.http.get<PageResponse<Agency>>(`${this.baseUrl}/public/agencies`, { params });
  }
}
