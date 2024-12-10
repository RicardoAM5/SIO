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
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Productos',
                        icon: 'pi pi-th-large',
                        routerLink: ['/calibre'],
                    },
                ],
            },
            {
                label: 'Planificacion OC',
                items: [
                    {
                        label: 'RM',
                        icon: 'pi pi-chart-line',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Grupos',
                        icon: 'pi pi-sitemap',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Generacion OC',
                        icon: 'pi pi-cart-plus',
                        routerLink: ['/ancho'],
                    },
                    
                ],
            },
            {
                label: 'Administración',
                items: [
                    {
                        label: 'Firmado y Sellado',
                        icon: 'pi pi-file',
                        routerLink: ['/ancho'],
                    },

                ],
                
            },
            {
                label: 'Control',
                items: [
                    {
                        label: 'Tipos',
                        routerLink: ['/ancho'],
                    },
                
                    {
                        label: 'Clases',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Calibres',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Gramajes',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Molinos',
                        routerLink: ['/ancho'],
                    },   
                    {
                        label: 'Grado',
                        routerLink: ['/ancho'],
                    },   
                    {
                        label: 'Anchos',
                        routerLink: ['/ancho'],
                    },   
                    {
                        label: 'Clasificaciones',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Categorias',
                        routerLink: ['/ancho'],
                    },   
                    {
                        label: 'Divisiones',
                        routerLink: ['/ancho'],
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
