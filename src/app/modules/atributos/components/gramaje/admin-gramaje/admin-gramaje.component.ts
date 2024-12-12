import { Component, OnInit } from '@angular/core';
import { GramajeService } from 'src/app/core/services/gramaje.service';
import { IGramaje } from 'src/app/core/models/IGramaje.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-gramaje',
  templateUrl: './admin-gramaje.component.html',
  styleUrls: ['./admin-gramaje.component.css'],
  providers: [MessageService],
})
export class AdminGramajeComponent implements OnInit {
  public gramajes: IGramaje[] = [];
  public cols = [
    { field: 'gramaje', header: 'Gramaje' },
    { field: 'sufijo', header: 'Sufijo' },
    { field: 'estatus', header: 'Estatus' },
  ];
  public globalFilterFields = ['gramaje', 'sufijo', 'estado'];
  public tableTitle = 'Gestión de Gramajes';
  public dialogFields = [
    { key: 'gramaje', label: 'Gramaje', type: 'number', required: true },
    { key: 'sufijo', label: 'Sufijo', type: 'text', required: true },
    { key: 'estatus', label: 'Estatus', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Gramajes';

  constructor(
    private gramajeService: GramajeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllGramajes();
  }

  getAllGramajes(): void {
    this.gramajeService.getAll().subscribe({
      next: (data) => (this.gramajes = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los gramajes'),
    });
  }

  saveGramaje(gramaje: IGramaje): void {
    const saveOperation = gramaje.idGramaje
      ? this.gramajeService.update(gramaje.idGramaje, gramaje)
      : this.gramajeService.save(gramaje);

    saveOperation.subscribe({
      next: (savedGramaje) => {
        if (gramaje.idGramaje) {
          const index = this.gramajes.findIndex((g) => g.idGramaje === savedGramaje.idGramaje);
          if (index !== -1) this.gramajes[index] = savedGramaje;
          this.showMessage('success', 'Actualizado', 'Gramaje actualizado exitosamente');
        } else {
          this.gramajes.push(savedGramaje);
          this.showMessage('success', 'Creado', 'Gramaje creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el gramaje'),
    });
  }

  deleteGramaje(gramaje: IGramaje): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el gramaje "${gramaje.gramaje}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gramajeService.delete(gramaje.idGramaje).subscribe({
          next: () => {
            this.gramajes = this.gramajes.filter((g) => g.idGramaje !== gramaje.idGramaje);
            this.showMessage('success', 'Eliminado', 'Gramaje eliminado con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar el gramaje'),
        });
      },
    });
  }

  toggleEstado(gramaje: IGramaje): void {
    gramaje.estatus = !gramaje.estatus;
    this.gramajeService.update(gramaje.idGramaje, gramaje).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado del gramaje fue ${gramaje.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estatus del gramaje'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
