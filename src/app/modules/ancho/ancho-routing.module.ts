import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAnchoComponent } from './components/admin-ancho/admin-ancho.component';

const routes: Routes = [
  { path: '', component: AdminAnchoComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnchoRoutingModule {}
