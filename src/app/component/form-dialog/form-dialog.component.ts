import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form } from 'src/app/models/form.model';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  title: string = '';
  formGroup!: FormGroup;
  dialogData: any;
  showForm: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private formBuilder: FormBuilder,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) private data: FormDialogData,
  ) {
    switch (data.mode) {
      case 'add':
        this.title = 'Adicionar formulário'
        this.createForm(new Form())
        break;
      case 'edit':
        this.title = 'Editar formulário'
        this.createForm(this.data.form)
        break;
      case 'delete':
        this.title = 'Deletar formulário'
        this.createForm(this.data.form)
        this.showForm = false
        break;

      default:
        break;

    }
    this.dialogData = data
  }

  ngOnInit(): void {
  }

  createForm(form: Form) {
    this.formGroup = this.formBuilder.group({
      id: [form.id],
      name: [form.name],
      description: [form.description],
      expiredAt: [form.expiredAt],
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    switch (this.dialogData.mode) {
      case 'add':
        this.formService.createForm(this.formGroup.value).subscribe(() => {
          this.dialogRef.close({
            refresh: true,
          });
        })
        break;
      case 'edit':
        this.formService.editForm(this.formGroup.value).subscribe(() => {
          this.dialogRef.close({
            refresh: true,
          });
        })
        break;
      case 'delete':
        this.formService.deleteForm(this.formGroup.value).subscribe(() => {
          this.dialogRef.close({
            refresh: true,
          });
        })
        break;

      default:
        break;
    }
  }

}

export interface FormDialogData {
  mode: string;
  form: Form;
}
