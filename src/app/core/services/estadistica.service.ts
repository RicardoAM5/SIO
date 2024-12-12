import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IGrupo } from '../models/IGrupo.interface';
import { ICrearGrupoDTO } from '../models-dto/ICrearGrupoDTO';

@Injectable({
    providedIn: 'root',
})
export class EstadisticaService { 
  
  private readonly endpoint = 'estadistica'; 

    constructor(private api: ApiService) {}
  
  
    getAll(): Observable<IGrupo[]> {
      return this.api.get<IGrupo[]>(`${this.endpoint}/calcularEstadisiticas`);
    }
  
 
  }