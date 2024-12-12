import { Component, OnInit } from '@angular/core';
import { AnchoService } from 'src/app/core/services/ancho.service';
import { IAncho } from 'src/app/core/models/IAncho.interface';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-ancho',
  templateUrl: './admin-ancho.component.html',
  styleUrls: ['./admin-ancho.component.css'],
})
export class AdminAnchoComponent implements OnInit {
  anchos: IAncho[] = [];
  selectedAnchos: IAncho[] = [];
  cols = [
    { field: 'ancho', header: 'Ancho' },
    { field: 'sufijo', header: 'Sufijo' },
    { field: 'estatus', header: 'Estatus' },
  ];
  globalFilterFields = ['ancho', 'sufijo', 'estatus'];
  tableTitle = 'Gestión de Anchos';
  dialogFields = [
    { key: 'ancho', label: 'Ancho', type: 'number', required: true },
    { key: 'sufijo', label: 'Sufijo', type: 'text', required: true },
    { key: 'estatus', label: 'Estatus', type: 'dropdown', options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ] },
  ];
  modulo = 'Administración de Anchos';

  constructor(
    private anchoService: AnchoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllAnchos();
  }

  getAllAnchos(): void {
    this.anchoService.getAll().subscribe({
      next: (data) => (this.anchos = data),
      error: () => this.showMessage('error', 'Error', 'Error al cargar los anchos'),
    });
  }

  saveAncho(ancho: IAncho): void {
    const saveOperation = ancho.idAncho
      ? this.anchoService.update(ancho.idAncho, ancho)
      : this.anchoService.save(ancho);

    saveOperation.subscribe({
      next: (savedAncho) => {
        if (ancho.idAncho) {
          const index = this.anchos.findIndex((a) => a.idAncho === savedAncho.idAncho);
          if (index !== -1) this.anchos[index] = savedAncho;
          this.showMessage('success', 'Actualizado', 'Ancho actualizado exitosamente');
        } else {
          this.anchos.push(savedAncho);
          this.showMessage('success', 'Creado', 'Ancho creado exitosamente');
        }
      },
      error: () => this.showMessage('error', 'Error', 'Error al guardar el ancho'),
    });
  }


  delete(ancho: IAncho): void {
    console.log('deletePhysicalAncho', ancho);

    this.confirmationService.confirm({

      message: `¿Está seguro de que desea eliminar físicamente el ancho "${ancho.ancho}"?<br> Esta acción no se puede deshacer.<br> Esta accion no se realizara si exite una transaccion relacionada con este ancho.`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.anchoService.delete(ancho.idAncho).subscribe({
          next: () => {
            this.anchos = this.anchos.filter((a) => a.idAncho !== ancho.idAncho);
            this.showMessage('success', 'Eliminado', 'Ancho eliminado físicamente con éxito.');
          },
          error: () => {
            this.showMessage('error', 'Error', 'Error al eliminar el ancho físicamente.');
          },
        });
      },
    });
  }
  


  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }

  toggleEstatus(ancho: IAncho): void {
    if (ancho.estatus) {
      // Desactivar
      this.anchoService.disable(ancho.idAncho).subscribe({
        next: () => {
          ancho.estatus = false;
          this.showMessage('success', 'Éxito', `El ancho con ID ${ancho.idAncho} fue desactivado.`);
        },
        error: () => this.showMessage('error', 'Error', `No se pudo desactivar el ancho.`),
      });
    } else {
      // Reactivar
      this.anchoService.active(ancho.idAncho).subscribe({
        next: () => {
          ancho.estatus = true;
          this.showMessage('success', 'Éxito', `El ancho con ID ${ancho.idAncho} fue reactivado.`);
        },
        error: () => this.showMessage('error', 'Error', `No se pudo reactivar el ancho.`),
      });
    }
  }





  updateAncho(ancho: IAncho): void {
    this.anchoService.update(ancho.idAncho, ancho).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `El ancho con ID ${ancho.idAncho} ha sido actualizado.`,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `No se pudo actualizar el ancho con ID ${ancho.idAncho}.`,
        });
      },
    });
  }
}