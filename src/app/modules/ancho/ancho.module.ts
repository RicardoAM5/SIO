import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { AdminAnchoComponent } from './components/admin-ancho/admin-ancho.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AnchoRoutingModule } from './ancho-routing.module';
import {  MessageService } from 'primeng/api';
import { PrimeNgModule } from 'src/app/components/shared/prime-ng.module';


@NgModule({
  declarations: [
    AdminAnchoComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    AnchoRoutingModule,
    PrimeNgModule,


  ],
  exports: [
    AdminAnchoComponent,
    AnchoRoutingModule
  ],
  providers: [
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnchoModule {}