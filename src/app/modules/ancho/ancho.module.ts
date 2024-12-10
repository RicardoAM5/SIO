import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminAnchoComponent } from './components/admin-ancho/admin-ancho.component';
import {  RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AdminAnchoComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
    exports: [
        AdminAnchoComponent,
    ],
    providers: [
        MessageService,

    ]
})
export class AnchoModule {}