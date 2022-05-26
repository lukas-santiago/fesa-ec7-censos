import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Field } from 'src/app/models/field.model';
import { FormField } from 'src/app/models/form-field.model';
import { Form } from 'src/app/models/form.model';
import { FormService } from 'src/app/service/form.service';
import { FormBuilderDialogComponent } from '../form-builder-dialog/form-builder-dialog.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  form: Form = new Form();
  formFields: any[] = [];
  fields: Field[] = [];

  constructor(private route: ActivatedRoute,
    private formService: FormService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadForms()
  }

  openFormDialog(mode: string, form: Form = new Form()): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        mode: mode,
        form
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.refresh)
        this.loadForms()
    });

  }
  loadForms() {
    let formId = Number(this.route.snapshot.paramMap.get('formId'))
    this.formService.getForm(formId).subscribe(form => {
      this.form = form
      this.formService.getFields().subscribe(data => {
        this.fields = data
        this.getFormFields()
      })
    })
  }

  addField(field: Field = new Field()) {
    const dialogRef = this.dialog.open(FormBuilderDialogComponent, {
      data: {
        formField: field
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.field) {
        let formField = {
          formId: this.form.id,
          fieldId: result.field.id,
          fieldDescription: this.fields.find(f => f.id === result.field.id)?.type
        }
        this.formFields.push(formField);
      }
    });

  }

  getFormFields() {
    this.formService.getFormFields(this.form).subscribe(data => {
      this.formFields = data.map(ff => {
        let newff = { ...ff, fieldDescription: '' }
        newff.fieldDescription = this.fields.find(f => f.id == ff.fieldId)?.type || ''
        return newff
      })
    })
  }
  saveFields() {
    let formFields = this.formFields.map(formField => {
      let newFormField = new FormField()
      newFormField.id = formField.id
      newFormField.formId = formField.formId
      newFormField.fieldId = formField.fieldId
      newFormField.description = formField.description
      return newFormField
    })

    this.formService.saveFormFields(formFields, this.form).subscribe(data => {
      console.log(data);
    })
  }

  deleteFormField(formFieldIndex: any) {
    this.formFields.splice(formFieldIndex, 1)
  }
}
