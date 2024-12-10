import { Component, OnInit } from '@angular/core';
import { DivisionService } from 'src/app/core/services/division.service';
import { IDivision } from 'src/app/core/models/IDivision.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-division',
  templateUrl: './admin-division.component.html',
  styleUrls: ['./admin-division.component.css'],
  providers: [MessageService],
})
export class AdminDivisionComponent implements OnInit {
  public divisiones: IDivision[] = [];
  public selectedDivisiones: IDivision[] = [];
  public divisionDialog: boolean = false;
  public division: IDivision = {
    idDivision: 0,
    division: '',
    descripcion: '',
    estatus: true,
  };
  public submitted: boolean = false;

  constructor(
    private divisionService: DivisionService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllDivisiones();
  }

  // Obtener todas las divisiones
  getAllDivisiones() {
    this.divisionService.getAll().subscribe({
      next: (data) => {
        this.divisiones = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las divisiones',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear una nueva división
  openNew() {
    this.division = {
      idDivision: 0,
      division: '',
      descripcion: '',
      estatus: true,
    };
    this.submitted = false;
    this.divisionDialog = true;
  }

  // Guardar una división (nueva o editada)
  saveDivision() {
    this.submitted = true;

    if (this.division.division.trim() && this.division.descripcion.trim()) {
      if (this.division.idDivision === 0) {
        // Crear nueva división
        this.divisionService.save(this.division).subscribe({
          next: (data) => {
            this.divisiones.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'División creada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear la división',
            });
            console.error(err);
          },
        });
      } else {
        // Editar división existente
        this.divisionService.update(this.division.idDivision, this.division).subscribe({
          next: (data) => {
            const index = this.divisiones.findIndex((d) => d.idDivision === data.idDivision);
            if (index !== -1) {
              this.divisiones[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'División actualizada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la división',
            });
            console.error(err);
          },
        });
      }

      this.divisiones = [...this.divisiones]; // Refrescar la tabla
      this.divisionDialog = false;
      this.division = {
        idDivision: 0,
        division: '',
        descripcion: '',
        estatus: true,
      };
    }
  }

  // Editar una división
  editDivision(division: IDivision) {
    this.division = { ...division };
    this.divisionDialog = true;
  }

  // Activar una división
  activeDivision(division: IDivision) {
    this.divisionService.active(division.idDivision).subscribe({
      next: () => {
        division.estatus = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'División activada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar la división',
        });
        console.error(err);
      },
    });
  }

  // Desactivar una división
  disableDivision(division: IDivision) {
    this.divisionService.disable(division.idDivision).subscribe({
      next: () => {
        division.estatus = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'División desactivada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar la división',
        });
        console.error(err);
      },
    });
  }

  // Eliminar una división seleccionada
  deleteDivision(division: IDivision) {
    this.divisionService.delete(division.idDivision).subscribe({
      next: () => {
        this.divisiones = this.divisiones.filter((d) => d.idDivision !== division.idDivision);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'División eliminada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la división',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.divisionDialog = false;
    this.submitted = false;
  }
}
