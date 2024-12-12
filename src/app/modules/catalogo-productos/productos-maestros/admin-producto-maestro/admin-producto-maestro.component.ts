import { Component, OnInit } from '@angular/core';
import { ProductoMaestroService } from 'src/app/core/services/producto-maestro.service';
import { IProductoMaestro } from 'src/app/core/models/IProductoMaestro.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-producto-maestro',
  templateUrl: './admin-producto-maestro.component.html',
  styleUrls: ['./admin-producto-maestro.component.css'],
})
export class AdminProductoMaestroComponent implements OnInit {
  productosMaestros: IProductoMaestro[] = [];
  cols = [
    { field: 'tipo.tipo', header: 'Tipo' },
    { field: 'clase.clase', header: 'Clase' },
    { field: 'calibre.calibre', header: 'Calibre' },
    { field: 'gramaje.gramaje', header: 'Gramaje' },
    { field: 'molino.molino', header: 'Molino' },
    { field: 'grado.grado', header: 'Grado' },
    { field: 'ancho.ancho', header: 'Ancho' },
    { field: 'clasificacion.clasificacion', header: 'Clasificación' },
    { field: 'estatus', header: 'Estatus' },
  ];
  globalFilterFields = ['tipo.tipo', 'clase.clase', 'calibre.calibre', 'gramaje.gramaje', 'estatus'];
  tableTitle = 'Gestión de Productos Maestros';
  dialogFields = [
    { key: 'tipo.idTipo', label: 'Tipo', type: 'dropdown', required: true, options: [] },
    { key: 'clase.idClase', label: 'Clase', type: 'dropdown', required: true, options: [] },
    { key: 'calibre.idCalibre', label: 'Calibre', type: 'dropdown', required: true, options: [] },
    { key: 'gramaje.idGrado', label: 'Gramaje', type: 'dropdown', required: true, options: [] },
    { key: 'molino.idMolino', label: 'Molino', type: 'dropdown', required: true, options: [] },
    { key: 'grado.idGrado', label: 'Grado', type: 'dropdown', required: true, options: [] },
    { key: 'ancho.idAncho', label: 'Ancho', type: 'dropdown', required: true, options: [] },
    { key: 'clasificacion.id', label: 'Clasificación', type: 'dropdown', required: true, options: [] },
    { key: 'estatus', label: 'Estatus', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  modulo = 'Productos Maestros';

  constructor(
    private productoMaestroService: ProductoMaestroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllProductosMaestros();
  }

  getAllProductosMaestros(): void {
    this.productoMaestroService.getAll().subscribe({
      next: (data) => (this.productosMaestros = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los productos maestros'),
    });
  }

  saveProductoMaestro(producto: IProductoMaestro): void {
    const saveOperation = producto.idProductoMaestro
      ? this.productoMaestroService.update(producto.idProductoMaestro, producto)
      : this.productoMaestroService.save(producto);

    saveOperation.subscribe({
      next: (savedProducto) => {
        if (producto.idProductoMaestro) {
          const index = this.productosMaestros.findIndex(
            (p) => p.idProductoMaestro === savedProducto.idProductoMaestro
          );
          if (index !== -1) this.productosMaestros[index] = savedProducto;
          this.showMessage('success', 'Actualizado', 'Producto actualizado exitosamente');
        } else {
          this.productosMaestros.push(savedProducto);
          this.showMessage('success', 'Creado', 'Producto creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el producto'),
    });
  }

  deleteProductoMaestro(producto: IProductoMaestro): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el producto "${producto.tipo.tipo}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoMaestroService.delete(producto.idProductoMaestro).subscribe({
          next: () => {
            this.productosMaestros = this.productosMaestros.filter(
              (p) => p.idProductoMaestro !== producto.idProductoMaestro
            );
            this.showMessage('success', 'Eliminado', 'Producto eliminado con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar el producto'),
        });
      },
    });
  }

  toggleEstatus(producto: IProductoMaestro): void {
    const toggleOperation = producto.estatus
      ? this.productoMaestroService.disable(producto.idProductoMaestro)
      : this.productoMaestroService.active(producto.idProductoMaestro);

    toggleOperation.subscribe({
      next: () => {
        producto.estatus = !producto.estatus;
        this.showMessage(
          'success',
          'Éxito',
          `El producto fue ${producto.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado del producto'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
