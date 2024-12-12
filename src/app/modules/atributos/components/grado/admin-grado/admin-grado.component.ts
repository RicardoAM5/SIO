import { Component, OnInit } from '@angular/core';
import { GradoService } from 'src/app/core/services/grado.service';
import { IGrado } from 'src/app/core/models/IGrado.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-grado',
  templateUrl: './admin-grado.component.html',
  styleUrls: ['./admin-grado.component.css'],
  providers: [MessageService],
})
export class AdminGradoComponent implements OnInit {
  public grados: IGrado[] = [];
  public cols = [
    { field: 'grado', header: 'Grado' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estatus', header: 'Estatus' },
  ];
  public globalFilterFields = ['grado', 'descripcion', 'estado'];
  public tableTitle = 'Gestión de Grados';
  public dialogFields = [
    { key: 'grado', label: 'Grado', type: 'text', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'estatus', label: 'Estatus', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Grados';

  constructor(
    private gradoService: GradoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllGrados();
  }

  getAllGrados(): void {
    this.gradoService.getAll().subscribe({
      next: (data) => (this.grados = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los grados'),
    });
  }

  saveGrado(grado: IGrado): void {
    const saveOperation = grado.idGrado
      ? this.gradoService.update(grado.idGrado, grado)
      : this.gradoService.save(grado);

    saveOperation.subscribe({
      next: (savedGrado) => {
        if (grado.idGrado) {
          const index = this.grados.findIndex((g) => g.idGrado === savedGrado.idGrado);
          if (index !== -1) this.grados[index] = savedGrado;
          this.showMessage('success', 'Actualizado', 'Grado actualizado exitosamente');
        } else {
          this.grados.push(savedGrado);
          this.showMessage('success', 'Creado', 'Grado creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el grado'),
    });
  }

  deleteGrado(grado: IGrado): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el grado "${grado.grado}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gradoService.delete(grado.idGrado).subscribe({
          next: () => {
            this.grados = this.grados.filter((g) => g.idGrado !== grado.idGrado);
            this.showMessage('success', 'Eliminado', 'Grado eliminado con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar el grado'),
        });
      },
    });
  }

  toggleEstado(grado: IGrado): void {
    grado.estatus = !grado.estatus;
    this.gradoService.update(grado.idGrado, grado).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado del grado fue ${grado.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado del grado'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
