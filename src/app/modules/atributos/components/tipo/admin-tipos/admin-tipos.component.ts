import { Component, OnInit } from '@angular/core';
import { TipoService } from 'src/app/core/services/tipo.service';
import { ITipo } from 'src/app/core/models/ITipo.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-tipo',
  templateUrl: './admin-tipos.component.html',
  styleUrls: ['./admin-tipos.component.css'],
  providers: [MessageService],
})
export class AdminTipoComponent implements OnInit {
  public tipos: ITipo[] = [];
  public cols = [
    { field: 'tipo', header: 'Tipo' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estatus', header: 'Estado' },
  ];
  public globalFilterFields = ['tipo', 'descripcion', 'estatus'];
  public tableTitle = 'Gestión de Tipos';
  public dialogFields = [
    { key: 'tipo', label: 'Tipo', type: 'text', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'estatus', label: 'Estado', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Tipos';

  constructor(
    private tipoService: TipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllTipos();
  }

  getAllTipos(): void {
    this.tipoService.getAll().subscribe({
      next: (data) => (this.tipos = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los tipos'),
    });
  }

  saveTipo(tipo: ITipo): void {
    const saveOperation = tipo.idTipo
      ? this.tipoService.update(tipo.idTipo, tipo)
      : this.tipoService.save(tipo);

    saveOperation.subscribe({
      next: (savedTipo) => {
        if (tipo.idTipo) {
          const index = this.tipos.findIndex((t) => t.idTipo === savedTipo.idTipo);
          if (index !== -1) this.tipos[index] = savedTipo;
          this.showMessage('success', 'Actualizado', 'Tipo actualizado exitosamente');
        } else {
          this.tipos.push(savedTipo);
          this.showMessage('success', 'Creado', 'Tipo creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el tipo'),
    });
  }

  deleteTipo(tipo: ITipo): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el tipo "${tipo.tipo}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tipoService.delete(tipo.idTipo).subscribe({
          next: () => {
            this.tipos = this.tipos.filter((t) => t.idTipo !== tipo.idTipo);
            this.showMessage('success', 'Eliminado', 'Tipo eliminado con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar el tipo'),
        });
      },
    });
  }

  toggleEstado(tipo: ITipo): void {
    tipo.estatus = !tipo.estatus;
    this.tipoService.update(tipo.idTipo, tipo).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado del tipo fue ${tipo.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado del tipo'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
