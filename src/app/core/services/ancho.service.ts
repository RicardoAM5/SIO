import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IAncho } from '../models/IAncho.interface';

@Injectable({
    providedIn: 'root',
})
export class AnchoService { private readonly endpoint = 'ancho'; // Endpoint base para la entidad "Ancho"

    constructor(private api: ApiService) {}
  
    // Obtener Ancho por ID
    getAnchoById(id: number): Observable<IAncho> {
      return this.api.get<IAncho>(`${this.endpoint}/${id}`);
    }
  
    // Actualizar Ancho
    updateAncho(id: number, ancho: IAncho): Observable<IAncho> {
      return this.api.put<IAncho>(`${this.endpoint}/${id}`, ancho);
    }
  
    // Desactivar Ancho
    disableAncho(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    // Activar Ancho
    activeAncho(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    // Obtener todos los Anchos
    getAllAncho(): Observable<IAncho[]> {
      return this.api.get<IAncho[]>(`${this.endpoint}`);
    }
  
    // Guardar un nuevo Ancho
    saveAncho(ancho: IAncho): Observable<IAncho> {
      return this.api.post<IAncho>(`${this.endpoint}`, ancho);
    }
  
    // Eliminar un Ancho (físico)
    deleteAncho(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }
  }