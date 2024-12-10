import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import {  MessageService } from 'primeng/api';
import { PrimeNgModule } from 'src/app/modules/shared/prime-ng.module';
import { AdminProductoComponent } from './productos/admin-producto/admin-producto.component';
import { AdminProductoMaestroComponent } from './productos-maestros/admin-producto-maestro/admin-producto-maestro.component';
import { CatalogosRoutingModule } from './catalogos-routing.module';


@NgModule({
  declarations: [
    AdminProductoComponent,
    AdminProductoMaestroComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    PrimeNgModule,
  ],
  exports: [
    CatalogosRoutingModule
  ],
  providers: [
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CatalogosModule {}
