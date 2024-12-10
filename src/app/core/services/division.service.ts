import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IDivision } from '../models/IDivision.interface';

@Injectable({
    providedIn: 'root',
})
export class DivisionService { private readonly endpoint = 'division'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IDivision> {
      return this.api.get<IDivision>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IDivision): Observable<IDivision> {
      return this.api.put<IDivision>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IDivision[]> {
      return this.api.get<IDivision[]>(`${this.endpoint}`);
    }
  
    save(e: IDivision): Observable<IDivision> {
      return this.api.post<IDivision>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }