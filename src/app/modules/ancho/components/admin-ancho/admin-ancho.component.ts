import { Component, OnInit } from '@angular/core';
import { AnchoService } from 'src/app/core/services/ancho.service';
import { IAncho } from 'src/app/core/models/IAncho.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-ancho',
  templateUrl: './admin-ancho.component.html',
  styleUrls: ['./admin-ancho.component.css'],
  providers: [MessageService],
})
export class AdminAnchoComponent implements OnInit {
  public anchos: IAncho[] = [];
  public selectedAnchos: IAncho[] = [];
  public anchoDialog: boolean = false;
  public ancho: IAncho = {
    idAncho: 0,
    ancho: 0,
    sufijo: '',
    estatus: true,
  };
  public submitted: boolean = false;

  constructor(
    private anchoService: AnchoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});

    this.getAllAnchos();
  }

  // Obtener todos los anchos
  getAllAnchos() {
    this.anchoService.getAllAncho().subscribe({
      next: (data) => {
        this.anchos = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los anchos',
        });
        console.error(err);
      },
    });
  }

  // Abrir diálogo para crear un nuevo ancho
  openNew() {
    this.ancho = {
      idAncho: 0,
      ancho: 0,
      sufijo: '',
      estatus: true,
    };
    this.submitted = false;
    this.anchoDialog = true;
  }

  // Guardar un ancho (nuevo o editado)
  saveAncho() {
    this.submitted = true;

    if (this.ancho.ancho > 0 && this.ancho.sufijo.trim()) {
      if (this.ancho.idAncho === 0) {
        // Crear nuevo ancho
        this.anchoService.saveAncho(this.ancho).subscribe({
          next: (data) => {
            this.anchos.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Ancho creado',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear el ancho',
            });
            console.error(err);
          },
        });
      } else {
        // Editar ancho existente
        this.anchoService.updateAncho(this.ancho.idAncho, this.ancho).subscribe({
          next: (data) => {
            const index = this.anchos.findIndex((a) => a.idAncho === data.idAncho);
            if (index !== -1) {
              this.anchos[index] = data;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Ancho actualizado',
            });
            console.log("Ancho actualizado", data);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el ancho',
            });
            console.error(err);
          },
        });
      }

      this.anchos = [...this.anchos]; // Refrescar la tabla
      this.anchoDialog = false;
      this.ancho = {
        idAncho: 0,
        ancho: 0,
        sufijo: '',
        estatus: true,
      };
    }
  }

  // Editar un ancho
  editAncho(ancho: IAncho) {
    this.ancho = { ...ancho };
    this.anchoDialog = true;
  }

  // Eliminar anchos seleccionados
  deleteSelectedAnchos() {
    if (this.selectedAnchos.length > 0) {
      this.selectedAnchos.forEach((ancho) => {
        this.anchoService.deleteAncho(ancho.idAncho).subscribe({
          next: () => {
            this.anchos = this.anchos.filter((a) => a.idAncho !== ancho.idAncho);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el ancho',
            });
            console.error(err);
          },
        });
      });
      this.selectedAnchos = [];
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Anchos eliminados',
      });
    }
  }

  // Eliminar un ancho
  deleteAncho(ancho: IAncho) {
    this.anchoService.deleteAncho(ancho.idAncho).subscribe({
      next: () => {
        this.anchos = this.anchos.filter((a) => a.idAncho !== ancho.idAncho);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Ancho eliminado',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el ancho',
        });
        console.error(err);
      },
    });
  }

  // Cerrar diálogo
  hideDialog() {
    this.anchoDialog = false;
    this.submitted = false;
  }
}
