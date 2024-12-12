import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ICategoria } from 'src/app/core/models/ICategoria.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.css'],
  providers: [MessageService],
})
export class AdminCategoriaComponent implements OnInit {
  public categorias: ICategoria[] = [];
  public cols = [
    { field: 'categoria', header: 'Categoría' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estatus', header: 'Estado' },
  ];
  public globalFilterFields = ['categoria', 'descripcion', 'estatus'];
  public tableTitle = 'Gestión de Categorías';
  public dialogFields = [
    { key: 'categoria', label: 'Categoría', type: 'text', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'estatus', label: 'Estado', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Categorías';

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllCategorias();
  }

  getAllCategorias(): void {
    this.categoriaService.getAll().subscribe({
      next: (data) => (this.categorias = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar las categorías'),
    });
  }

  saveCategoria(categoria: ICategoria): void {
    const saveOperation = categoria.idCategoria
      ? this.categoriaService.update(categoria.idCategoria, categoria)
      : this.categoriaService.save(categoria);

    saveOperation.subscribe({
      next: (savedCategoria) => {
        if (categoria.idCategoria) {
          const index = this.categorias.findIndex((c) => c.idCategoria === savedCategoria.idCategoria);
          if (index !== -1) this.categorias[index] = savedCategoria;
          this.showMessage('success', 'Actualizado', 'Categoría actualizada exitosamente');
        } else {
          this.categorias.push(savedCategoria);
          this.showMessage('success', 'Creado', 'Categoría creada exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar la categoría'),
    });
  }

  deleteCategoria(categoria: ICategoria): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar la categoría "${categoria.categoria}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriaService.delete(categoria.idCategoria).subscribe({
          next: () => {
            this.categorias = this.categorias.filter((c) => c.idCategoria !== categoria.idCategoria);
            this.showMessage('success', 'Eliminado', 'Categoría eliminada con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar la categoría'),
        });
      },
    });
  }

  toggleEstado(categoria: ICategoria): void {
    categoria.estatus = !categoria.estatus;
    this.categoriaService.update(categoria.idCategoria, categoria).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado de la categoría fue ${categoria.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado de la categoría'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
