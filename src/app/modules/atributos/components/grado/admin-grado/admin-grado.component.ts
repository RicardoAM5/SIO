import { Component, OnInit } from '@angular/core';
import { GradoService } from 'src/app/core/services/grado.service';
import { IGrado } from 'src/app/core/models/IGrado.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-grado',
  templateUrl: './admin-grado.component.html',
  styleUrls: ['./admin-grado.component.css'],
  providers: [MessageService],
})
export class AdminGradoComponent implements OnInit {
  public grados: IGrado[] = [];
  public selectedGrados: IGrado[] = [];
  public gradoDialog: boolean = false;
  public grado: IGrado = {
    idGrado: 0,
    grado: '',
    descripcion: '',
    estado: true,
  };
  public submitted: boolean = false;

  constructor(
    private gradoService: GradoService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllGrados();
  }

  // Obtener todos los grados
  getAllGrados() {
    this.gradoService.getAll().subscribe({
      next: (data) => {
        this.grados = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los grados',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear un nuevo grado
  openNew() {
    this.grado = {
      idGrado: 0,
      grado: '',
      descripcion: '',
      estado: true,
    };
    this.submitted = false;
    this.gradoDialog = true;
  }

  // Guardar un grado (nuevo o editado)
  saveGrado() {
    this.submitted = true;

    if (this.grado.grado.trim() && this.grado.descripcion.trim()) {
      if (this.grado.idGrado === 0) {
        // Crear nuevo grado
        this.gradoService.save(this.grado).subscribe({
          next: (data) => {
            this.grados.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Grado creado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear el grado',
            });
            console.error(err);
          },
        });
      } else {
        // Editar grado existente
        this.gradoService.update(this.grado.idGrado, this.grado).subscribe({
          next: (data) => {
            const index = this.grados.findIndex((g) => g.idGrado === data.idGrado);
            if (index !== -1) {
              this.grados[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Grado actualizado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el grado',
            });
            console.error(err);
          },
        });
      }

      this.grados = [...this.grados]; // Refrescar la tabla
      this.gradoDialog = false;
      this.grado = {
        idGrado: 0,
        grado: '',
        descripcion: '',
        estado: true,
      };
    }
  }

  // Editar un grado
  editGrado(grado: IGrado) {
    this.grado = { ...grado };
    this.gradoDialog = true;
  }

  // Activar un grado
  activeGrado(grado: IGrado) {
    this.gradoService.active(grado.idGrado).subscribe({
      next: () => {
        grado.estado = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Grado activado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar el grado',
        });
        console.error(err);
      },
    });
  }

  // Desactivar un grado
  disableGrado(grado: IGrado) {
    this.gradoService.disable(grado.idGrado).subscribe({
      next: () => {
        grado.estado = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Grado desactivado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar el grado',
        });
        console.error(err);
      },
    });
  }

  // Eliminar un grado seleccionado
  deleteGrado(grado: IGrado) {
    this.gradoService.delete(grado.idGrado).subscribe({
      next: () => {
        this.grados = this.grados.filter((g) => g.idGrado !== grado.idGrado);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Grado eliminado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el grado',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.gradoDialog = false;
    this.submitted = false;
  }
}