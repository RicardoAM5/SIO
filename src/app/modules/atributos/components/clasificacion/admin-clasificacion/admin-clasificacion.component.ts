import { Component, OnInit } from '@angular/core';
import { ClasificacionService } from 'src/app/core/services/clasificacion.service';
import { IClasificacion } from 'src/app/core/models/IClasificacion.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-clasificacion',
  templateUrl: './admin-clasificacion.component.html',
  styleUrls: ['./admin-clasificacion.component.css'],
  providers: [MessageService],
})
export class AdminClasificacionComponent implements OnInit {
  public clasificaciones: IClasificacion[] = [];
  public selectedClasificaciones: IClasificacion[] = [];
  public clasificacionDialog: boolean = false;
  public clasificacion: IClasificacion = {
    idClasificacion: 0,
    clasificacion: '',
    descripcion: '',
    estatus: true,
  };
  public submitted: boolean = false;

  constructor(
    private clasificacionService: ClasificacionService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllClasificaciones();
  }

  // Obtener todas las clasificaciones
  getAllClasificaciones() {
    this.clasificacionService.getAll().subscribe({
      next: (data) => {
        this.clasificaciones = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las clasificaciones',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear una nueva clasificación
  openNew() {
    this.clasificacion = {
      idClasificacion: 0,
      clasificacion: '',
      descripcion: '',
      estatus: true,
    };
    this.submitted = false;
    this.clasificacionDialog = true;
  }

  // Guardar una clasificación (nueva o editada)
  saveClasificacion() {
    this.submitted = true;

    if (this.clasificacion.clasificacion.trim() && this.clasificacion.descripcion.trim()) {
      if (this.clasificacion.idClasificacion === 0) {
        // Crear nueva clasificación
        this.clasificacionService.save(this.clasificacion).subscribe({
          next: (data) => {
            this.clasificaciones.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Clasificación creada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear la clasificación',
            });
            console.error(err);
          },
        });
      } else {
        // Editar clasificación existente
        this.clasificacionService.update(this.clasificacion.idClasificacion, this.clasificacion).subscribe({
          next: (data) => {
            const index = this.clasificaciones.findIndex((c) => c.idClasificacion === data.idClasificacion);
            if (index !== -1) {
              this.clasificaciones[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Clasificación actualizada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la clasificación',
            });
            console.error(err);
          },
        });
      }

      this.clasificaciones = [...this.clasificaciones]; // Refrescar la tabla
      this.clasificacionDialog = false;
      this.clasificacion = {
        idClasificacion: 0,
        clasificacion: '',
        descripcion: '',
        estatus: true,
      };
    }
  }

  // Editar una clasificación
  editClasificacion(clasificacion: IClasificacion) {
    this.clasificacion = { ...clasificacion };
    this.clasificacionDialog = true;
  }

  // Activar una clasificación
  activeClasificacion(clasificacion: IClasificacion) {
    this.clasificacionService.active(clasificacion.idClasificacion).subscribe({
      next: () => {
        clasificacion.estatus = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Clasificación activada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar la clasificación',
        });
        console.error(err);
      },
    });
  }

  // Desactivar una clasificación
  disableClasificacion(clasificacion: IClasificacion) {
    this.clasificacionService.disable(clasificacion.idClasificacion).subscribe({
      next: () => {
        clasificacion.estatus = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Clasificación desactivada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar la clasificación',
        });
        console.error(err);
      },
    });
  }

  // Eliminar una clasificación seleccionada
  deleteClasificacion(clasificacion: IClasificacion) {
    this.clasificacionService.delete(clasificacion.idClasificacion).subscribe({
      next: () => {
        this.clasificaciones = this.clasificaciones.filter((c) => c.idClasificacion !== clasificacion.idClasificacion);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Clasificación eliminada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la clasificación',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.clasificacionDialog = false;
    this.submitted = false;
  }
}