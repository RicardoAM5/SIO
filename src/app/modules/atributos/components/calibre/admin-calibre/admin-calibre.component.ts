import { Component, OnInit } from '@angular/core';
import { CalibreService } from 'src/app/core/services/calibre.service';
import { ICalibre } from 'src/app/core/models/ICalibre.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-calibre',
  templateUrl: './admin-calibre.component.html',
  styleUrls: ['./admin-calibre.component.css'],
  providers: [MessageService],
})
export class AdminCalibreComponent implements OnInit {
  public calibres: ICalibre[] = [];
  public cols = [
    { field: 'calibre', header: 'Calibre' },
    { field: 'sufijo', header: 'Sufijo' },
    { field: 'estatus', header: 'Estatus' },
  ];
  public globalFilterFields = ['calibre', 'sufijo', 'estado'];
  public tableTitle = 'Gestión de Calibres';
  public dialogFields = [
    { key: 'calibre', label: 'Calibre', type: 'number', required: true },
    { key: 'sufijo', label: 'Sufijo', type: 'text', required: true },
    { key: 'estatus', label: 'Estatus', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  public modulo = 'Calibres';

  constructor(
    private calibreService: CalibreService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllCalibres();
  }

  getAllCalibres(): void {
    this.calibreService.getAll().subscribe({
      next: (data) => (this.calibres = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los calibres'),
    });
  }

  saveCalibre(calibre: ICalibre): void {
    const saveOperation = calibre.idCalibre
      ? this.calibreService.update(calibre.idCalibre, calibre)
      : this.calibreService.save(calibre);

    saveOperation.subscribe({
      next: (savedCalibre) => {
        if (calibre.idCalibre) {
          const index = this.calibres.findIndex((c) => c.idCalibre === savedCalibre.idCalibre);
          if (index !== -1) this.calibres[index] = savedCalibre;
          this.showMessage('success', 'Actualizado', 'Calibre actualizado exitosamente');
        } else {
          this.calibres.push(savedCalibre);
          this.showMessage('success', 'Creado', 'Calibre creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el calibre'),
    });
  }

  deleteCalibre(calibre: ICalibre): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el calibre "${calibre.calibre}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.calibreService.delete(calibre.idCalibre).subscribe({
          next: () => {
            this.calibres = this.calibres.filter((c) => c.idCalibre !== calibre.idCalibre);
            this.showMessage('success', 'Eliminado', 'Calibre eliminado con éxito');
          },
          error: () => this.showMessage('error', 'Error', 'Error al eliminar el calibre'),
        });
      },
    });
  }

  toggleEstado(calibre: ICalibre): void {
    calibre.estado = !calibre.estado;
    this.calibreService.update(calibre.idCalibre, calibre).subscribe({
      next: () => {
        this.showMessage(
          'success',
          'Éxito',
          `El estado del calibre fue ${calibre.estado ? 'activado' : 'desactivado'} exitosamente`
        );
      },
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar el estado del calibre'),
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
