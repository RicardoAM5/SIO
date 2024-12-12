import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IGrupo } from '../models/IGrupo.interface';
import { ICrearGrupoDTO } from '../models-dto/ICrearGrupoDTO';

@Injectable({
    providedIn: 'root',
})
export class GrupoService { 
  
  private readonly endpoint = 'grupo'; 
  private readonly endpointGrupoProducto = 'grupoProducto';

    constructor(private api: ApiService) {}
  
    getById(id: number): Observable<IGrupo> {
      return this.api.get<IGrupo>(`${this.endpoint}/${id}`);
    }
  
    update(id: number, e: IGrupo): Observable<IGrupo> {
      return this.api.put<IGrupo>(`${this.endpoint}/${id}`, e);
    }
  
    disable(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/desactivar/${id}`, null);
    }
  
    active(id: number): Observable<void> {
      return this.api.put<void>(`${this.endpoint}/activar/${id}`, null);
    }
  
    getAll(): Observable<IGrupo[]> {
      return this.api.get<IGrupo[]>(`${this.endpoint}`);
    }
  
    save(e: IGrupo): Observable<IGrupo> {
      return this.api.post<IGrupo>(`${this.endpoint}`, e);
    }
  
    delete(id: number): Observable<void> {
      return this.api.delete<void>(`${this.endpoint}/delete/${id}`);
    }

    saveGrupoProducto(e: ICrearGrupoDTO): Observable<ICrearGrupoDTO> {
      return this.api.post<ICrearGrupoDTO>(`${this.endpointGrupoProducto}/agregarGrupoProducto`, e);
    }
  }