import { Component, OnInit } from '@angular/core';
import { ClasificacionService } from 'src/app/core/services/clasificacion.service';
import { IClasificacion } from 'src/app/core/models/IClasificacion.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-clasificacion',
  templateUrl: './admin-clasificacion.component.html',
  styleUrls: ['./admin-clasificacion.component.css'],
  providers: [MessageService],
})
export class AdminClasificacionComponent implements OnInit {
  public clasificaciones: IClasificacion[] = [];
  public cols = [
    { field: 'clasificacion', header: 'Clasificación' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estatus', header: 'Estado' },
  ];
  public globalFilterFields = ['clasificacion', 'descripcion', 'estatus'];
  public tableTitle = 'Gestión de Clasificaciones';
  public dialogFields = [
    { key: 'clasificacion', label: 'Clasificación', type: 'text', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'estatus', label: 'Estado', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Clasificaciones';

  constructor(
    private clasificacionService: ClasificacionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllClasificaciones();
  }

  getAllClasificaciones(): void {
    this.clasificacionService.getAll().subscribe({
      next: (data) => (this.clasificaciones = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar las clasificaciones'),
    });
  }

  saveClasificacion(clasificacion: IClasificacion): void {
    const saveOperation = clasificacion.idClasificacion
      ? this.clasificacionService.update(clasificacion.idClasificacion, clasificacion)
      : this.clasificacionService.save(clasificacion);

    saveOperation.subscribe({
      next: (savedClasificacion) => {
        if (clasificacion.idClasificacion) {
          const index = this.clasificaciones.findIndex((c) => c.idClasificacion === savedClasificacion.idClasificacion);
          if (index !== -1) this.clasificaciones[index] = savedClasificacion;
          this.showMessage('success', 'Actualizado', 'Clasificación actualizada exitosamente');
        } else {
          this.clasificaciones.push(savedClasificacion);
          this.showMessage('success', 'Creado', 'Clasificación creada exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar la clasificación'),
    });
  }

  deleteClasificacion(clasificacion: IClasificacion): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar la clasificación "${clasificacion.clasificacion}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clasificacionService.delete(clasificacion.idClasificacion).subscribe({
          next: () => {
            this.clasificaciones = this.clasificaciones.filter(
              (c) => c.idClasificacion !== clasificacion.idClasificacion
            );
            this.showMessage('success', 'Eliminado', 'Clasificación eliminada con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar la clasificación'),
        });
      },
    });
  }

  toggleEstado(clasificacion: IClasificacion): void {
    clasificacion.estatus = !clasificacion.estatus;
    this.clasificacionService.update(clasificacion.idClasificacion, clasificacion).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado de la clasificación fue ${clasificacion.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado de la clasificación'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
