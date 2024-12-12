import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/core/services/producto.service';
import { IProducto } from 'src/app/core/models/IProducto.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-producto',
  templateUrl: './admin-producto.component.html',
  styleUrls: ['./admin-producto.component.css'],
})
export class AdminProductoComponent implements OnInit {
  productos: IProducto[] = [];
  cols = [
    { field: 'productoMaestro.tipo.tipo', header: 'Tipo' },
    { field: 'productoMaestro.clase.clase', header: 'Clase' },
    { field: 'productoMaestro.calibre.calibre', header: 'Calibre (Maestro)' },
    { field: 'productoMaestro.gramaje.gramaje', header: 'Gramaje (Maestro)' },
    { field: 'productoMaestro.molino.molino', header: 'Molino' },
    { field: 'anchoReal.ancho', header: 'Ancho Real' },
    { field: 'calibreReal.calibre', header: 'Calibre Real' },
    { field: 'gramajeReal.gramaje', header: 'Gramaje Real' },
    { field: 'categoria.categoria', header: 'Categoría' },
    { field: 'division.division', header: 'División' },
    { field: 'estatus', header: 'Estatus' },
  ];
  globalFilterFields = [
    'productoMaestro.tipo.tipo',
    'productoMaestro.clase.clase',
    'productoMaestro.calibre.calibre',
    'productoMaestro.gramaje.gramaje',
    
    'productoMaestro.molino.molino',
    'anchoReal.ancho',
    'calibreReal.calibre',
    'gramajeReal.gramaje',
    'categoria.categoria',
    'division.division',
  ];
  tableTitle = 'Gestión de Productos';
  dialogFields = [
    { key: 'productoMaestro.idProductoMaestro', label: 'Producto Maestro', type: 'dropdown', required: true, options: [] },
    { key: 'anchoReal.idAncho', label: 'Ancho Real', type: 'dropdown', required: true, options: [] },
    { key: 'calibreReal.idCalibreReal', label: 'Calibre Real', type: 'dropdown', required: true, options: [] },
    { key: 'gramajeReal.idGramajeReal', label: 'Gramaje Real', type: 'dropdown', required: true, options: [] },
    { key: 'categoria.idCategoria', label: 'Categoría', type: 'dropdown', required: true, options: [] },
    { key: 'division.idDivision', label: 'División', type: 'dropdown', required: true, options: [] },
    { key: 'estatus', label: 'Estatus', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  modulo = 'Productos';

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos(): void {
    this.productoService.getAll().subscribe({
      next: (data) => (this.productos = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los productos'),
    });
  }

  saveProducto(producto: IProducto): void {
    const saveOperation = producto.idProducto
      ? this.productoService.update(producto.idProducto, producto)
      : this.productoService.save(producto);

    saveOperation.subscribe({
      next: (savedProducto) => {
        if (producto.idProducto) {
          const index = this.productos.findIndex((p) => p.idProducto === savedProducto.idProducto);
          if (index !== -1) this.productos[index] = savedProducto;
          this.showMessage('success', 'Actualizado', 'Producto actualizado exitosamente');
        } else {
          this.productos.push(savedProducto);
          this.showMessage('success', 'Creado', 'Producto creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el producto'),
    });
  }

  deleteProducto(producto: IProducto): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el producto "${producto.productoMaestro.tipo.tipo}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoService.delete(producto.idProducto).subscribe({
          next: () => {
            this.productos = this.productos.filter((p) => p.idProducto !== producto.idProducto);
            this.showMessage('success', 'Eliminado', 'Producto eliminado con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar el producto'),
        });
      },
    });
  }

  toggleEstatus(producto: IProducto): void {
    const toggleOperation = producto.estatus
      ? this.productoService.disable(producto.idProducto)
      : this.productoService.active(producto.idProducto);

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
