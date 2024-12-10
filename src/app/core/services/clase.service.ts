import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IClase } from '../models/IClase.interface';

@Injectable({
    providedIn: 'root',
})
export class ClaseService { private readonly endpoint = 'clase'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IClase> {
      return this.api.get<IClase>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IClase): Observable<IClase> {
      return this.api.put<IClase>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IClase[]> {
      return this.api.get<IClase[]>(`${this.endpoint}`);
    }
  
    save(e: IClase): Observable<IClase> {
      return this.api.post<IClase>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }