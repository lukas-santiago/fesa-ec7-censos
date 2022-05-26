import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Form } from '../../models/form.model';
import { FormService } from '../../service/form.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  forms: Form[] = []

  constructor(private formService: FormService, private dialog: MatDialog) { }

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
    this.formService.getForms().subscribe(data => {
      this.forms = data
    })
  }



}
