import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IAgrupacion } from '../models/IAgrupacion.interface';
import { afterRead } from '@popperjs/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoint = '/agrupacion'; 

  constructor(private api: ApiService) {}

  getUsers(): Observable<IAgrupacion[]> {
    return this.api.get<IAgrupacion[]>(this.endpoint); 
  }

  getUser(id: number): Observable<IAgrupacion> {
    return this.api.get<IAgrupacion>(`${this.endpoint}/${id}`); 
  }

  createUser(agrupacion: IAgrupacion): Observable<IAgrupacion> {
    return this.api.post<IAgrupacion>(this.endpoint, agrupacion); 
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`); 
  }

  updateUser(agrupacion: IAgrupacion): Observable<IAgrupacion> {
    return this.api.put<IAgrupacion>(`${this.endpoint}/${agrupacion.idAgrupacion}`, agrupacion); 
  }
}