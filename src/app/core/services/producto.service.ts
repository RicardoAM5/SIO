import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IProducto } from '../models/IProducto.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductoService { private readonly endpoint = 'producto'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IProducto> {
      return this.api.get<IProducto>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IProducto): Observable<IProducto> {
      return this.api.put<IProducto>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IProducto[]> {
      return this.api.get<IProducto[]>(`${this.endpoint}`);
    }
  
    save(e: IProducto): Observable<IProducto> {
      return this.api.post<IProducto>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }