import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ReactiveFormsModule,
    ],
    providers: [MessageService],
})
export class CrudComponent<T extends { id?: number }>
    implements OnInit, OnChanges
{
    @Input() data: T[] = [];
    @Input() cols: { field: string; header: string }[] = [];
    @Input() globalFilterFields: any[] = [];
    @Input() tableTitle: string = '';
    @Input() dialogFields: any;
    @Input() loading: boolean = false;
    @Input() modulo: string = '';

    @Output() save = new EventEmitter<T>();
    @Output() delete = new EventEmitter<T>();
    @Output() edit = new EventEmitter<T>();
    @Output() deleteSelected = new EventEmitter<T[]>();

    itemDialog: boolean = false;
    deleteItemDialog: boolean = false;
    deleteItemsDialog: boolean = false;
    isEditMode: boolean = false;
    currentItem: any = {};
    selectedItems: T[] = [];
    item: T | undefined;
    submitted: boolean = false;
    form: FormGroup;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
        this.form = this.fb.group({});
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {}

    openDialog(isEdit: boolean, item: any = null): void {
        this.isEditMode = isEdit;
        this.currentItem = isEdit ? { ...item } : ({} as T);
        this.setupForm();
        this.itemDialog = true;
    }

    setupForm(): void {
        this.form.reset();

        const controls = this.dialogFields.reduce((acc, field) => {
            const control = this.isEditMode
                ? [
                      this.currentItem[field.key] || '',
                      field.required ? Validators.required : null,
                  ]
                : ['', field.required ? Validators.required : null];
            acc[field.key] = control;
            return acc;
        }, {});

        this.form = this.fb.group(controls);
    }

    agregar() {
        this.openDialog(false);
    }

    editItem(item: T) {
        this.openDialog(true, item);
        this.edit.emit(item);
    }

    deleteItem(item: T) {
        this.deleteItemDialog = true;
        this.item = item;
    }

    deleteSelectedItems() {
        this.deleteItemsDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteItemsDialog = false;
        this.deleteSelected.emit(this.selectedItems);
        this.selectedItems = [];
    }

    confirmDelete() {
        this.deleteItemDialog = false;
        if (this.item) {
            this.delete.emit(this.item);
        }
        this.item = undefined;
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
    }

    saveItem() {
        this.submitted = true;

        if ((this.currentItem as any).name?.trim()) {
            this.itemDialog = false;
            this.save.emit(this.currentItem);
            this.currentItem = {} as T;
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    isNestedField(item: any, field: string): boolean {
        const keys = field.split('.');
        let value = item;

        for (let key of keys) {
            if (value && value.hasOwnProperty(key)) {
                value = value[key];
            } else {
                return false;
            }
        }
        return true;
    }

    getNestedFieldValue(item: any, field: string): any {
        const keys = field.split('.');
        let value = item;

        for (let key of keys) {
            if (value && value.hasOwnProperty(key)) {
                value = value[key];
            } else {
                return null;
            }
        }
        return value;
    }
}
