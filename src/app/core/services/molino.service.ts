import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IMolino } from '../models/IMolino.interface';

@Injectable({
    providedIn: 'root',
})
export class MolinoService { private readonly endpoint = 'molino'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IMolino> {
      return this.api.get<IMolino>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IMolino): Observable<IMolino> {
      return this.api.put<IMolino>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IMolino[]> {
      return this.api.get<IMolino[]>(`${this.endpoint}`);
    }
  
    save(e: IMolino): Observable<IMolino> {
      return this.api.post<IMolino>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }