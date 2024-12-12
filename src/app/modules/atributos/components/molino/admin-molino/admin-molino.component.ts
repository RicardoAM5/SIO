import { Component, OnInit } from '@angular/core';
import { MolinoService } from 'src/app/core/services/molino.service';
import { IMolino } from 'src/app/core/models/IMolino.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-molino',
  templateUrl: './admin-molino.component.html',
  styleUrls: ['./admin-molino.component.css'],
  providers: [MessageService],
})
export class AdminMolinoComponent implements OnInit {
  public molinos: IMolino[] = [];
  public cols = [
    { field: 'molino', header: 'Molino' },
    { field: 'eta', header: 'ETA' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estatus', header: 'Estado' },
  ];
  public globalFilterFields = ['molino', 'eta', 'descripcion', 'estatus'];
  public tableTitle = 'Gestión de Molinos';
  public dialogFields = [
    { key: 'molino', label: 'Molino', type: 'text', required: true },
    { key: 'eta', label: 'ETA', type: 'number', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'estatus', label: 'Estado', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Molinos';

  constructor(
    private molinoService: MolinoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllMolinos();
  }

  getAllMolinos(): void {
    this.molinoService.getAll().subscribe({
      next: (data) => (this.molinos = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los molinos'),
    });
  }

  saveMolino(molino: IMolino): void {
    const saveOperation = molino.idMolino
      ? this.molinoService.update(molino.idMolino, molino)
      : this.molinoService.save(molino);

    saveOperation.subscribe({
      next: (savedMolino) => {
        if (molino.idMolino) {
          const index = this.molinos.findIndex((m) => m.idMolino === savedMolino.idMolino);
          if (index !== -1) this.molinos[index] = savedMolino;
          this.showMessage('success', 'Actualizado', 'Molino actualizado exitosamente');
        } else {
          this.molinos.push(savedMolino);
          this.showMessage('success', 'Creado', 'Molino creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el molino'),
    });
  }

  deleteMolino(molino: IMolino): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el molino "${molino.molino}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.molinoService.delete(molino.idMolino).subscribe({
          next: () => {
            this.molinos = this.molinos.filter((m) => m.idMolino !== molino.idMolino);
            this.showMessage('success', 'Eliminado', 'Molino eliminado con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar el molino'),
        });
      },
    });
  }

  toggleEstado(molino: IMolino): void {
    molino.estatus = !molino.estatus;
    this.molinoService.update(molino.idMolino, molino).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado del molino fue ${molino.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado del molino'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
