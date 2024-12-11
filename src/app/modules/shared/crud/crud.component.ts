import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { PrimeNgModule } from '../prime-ng.module';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    standalone: true,
    imports: [PrimeNgModule],
})
export class CrudComponent<T extends { id?: number; estatus?: boolean }>
    implements OnInit
{
    @Input() data: T[] = [];
    @Input() cols: { field: string; header: string }[] = [];
    @Input() globalFilterFields: string[] = [];
    @Input() tableTitle: string = '';
    @Input() dialogFields: any[] = [];
    @Input() modulo: string = '';

    @Output() save = new EventEmitter<T>();
    @Output() delete = new EventEmitter<T>();
    @Output() toggleEstatus = new EventEmitter<T>();

    itemDialog: boolean = false;
    form: FormGroup;
    submitted: boolean = false;
    currentItem: T | null = null;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
        this.form = this.fb.group({});
    }

    ngOnInit(): void {
        this.setupForm();
    }

    setupForm(): void {
        const controls = this.dialogFields.reduce((acc, field) => {
            acc[field.key] = ['', field.required ? Validators.required : null];
            return acc;
        }, {});
        this.form = this.fb.group(controls);
    }

    onGlobalFilter(table: Table, event: Event): void {
        const value = (event.target as HTMLInputElement).value.trim();
        table.filterGlobal(value, 'contains');
    }

    openDialog(isEdit: boolean, item?: T): void {
        this.itemDialog = true;
        this.submitted = false;
        if (isEdit && item) {
            this.currentItem = { ...item };
            this.form.patchValue(item);
        } else {
            this.form.reset();
            this.currentItem = null;
        }
    }

    saveItem(): void {
        this.submitted = true;
        if (this.form.invalid) return;

        const itemToSave = this.currentItem
            ? { ...this.currentItem, ...this.form.value }
            : { ...this.form.value };

        this.save.emit(itemToSave as T);
        this.itemDialog = false;
    }

    toggleItemEstatus(item: T): void {
        this.toggleEstatus.emit(item);
    }

    deleteItem(item: T): void {
        this.delete.emit(item);
    }

    hideDialog(): void {
        this.itemDialog = false;
        this.submitted = false;
    }

    isNestedField(item: any, field: string): boolean {
        return field.includes('.');
    }

    getNestedFieldValue(item: any, field: string): any {
        return field.split('.').reduce((acc, key) => acc?.[key], item);
    }
}
