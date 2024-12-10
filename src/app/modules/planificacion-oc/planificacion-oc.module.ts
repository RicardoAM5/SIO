import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import {  MessageService } from 'primeng/api';
import { PrimeNgModule } from 'src/app/modules/shared/prime-ng.module';
import { AdminGeneracionOcComponent } from './components/generacionOC/admin-generacion-oc/admin-generacion-oc.component';
import { AdminGruposComponent } from './components/grupos/admin-grupos/admin-grupos.component';
import { AdminRmComponent } from './components/rm/admin-rm/admin-rm.component';
import { PlanificacionOCRoutingModule } from './planificacion-oc-routing.module';


@NgModule({
  declarations: [
    AdminGeneracionOcComponent,
    AdminGruposComponent,
    AdminRmComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    PrimeNgModule,
  ],
  exports: [
    PlanificacionOCRoutingModule
  ],
  providers: [
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlanificacionOCModule {}
