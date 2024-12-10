import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductoMaestroComponent } from './productos-maestros/admin-producto-maestro/admin-producto-maestro.component';
import { AdminProductoComponent } from './productos/admin-producto/admin-producto.component';

const routes: Routes = [
  { path: '', component: AdminProductoMaestroComponent },
  {path: 'producto-maestro', component:AdminProductoMaestroComponent}, 
  {path: 'producto', component:AdminProductoComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogosRoutingModule {}