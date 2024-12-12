import { Component, OnInit } from '@angular/core';
import { DivisionService } from 'src/app/core/services/division.service';
import { IDivision } from 'src/app/core/models/IDivision.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-division',
  templateUrl: './admin-division.component.html',
  styleUrls: ['./admin-division.component.css'],
  providers: [MessageService],
})
export class AdminDivisionComponent implements OnInit {
  public divisiones: IDivision[] = [];
  public cols = [
    { field: 'division', header: 'División' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estatus', header: 'Estado' },
  ];
  public globalFilterFields = ['division', 'descripcion', 'estatus'];
  public tableTitle = 'Gestión de Divisiones';
  public dialogFields = [
    { key: 'division', label: 'División', type: 'text', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'estatus', label: 'Estado', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Divisiones';

  constructor(
    private divisionService: DivisionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllDivisiones();
  }

  getAllDivisiones(): void {
    this.divisionService.getAll().subscribe({
      next: (data) => (this.divisiones = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar las divisiones'),
    });
  }

  saveDivision(division: IDivision): void {
    const saveOperation = division.idDivision
      ? this.divisionService.update(division.idDivision, division)
      : this.divisionService.save(division);

    saveOperation.subscribe({
      next: (savedDivision) => {
        if (division.idDivision) {
          const index = this.divisiones.findIndex((d) => d.idDivision === savedDivision.idDivision);
          if (index !== -1) this.divisiones[index] = savedDivision;
          this.showMessage('success', 'Actualizado', 'División actualizada exitosamente');
        } else {
          this.divisiones.push(savedDivision);
          this.showMessage('success', 'Creado', 'División creada exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar la división'),
    });
  }

  deleteDivision(division: IDivision): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar la división "${division.division}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.divisionService.delete(division.idDivision).subscribe({
          next: () => {
            this.divisiones = this.divisiones.filter((d) => d.idDivision !== division.idDivision);
            this.showMessage('success', 'Eliminado', 'División eliminada con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar la división'),
        });
      },
    });
  }

  toggleEstado(division: IDivision): void {
    division.estatus = !division.estatus;
    this.divisionService.update(division.idDivision, division).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado de la división fue ${division.estatus ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado de la división'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
