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
                        icon: 'pi pi-users',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Productos',
                        icon: 'pi pi-truck',
                        routerLink: ['/ancho'],
                    },
                ],
            },
            {
                label: 'Planificacion OC',
                items: [
                    {
                        label: 'RM',
                        icon: 'pi pi-box',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Grupos',
                        icon: 'pi pi-tags',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Generacion OC',
                        icon: 'pi pi-tags',
                        routerLink: ['/ancho'],
                    },
                    
                ],
            },
            {
                label: 'Administración',
                items: [
                    {
                        label: 'Firmado y Sellado',
                        icon: 'pi pi-box',
                        routerLink: ['/ancho'],
                    },

                ],
                
            },
            {
                label: 'Control',
                items: [
                    {
                        label: 'Tipos',
                        icon: 'pi pi-shopping-cart',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Clases',
                        icon: 'pi pi-chart-line',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Calibres',
                        icon: 'pi pi-dollar',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Gramajes',
                        icon: 'pi pi-briefcase',
                        routerLink: ['/ancho'],
                    },
                    {
                        label: 'Molinos',
                        icon: 'pi pi-briefcase',
                        routerLink: ['/ancho'],
                    },   
                    {
                        label: 'Grado',
                        icon: 'pi pi-briefcase',
                        routerLink: ['/ancho'],
                    },   
                    {
                        label: 'Categorias',
                        icon: 'pi pi-briefcase',
                        routerLink: ['/ancho'],
                    },   
                    {
                        label: 'Divisiones',
                        icon: 'pi pi-briefcase',
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
