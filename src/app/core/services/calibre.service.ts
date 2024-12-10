import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ICalibre } from '../models/ICalibre.interface';

@Injectable({
    providedIn: 'root',
})
export class CalibreService { private readonly endpoint = 'calibre'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<ICalibre> {
      return this.api.get<ICalibre>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: ICalibre): Observable<ICalibre> {
      return this.api.put<ICalibre>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<ICalibre[]> {
      return this.api.get<ICalibre[]>(`${this.endpoint}`);
    }
  
    save(e: ICalibre): Observable<ICalibre> {
      return this.api.post<ICalibre>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }