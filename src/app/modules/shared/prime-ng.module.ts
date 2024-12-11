import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    ButtonModule,
    
    DropdownModule,
    InputNumberModule,
    ToolbarModule,
    TableModule,
    MenubarModule,
    TagModule,
    InputTextModule,
    DialogModule,
    CheckboxModule,
    CalendarModule,
    ToastModule,
    ConfirmDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PrimeNgModule {}