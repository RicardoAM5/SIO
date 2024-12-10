import { NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    CommonModule,
    FormsModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    ConfirmDialogModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    MessageService
  ],
})
export class PrimeNgModule {}
