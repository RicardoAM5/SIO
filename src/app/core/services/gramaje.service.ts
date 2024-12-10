import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IGramaje } from '../models/IGramaje.interface';

@Injectable({
    providedIn: 'root',
})
export class GramajeService { private readonly endpoint = 'gramaje'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IGramaje> {
      return this.api.get<IGramaje>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IGramaje): Observable<IGramaje> {
      return this.api.put<IGramaje>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IGramaje[]> {
      return this.api.get<IGramaje[]>(`${this.endpoint}`);
    }
  
    save(e: IGramaje): Observable<IGramaje> {
      return this.api.post<IGramaje>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }