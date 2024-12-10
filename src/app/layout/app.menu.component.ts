import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Catálogos',
                items: [
                    {
                        label: 'Productos Maestros',
                        icon: 'pi pi-table',
                        routerLink: ['catalogos/producto-maestro'],
                    },
                    {
                        label: 'Productos',
                        icon: 'pi pi-th-large',
                        routerLink: ['catalogos/producto'],
                    },
                ],
            },
            {
                label: 'Planificacion OC',
                items: [
                    {
                        label: 'RM',
                        icon: 'pi pi-chart-line',
                        routerLink: ['planificacion-oc/rm'],
                    },
                    {
                        label: 'Grupos',
                        icon: 'pi pi-sitemap',
                        routerLink: ['planificacion-oc/grupos'],
                    },
                    {
                        label: 'Generacion OC',
                        icon: 'pi pi-cart-plus',
                        routerLink: ['planificacion-oc/oc'],
                    },
                    
                ],
            },
            {
                label: 'Control',
                items: [
                    {
                        label: 'Tipos',
                        routerLink: ['atributos/tipo'],
                    },
                
                    {
                        label: 'Clases',
                        routerLink: ['atributos/clase'],
                    },
                    {
                        label: 'Calibres',
                        routerLink: ['atributos/calibre'],
                    },
                    {
                        label: 'Gramajes',
                        routerLink: ['atributos/gramaje'],
                    },
                    {
                        label: 'Molinos',
                        routerLink: ['atributos/molino'],
                    },   
                    {
                        label: 'Grado',
                        routerLink: ['atributos/grado'],
                    },   
                    {
                        label: 'Anchos',
                        routerLink: ['atributos/ancho'],
                    },   
                    {
                        label: 'Clasificaciones',
                        routerLink: ['atributos/clasificacion'],
                    },
                    {
                        label: 'Categorias',
                        routerLink: ['atributos/categoria'],
                    },   
                    {
                        label: 'Divisiones',
                        routerLink: ['atributos/division'],
                    },  
                ],
            },
            {
                label: 'Analítica',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-chart-bar',
                        routerLink: ['/ancho'],
                    },
                ],
            },
        ];
    }
}
