import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ICategoria } from 'src/app/core/models/ICategoria.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.css'],
  providers: [MessageService],
})
export class AdminCategoriaComponent implements OnInit {
  public categorias: ICategoria[] = [];
  public selectedCategorias: ICategoria[] = [];
  public categoriaDialog: boolean = false;
  public categoria: ICategoria = {
    idCategoria: 0,
    categoria: '',
    descripcion: '',
    estatus: true,
  };
  public submitted: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllCategorias();
  }

  // Obtener todas las categorías
  getAllCategorias() {
    this.categoriaService.getAll().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las categorías',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear una nueva categoría
  openNew() {
    this.categoria = {
      idCategoria: 0,
      categoria: '',
      descripcion: '',
      estatus: true,
    };
    this.submitted = false;
    this.categoriaDialog = true;
  }

  // Guardar una categoría (nueva o editada)
  saveCategoria() {
    this.submitted = true;

    if (this.categoria.categoria.trim() && this.categoria.descripcion.trim()) {
      if (this.categoria.idCategoria === 0) {
        // Crear nueva categoría
        this.categoriaService.save(this.categoria).subscribe({
          next: (data) => {
            this.categorias.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Categoría creada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear la categoría',
            });
            console.error(err);
          },
        });
      } else {
        // Editar categoría existente
        this.categoriaService.update(this.categoria.idCategoria, this.categoria).subscribe({
          next: (data) => {
            const index = this.categorias.findIndex((c) => c.idCategoria === data.idCategoria);
            if (index !== -1) {
              this.categorias[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Categoría actualizada',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la categoría',
            });
            console.error(err);
          },
        });
      }

      this.categorias = [...this.categorias]; // Refrescar la tabla
      this.categoriaDialog = false;
      this.categoria = {
        idCategoria: 0,
        categoria: '',
        descripcion: '',
        estatus: true,
      };
    }
  }

  // Editar una categoría
  editCategoria(categoria: ICategoria) {
    this.categoria = { ...categoria };
    this.categoriaDialog = true;
  }

  // Activar una categoría
  activeCategoria(categoria: ICategoria) {
    this.categoriaService.active(categoria.idCategoria).subscribe({
      next: () => {
        categoria.estatus = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Categoría activada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo activar la categoría',
        });
        console.error(err);
      },
    });
  }

  // Desactivar una categoría
  disableCategoria(categoria: ICategoria) {
    this.categoriaService.disable(categoria.idCategoria).subscribe({
      next: () => {
        categoria.estatus = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Categoría desactivada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo desactivar la categoría',
        });
        console.error(err);
      },
    });
  }

  // Eliminar una categoría seleccionada
  deleteCategoria(categoria: ICategoria) {
    this.categoriaService.delete(categoria.idCategoria).subscribe({
      next: () => {
        this.categorias = this.categorias.filter((c) => c.idCategoria !== categoria.idCategoria);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Categoría eliminada',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la categoría',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.categoriaDialog = false;
    this.submitted = false;
  }
}