import { Component, OnInit } from '@angular/core';
import { CalibreService } from 'src/app/core/services/calibre.service';
import { ICalibre } from 'src/app/core/models/ICalibre.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-calibre',
  templateUrl: './admin-calibre.component.html',
  styleUrls: ['./admin-calibre.component.css'],
  providers: [MessageService],
})
export class AdminCalibreComponent implements OnInit {
  public calibres: ICalibre[] = [];
  public selectedCalibres: ICalibre[] = [];
  public calibreDialog: boolean = false;
  public calibre: ICalibre = {
    idCalibre: 0,
    calibre: 0,
    sufijo: '',
    estado: true,
  };
  public submitted: boolean = false;

  constructor(
    private calibreService: CalibreService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllCalibres();
  }

  // Obtener todos los calibres
  getAllCalibres() {
    this.calibreService.getAll().subscribe({
      next: (data) => {
        this.calibres = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los calibres',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear un nuevo calibre
  openNew() {
    this.calibre = {
      idCalibre: 0,
      calibre: 0,
      sufijo: '',
      estado: true,
    };
    this.submitted = false;
    this.calibreDialog = true;
  }

  // Guardar un calibre (nuevo o editado)
  saveCalibre() {
    this.submitted = true;

    if (this.calibre.calibre > 0 && this.calibre.sufijo.trim()) {
      if (this.calibre.idCalibre === 0) {
        // Crear nuevo calibre
        this.calibreService.save(this.calibre).subscribe({
          next: (data) => {
            this.calibres.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Calibre creado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear el calibre',
            });
            console.error(err);
          },
        });
      } else {
        // Editar calibre existente
        this.calibreService.update(this.calibre.idCalibre, this.calibre).subscribe({
          next: (data) => {
            const index = this.calibres.findIndex((c) => c.idCalibre === data.idCalibre);
            if (index !== -1) {
              this.calibres[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Calibre actualizado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el calibre',
            });
            console.error(err);
          },
        });
      }

      this.calibres = [...this.calibres]; // Refrescar la tabla
      this.calibreDialog = false;
      this.calibre = {
        idCalibre: 0,
        calibre: 0,
        sufijo: '',
        estado: true,
      };
    }
  }

  // Editar un calibre
  editCalibre(calibre: ICalibre) {
    this.calibre = { ...calibre };
    this.calibreDialog = true;
  }

  // Activar un calibre
  activeCalibre(calibre: ICalibre) {
    this.calibreService.active(calibre.idCalibre).subscribe({
      next: () => {
        calibre.estado = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Calibre activado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar el calibre',
        });
        console.error(err);
      },
    });
  }

  // Desactivar un calibre
  disableCalibre(calibre: ICalibre) {
    this.calibreService.disable(calibre.idCalibre).subscribe({
      next: () => {
        calibre.estado = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Calibre desactivado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar el calibre',
        });
        console.error(err);
      },
    });
  }

  // Eliminar un calibre seleccionado
  deleteCalibre(calibre: ICalibre) {
    this.calibreService.delete(calibre.idCalibre).subscribe({
      next: () => {
        this.calibres = this.calibres.filter((c) => c.idCalibre !== calibre.idCalibre);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Calibre eliminado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el calibre',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.calibreDialog = false;
    this.submitted = false;
  }
}
