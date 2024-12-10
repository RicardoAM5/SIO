import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtributosModule } from './atributos.module';
import { AdminAnchoComponent } from './components/ancho/admin-ancho/admin-ancho.component';
import { AdminCalibreComponent } from './components/calibre/admin-calibre/admin-calibre.component';
import { AdminCategoriaComponent } from './components/categoria/admin-categoria/admin-categoria.component';
import { AdminClaseComponent } from './components/clase/admin-clase/admin-clase.component';
import { AdminClasificacionComponent } from './components/clasificacion/admin-clasificacion/admin-clasificacion.component';
import { AdminDivisionComponent } from './components/division/admin-division/admin-division.component';
import { AdminGradoComponent } from './components/grado/admin-grado/admin-grado.component';
import { AdminGramajeComponent } from './components/gramaje/admin-gramaje/admin-gramaje.component';
import { AdminMolinoComponent } from './components/molino/admin-molino/admin-molino.component';
import { AdminTiposComponent } from './components/tipo/admin-tipos/admin-tipos.component';

const routes: Routes = [
  { path: '', component: AdminAnchoComponent }, 
  {path: 'ancho', component:AdminAnchoComponent},
  {path: 'calibre', component:AdminCalibreComponent},
  {path: 'categoria', component:AdminCategoriaComponent},
  {path: 'clase', component:AdminClaseComponent},
  {path: 'clasificacion', component:AdminClasificacionComponent},
  {path: 'division', component:AdminDivisionComponent},
  {path: 'grado', component:AdminGradoComponent},
  {path: 'gramaje', component:AdminGramajeComponent},
  {path: 'molino', component:AdminMolinoComponent},
  {path: 'tipo', component:AdminTiposComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtributosRoutingModule {}