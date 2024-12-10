import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IClasificacion } from '../models/IClasificacion.interface';

@Injectable({
    providedIn: 'root',
})
export class ClasificacionService { private readonly endpoint = 'clasificacion'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IClasificacion> {
      return this.api.get<IClasificacion>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IClasificacion): Observable<IClasificacion> {
      return this.api.put<IClasificacion>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IClasificacion[]> {
      return this.api.get<IClasificacion[]>(`${this.endpoint}`);
    }
  
    save(e: IClasificacion): Observable<IClasificacion> {
      return this.api.post<IClasificacion>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }