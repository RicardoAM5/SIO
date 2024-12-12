import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IProductoMaestro } from '../models/IProductoMaestro.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductoMaestroService { private readonly endpoint = 'productoMaestro'; 

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IProductoMaestro> {
      return this.api.get<IProductoMaestro>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IProductoMaestro): Observable<IProductoMaestro> {
      return this.api.put<IProductoMaestro>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IProductoMaestro[]> {
      return this.api.get<IProductoMaestro[]>(`${this.endpoint}`);
    }
  
    save(e: IProductoMaestro): Observable<IProductoMaestro> {
      return this.api.post<IProductoMaestro>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }