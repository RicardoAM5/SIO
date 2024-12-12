import { Component, OnInit } from '@angular/core';
import { IEstadisticaDTO,IProductoConsumoDTO,IProducotCompletoDTO } from 'src/app/core/models-dto/IEstadisticaDTO';
import { EstadisticaService } from 'src/app/core/services/estadistica.service';

@Component({
  selector: 'app-admin-rm',
  templateUrl: './admin-rm.component.html',
  styleUrls: ['./admin-rm.component.css'],
})
export class AdminRmComponent implements OnInit {
  estadisticas: IEstadisticaDTO[] = [];
  columns = [
    { field: 'producto.idProductoMaestro', header: 'ID Producto Maestro', visible: true },
    { field: 'producto.tipo', header: 'Tipo', visible: true },
    { field: 'producto.clase', header: 'Clase', visible: true },
    { field: 'producto.molino', header: 'Molino', visible: true },
    { field: 'producto.grado', header: 'Grado', visible: true },
    { field: 'producto.clasificacion', header: 'Clasificación', visible: true },
    { field: 'producto.inventario', header: 'Inventario', visible: true },
    { field: 'sumatoria', header: 'Sumatoria', visible: true },
    { field: 'media', header: 'Media', visible: true },
    { field: 'pronosticoLineal', header: 'Pronóstico Lineal', visible: true },
  ];

  showConsumos = false; // Control para mostrar u ocultar consumos

  constructor(private estadisticaService: EstadisticaService) {}

  ngOnInit() {
    this.getAllEstadisticas();
  }

  getAllEstadisticas(): void {
    this.estadisticaService.getAll().subscribe({
      next: (data) => {
       // this.estadisticas = data;
      },
      error: () => console.error('Error al cargar las estadísticas'),
    });
  }
}
