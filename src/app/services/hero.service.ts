import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE = 'https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api';

@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor(private http: HttpClient) {}

  getHeroes(page = 1, size = 10): Observable<any> {
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.get(`${BASE}/heroes`, { params });
  }

  getHeroById(id: string | number): Observable<any> {
    const params = new HttpParams().set('id', String(id));
    return this.http.get(`${BASE}/hero`, { params });
  }
}
