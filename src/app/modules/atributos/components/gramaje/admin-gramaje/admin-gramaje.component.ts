import { Component, OnInit } from '@angular/core';
import { GramajeService } from 'src/app/core/services/gramaje.service';
import { IGramaje } from 'src/app/core/models/IGramaje.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-gramaje',
  templateUrl: './admin-gramaje.component.html',
  styleUrls: ['./admin-gramaje.component.css'],
  providers: [MessageService],
})
export class AdminGramajeComponent implements OnInit {
  public gramajes: IGramaje[] = [];
  public selectedGramajes: IGramaje[] = [];
  public gramajeDialog: boolean = false;
  public gramaje: IGramaje = {
    idGramaje: 0,
    gramaje: 0,
    sufijo: '',
    estado: true,
  };
  public submitted: boolean = false;

  constructor(
    private gramajeService: GramajeService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllGramajes();
  }

  // Obtener todos los gramajes
  getAllGramajes() {
    this.gramajeService.getAll().subscribe({
      next: (data) => {
        this.gramajes = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los gramajes',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear un nuevo gramaje
  openNew() {
    this.gramaje = {
      idGramaje: 0,
      gramaje: 0,
      sufijo: '',
      estado: true,
    };
    this.submitted = false;
    this.gramajeDialog = true;
  }

  // Guardar un gramaje (nuevo o editado)
  saveGramaje() {
    this.submitted = true;

    if (this.gramaje.gramaje > 0 && this.gramaje.sufijo.trim()) {
      if (this.gramaje.idGramaje === 0) {
        // Crear nuevo gramaje
        this.gramajeService.save(this.gramaje).subscribe({
          next: (data) => {
            this.gramajes.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Gramaje creado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear el gramaje',
            });
            console.error(err);
          },
        });
      } else {
        // Editar gramaje existente
        this.gramajeService.update(this.gramaje.idGramaje, this.gramaje).subscribe({
          next: (data) => {
            const index = this.gramajes.findIndex((g) => g.idGramaje === data.idGramaje);
            if (index !== -1) {
              this.gramajes[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Gramaje actualizado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el gramaje',
            });
            console.error(err);
          },
        });
      }

      this.gramajes = [...this.gramajes]; // Refrescar la tabla
      this.gramajeDialog = false;
      this.gramaje = {
        idGramaje: 0,
        gramaje: 0,
        sufijo: '',
        estado: true,
      };
    }
  }

  // Editar un gramaje
  editGramaje(gramaje: IGramaje) {
    this.gramaje = { ...gramaje };
    this.gramajeDialog = true;
  }

  // Activar un gramaje
  activeGramaje(gramaje: IGramaje) {
    this.gramajeService.active(gramaje.idGramaje).subscribe({
      next: () => {
        gramaje.estado = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Gramaje activado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar el gramaje',
        });
        console.error(err);
      },
    });
  }

  // Desactivar un gramaje
  disableGramaje(gramaje: IGramaje) {
    this.gramajeService.disable(gramaje.idGramaje).subscribe({
      next: () => {
        gramaje.estado = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Gramaje desactivado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar el gramaje',
        });
        console.error(err);
      },
    });
  }

  // Eliminar un gramaje seleccionado
  deleteGramaje(gramaje: IGramaje) {
    this.gramajeService.delete(gramaje.idGramaje).subscribe({
      next: () => {
        this.gramajes = this.gramajes.filter((g) => g.idGramaje !== gramaje.idGramaje);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Gramaje eliminado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el gramaje',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.gramajeDialog = false;
    this.submitted = false;
  }
}