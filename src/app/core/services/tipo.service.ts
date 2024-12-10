import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ITipo } from '../models/ITipo.interface';

@Injectable({
    providedIn: 'root',
})
export class TipoService { private readonly endpoint = 'tipo'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<ITipo> {
      return this.api.get<ITipo>(`${this.endpoint}/${id}`);
    }
    
    update(id: number, e: ITipo): Observable<ITipo> {
      return this.api.put<ITipo>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<ITipo[]> {
      return this.api.get<ITipo[]>(`${this.endpoint}`);
    }
  
    save(ancho: ITipo): Observable<ITipo> {
      return this.api.post<ITipo>(`${this.endpoint}`, ancho);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }