import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './modules/ancho/ancho.module'
                                ).then((m) => m.AnchoModule),
                        },
                        {
                            path: 'productos-maestros',
                            loadChildren: () =>
                                import(
                                    './modules/ancho/ancho.module'
                                ).then((m) => m.AnchoModule),
                        },
                        {
                            path: 'productos',
                            loadChildren: () =>
                                import(
                                    './modules/ancho/ancho.module'
                                ).then((m) => m.AnchoModule),
                        },
                        {
                            path: 'ancho',
                            loadChildren: () =>
                                import(
                                    './modules/ancho/ancho.module'
                                ).then((m) => m.AnchoModule),
                        },
                        {
                            path: 'ancho',
                            loadChildren: () =>
                                import(
                                    './modules/ancho/ancho.module'
                                ).then((m) => m.AnchoModule),
                        },
                        {
                            path: 'ancho/venta',
                            loadChildren: () =>
                                import(
                                    './modules/ancho/ancho.module'
                                ).then((m) => m.AnchoModule),
                        },
                        {
                            path: 'ancho',
                            loadChildren: () =>
                                import(
                                    './modules/ancho/ancho.module'
                                ).then((m) => m.AnchoModule),
                        },
             
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
