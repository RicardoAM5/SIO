import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: 'atributos',
                            loadChildren: () =>import('./modules/atributos/atributos.module').then((m) => m.AtributosModule),
                        },
                        {
                            path: 'catalogos',
                            loadChildren: () =>import('./modules/catalogo-productos/catalogos.module').then((m) => m.CatalogosModule),
                        },
                        {
                            path: 'planificacion-oc',
                            loadChildren: () =>import('./modules/planificacion-oc/planificacion-oc.module').then((m) => m.PlanificacionOCModule),
                        }
                    ],
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
