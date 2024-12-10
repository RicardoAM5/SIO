import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRmComponent } from './components/rm/admin-rm/admin-rm.component';
import { AdminGruposComponent } from './components/grupos/admin-grupos/admin-grupos.component';
import { AdminGeneracionOcComponent } from './components/generacionOC/admin-generacion-oc/admin-generacion-oc.component';

const routes: Routes = [
  { path: '', component: AdminRmComponent },
  {path: 'rm', component: AdminRmComponent}, 
  {path: 'grupos', component: AdminGruposComponent},
  {path: 'oc', component:AdminGeneracionOcComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanificacionOCRoutingModule {}