import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IGrado } from '../models/IGrado.interface';

@Injectable({
    providedIn: 'root',
})
export class GradoService { private readonly endpoint = 'grado'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IGrado> {
      return this.api.get<IGrado>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IGrado): Observable<IGrado> {
      return this.api.put<IGrado>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IGrado[]> {
      return this.api.get<IGrado[]>(`${this.endpoint}`);
    }
  
    save(e: IGrado): Observable<IGrado> {
      return this.api.post<IGrado>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }