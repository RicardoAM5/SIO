
import { Component, OnInit } from '@angular/core';
import { TipoService } from 'src/app/core/services/tipo.service';
import { ITipo } from 'src/app/core/models/ITipo.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-tipo',
  templateUrl: './admin-tipos.component.html',
  styleUrls: ['./admin-tipos.component.css'],
  providers: [MessageService],
})
export class AdminTipoComponent implements OnInit {
  public tipos: ITipo[] = [];
  public selectedTipos: ITipo[] = [];
  public tipoDialog: boolean = false;
  public tipo: ITipo = {
    idTipo: 0,
    tipo: '',
    descripcion: '',
    estatus: true,
  };
  public submitted: boolean = false;

  constructor(
    private tipoService: TipoService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllTipos();
  }

  // Obtener todos los tipos
  getAllTipos() {
    this.tipoService.getAll().subscribe({
      next: (data) => {
        this.tipos = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los tipos',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear un nuevo tipo
  openNew() {
    this.tipo = {
      idTipo: 0,
      tipo: '',
      descripcion: '',
      estatus: true,
    };
    this.submitted = false;
    this.tipoDialog = true;
  }

  // Guardar un tipo (nuevo o editado)
  saveTipo() {
    this.submitted = true;

    if (this.tipo.tipo.trim() && this.tipo.descripcion.trim()) {
      if (this.tipo.idTipo === 0) {
        // Crear nuevo tipo
        this.tipoService.save(this.tipo).subscribe({
          next: (data) => {
            this.tipos.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Tipo creado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear el tipo',
            });
            console.error(err);
          },
        });
      } else {
        // Editar tipo existente
        this.tipoService.update(this.tipo.idTipo, this.tipo).subscribe({
          next: (data) => {
            const index = this.tipos.findIndex((t) => t.idTipo === data.idTipo);
            if (index !== -1) {
              this.tipos[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Tipo actualizado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el tipo',
            });
            console.error(err);
          },
        });
      }

      this.tipos = [...this.tipos]; // Refrescar la tabla
      this.tipoDialog = false;
      this.tipo = {
        idTipo: 0,
        tipo: '',
        descripcion: '',
        estatus: true,
      };
    }
  }

  // Editar un tipo
  editTipo(tipo: ITipo) {
    this.tipo = { ...tipo };
    this.tipoDialog = true;
  }

  // Activar un tipo
  activeTipo(tipo: ITipo) {
    this.tipoService.active(tipo.idTipo).subscribe({
      next: () => {
        tipo.estatus = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tipo activado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar el tipo',
        });
        console.error(err);
      },
    });
  }

  // Desactivar un tipo
  disableTipo(tipo: ITipo) {
    this.tipoService.disable(tipo.idTipo).subscribe({
      next: () => {
        tipo.estatus = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tipo desactivado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar el tipo',
        });
        console.error(err);
      },
    });
  }

  // Eliminar un tipo seleccionado
  deleteTipo(tipo: ITipo) {
    this.tipoService.delete(tipo.idTipo).subscribe({
      next: () => {
        this.tipos = this.tipos.filter((t) => t.idTipo !== tipo.idTipo);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tipo eliminado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el tipo',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.tipoDialog = false;
    this.submitted = false;
  }
}
