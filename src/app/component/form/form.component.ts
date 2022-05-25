import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Form } from '../../models/form.model';
import { FormService } from '../../service/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  forms: Form[] = []
  displayedColumns: string[] = ['id', 'name', 'description', 'expiredAt'];

  // @ViewChild(MatTable) table: MatTable<any>;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.formService.getForms().subscribe(data => {
      this.forms = data
    })
    // this.table.renderRows();
  }

}
