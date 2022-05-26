import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from 'src/app/models/field.model';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-form-builder-dialog',
  templateUrl: './form-builder-dialog.component.html',
  styleUrls: ['./form-builder-dialog.component.scss']
})
export class FormBuilderDialogComponent implements OnInit {
  title: string = 'Adicionar campo';
  fieldGroup!: FormGroup;
  dialogData: any;

  fields: Field[] = [];
  fieldSelected!: Field;
  constructor(private dialogRef: MatDialogRef<FormBuilderDialogComponent>,
    private formBuilder: FormBuilder,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) private data: any,) {

    this.dialogData = data
  }

  ngOnInit(): void {
    this.loadFields()
    this.fieldGroup = this.formBuilder.group({
      field: [null, [Validators.required]]
    })
  }

  loadFields(): void {
    this.formService.getFields().subscribe(data => {
      this.fields = data
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({
      field: this.fieldGroup.value.field,
    });
  }

}
