import { Component, OnInit } from '@angular/core';
import { MolinoService } from 'src/app/core/services/molino.service';
import { IMolino } from 'src/app/core/models/IMolino.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-molino',
  templateUrl: './admin-molino.component.html',
  styleUrls: ['./admin-molino.component.css'],
  providers: [MessageService],
})
export class AdminMolinoComponent implements OnInit {
  public molinos: IMolino[] = [];
  public selectedMolinos: IMolino[] = [];
  public molinoDialog: boolean = false;
  public molino: IMolino = {
    idMolino: 0,
    molino: '',
    eta: 0,
    descripcion: '',
    estatus: true,
  };
  public submitted: boolean = false;

  constructor(
    private molinoService: MolinoService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllMolinos();
  }

  // Obtener todos los molinos
  getAllMolinos() {
    this.molinoService.getAll().subscribe({
      next: (data) => {
        this.molinos = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los molinos',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear un nuevo molino
  openNew() {
    this.molino = {
      idMolino: 0,
      molino: '',
      eta: 0,
      descripcion: '',
      estatus: true,
    };
    this.submitted = false;
    this.molinoDialog = true;
  }

  // Guardar un molino (nuevo o editado)
  saveMolino() {
    this.submitted = true;

    if (this.molino.molino.trim() && this.molino.descripcion.trim() && this.molino.eta > 0) {
      if (this.molino.idMolino === 0) {
        // Crear nuevo molino
        this.molinoService.save(this.molino).subscribe({
          next: (data) => {
            this.molinos.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Molino creado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear el molino',
            });
            console.error(err);
          },
        });
      } else {
        // Editar molino existente
        this.molinoService.update(this.molino.idMolino, this.molino).subscribe({
          next: (data) => {
            const index = this.molinos.findIndex((m) => m.idMolino === data.idMolino);
            if (index !== -1) {
              this.molinos[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Molino actualizado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el molino',
            });
            console.error(err);
          },
        });
      }

      this.molinos = [...this.molinos]; // Refrescar la tabla
      this.molinoDialog = false;
      this.molino = {
        idMolino: 0,
        molino: '',
        eta: 0,
        descripcion: '',
        estatus: true,
      };
    }
  }

  // Editar un molino
  editMolino(molino: IMolino) {
    this.molino = { ...molino };
    this.molinoDialog = true;
  }

  // Activar un molino
  activeMolino(molino: IMolino) {
    this.molinoService.active(molino.idMolino).subscribe({
      next: () => {
        molino.estatus = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Molino activado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar el molino',
        });
        console.error(err);
      },
    });
  }

  // Desactivar un molino
  disableMolino(molino: IMolino) {
    this.molinoService.disable(molino.idMolino).subscribe({
      next: () => {
        molino.estatus = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Molino desactivado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar el molino',
        });
        console.error(err);
      },
    });
  }

  // Eliminar un molino seleccionado
  deleteMolino(molino: IMolino) {
    this.molinoService.delete(molino.idMolino).subscribe({
      next: () => {
        this.molinos = this.molinos.filter((m) => m.idMolino !== molino.idMolino);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Molino eliminado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el molino',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.molinoDialog = false;
    this.submitted = false;
  }
}