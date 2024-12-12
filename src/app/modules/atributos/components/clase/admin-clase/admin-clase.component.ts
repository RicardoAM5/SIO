import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/clase.service';
import { IClase } from 'src/app/core/models/IClase.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-clase',
  templateUrl: './admin-clase.component.html',
  styleUrls: ['./admin-clase.component.css'],
  providers: [MessageService],
})
export class AdminClaseComponent implements OnInit {
  public clases: IClase[] = [];
  public cols = [
    { field: 'clase', header: 'Clase' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estatus', header: 'Estado' },
  ];
  public globalFilterFields = ['clase', 'descripcion', 'estatus'];
  public tableTitle = 'Gestión de Clases';
  public dialogFields = [
    { key: 'clase', label: 'Clase', type: 'text', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'estatus', label: 'Estado', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Clases';

  constructor(
    private claseService: ClaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllClases();
  }

  getAllClases(): void {
    this.claseService.getAll().subscribe({
      next: (data) => (this.clases = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar las clases'),
    });
  }

  saveClase(clase: IClase): void {
    const saveOperation = clase.idClase
      ? this.claseService.update(clase.idClase, clase)
      : this.claseService.save(clase);

    saveOperation.subscribe({
      next: (savedClase) => {
        if (clase.idClase) {
          const index = this.clases.findIndex((c) => c.idClase === savedClase.idClase);
          if (index !== -1) this.clases[index] = savedClase;
          this.showMessage('success', 'Actualizado', 'Clase actualizada exitosamente');
        } else {
          this.clases.push(savedClase);
          this.showMessage('success', 'Creado', 'Clase creada exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar la clase'),
    });
  }

  deleteClase(clase: IClase): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar la clase "${clase.clase}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.claseService.delete(clase.idClase).subscribe({
          next: () => {
            this.clases = this.clases.filter((c) => c.idClase !== clase.idClase);
            this.showMessage('success', 'Eliminado', 'Clase eliminada con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar la clase'),
        });
      },
    });
  }

  toggleEstado(clase: IClase): void {
    clase.estatus = !clase.estatus;
    this.claseService.update(clase.idClase, clase).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado de la clase fue ${clase.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado de la clase'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
