import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ICategoria } from '../models/ICategoria.interface';

@Injectable({
    providedIn: 'root',
})
export class CategoriaService { private readonly endpoint = 'categoria'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<ICategoria> {
      return this.api.get<ICategoria>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: ICategoria): Observable<ICategoria> {
      return this.api.put<ICategoria>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<ICategoria[]> {
      return this.api.get<ICategoria[]>(`${this.endpoint}`);
    }
  
    save(e: ICategoria): Observable<ICategoria> {
      return this.api.post<ICategoria>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }