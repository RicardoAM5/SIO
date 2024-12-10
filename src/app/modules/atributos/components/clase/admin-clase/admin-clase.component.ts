import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/clase.service';
import { IClase } from 'src/app/core/models/IClase.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-clase',
  templateUrl: './admin-clase.component.html',
  styleUrls: ['./admin-clase.component.css'],
  providers: [MessageService],
})
export class AdminClaseComponent implements OnInit {
  public clases: IClase[] = [];
  public selectedClases: IClase[] = [];
  public claseDialog: boolean = false;
  public clase: IClase = {
    idClase: 0,
    clase: '',
    descripcion: '',
    estatus: true,
  };
  public submitted: boolean = false;

  constructor(
    private claseService: ClaseService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllClases();
  }

  // Obtener todas las clases
  getAllClases() {
    this.claseService.getAll().subscribe({
      next: (data) => {
        this.clases = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las clases',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear una nueva clase
  openNew() {
    this.clase = {
      idClase: 0,
      clase: '',
      descripcion: '',
      estatus: true,
    };
    this.submitted = false;
    this.claseDialog = true;
  }

  // Guardar una clase (nueva o editada)
  saveClase() {
    this.submitted = true;

    if (this.clase.clase.trim() && this.clase.descripcion.trim()) {
      if (this.clase.idClase === 0) {
        // Crear nueva clase
        this.claseService.save(this.clase).subscribe({
          next: (data) => {
            this.clases.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Clase creada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear la clase',
            });
            console.error(err);
          },
        });
      } else {
        // Editar clase existente
        this.claseService.update(this.clase.idClase, this.clase).subscribe({
          next: (data) => {
            const index = this.clases.findIndex((c) => c.idClase === data.idClase);
            if (index !== -1) {
              this.clases[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Clase actualizada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la clase',
            });
            console.error(err);
          },
        });
      }

      this.clases = [...this.clases]; // Refrescar la tabla
      this.claseDialog = false;
      this.clase = {
        idClase: 0,
        clase: '',
        descripcion: '',
        estatus: true,
      };
    }
  }

  // Editar una clase
  editClase(clase: IClase) {
    this.clase = { ...clase };
    this.claseDialog = true;
  }

  // Activar una clase
  activeClase(clase: IClase) {
    this.claseService.active(clase.idClase).subscribe({
      next: () => {
        clase.estatus = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Clase activada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar la clase',
        });
        console.error(err);
      },
    });
  }

  // Desactivar una clase
  disableClase(clase: IClase) {
    this.claseService.disable(clase.idClase).subscribe({
      next: () => {
        clase.estatus = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Clase desactivada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar la clase',
        });
        console.error(err);
      },
    });
  }

  // Eliminar una clase seleccionada
  deleteClase(clase: IClase) {
    this.claseService.delete(clase.idClase).subscribe({
      next: () => {
        this.clases = this.clases.filter((c) => c.idClase !== clase.idClase);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Clase eliminada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la clase',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.claseDialog = false;
    this.submitted = false;
  }
}