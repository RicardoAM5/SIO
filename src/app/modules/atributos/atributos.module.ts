import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { AdminAnchoComponent } from './components/ancho/admin-ancho/admin-ancho.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import {  MessageService } from 'primeng/api';
import { PrimeNgModule } from 'src/app/modules/shared/prime-ng.module';
import {  AtributosRoutingModule } from './atributos-routing.module';
import { AdminCalibreComponent } from './components/calibre/admin-calibre/admin-calibre.component';
import { AdminCategoriaComponent } from './components/categoria/admin-categoria/admin-categoria.component';
import { AdminClaseComponent } from './components/clase/admin-clase/admin-clase.component';
import { AdminClasificacionComponent } from './components/clasificacion/admin-clasificacion/admin-clasificacion.component';
import { AdminDivisionComponent } from './components/division/admin-division/admin-division.component';
import { AdminGradoComponent } from './components/grado/admin-grado/admin-grado.component';
import { AdminGramajeComponent } from './components/gramaje/admin-gramaje/admin-gramaje.component';
import { AdminMolinoComponent } from './components/molino/admin-molino/admin-molino.component';
import { AdminTipoComponent } from './components/tipo/admin-tipos/admin-tipos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AdminAnchoComponent,
    AdminCalibreComponent,
    AdminCategoriaComponent,
    AdminClaseComponent,
    AdminClasificacionComponent,
    AdminDivisionComponent,
    AdminGradoComponent,
    AdminGramajeComponent,
    AdminMolinoComponent,
    AdminTipoComponent
    
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    PrimeNgModule,
    AtributosRoutingModule
  ],
  exports: [
    AtributosRoutingModule
  ],
  providers: [
    MessageService,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AtributosModule {}
