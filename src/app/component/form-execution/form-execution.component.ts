import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Field } from 'src/app/models/field.model';
import { FormExecution } from 'src/app/models/form-execution.model';
import { FormField } from 'src/app/models/form-field.model';
import { Form } from 'src/app/models/form.model';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-form-execution',
  templateUrl: './form-execution.component.html',
  styleUrls: ['./form-execution.component.scss']
})
export class FormExecutionComponent implements OnInit {

  form: Form = new Form();
  fields: Field[] = [];
  formFields: any[] = [];
  formExecution: any[] = [];

  constructor(private route: ActivatedRoute,
    private formService: FormService) { }

  ngOnInit(): void {
    this.loadForms()
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
  getFormFields() {
    this.formService.getFormFields(this.form).subscribe(data => {
      this.formFields = data.map(ff => {
        let newff: any = { ...ff }
        newff.fieldDescription = this.fields.find(f => f.id == ff.fieldId)?.type || ''
        if (this.formExecution.length > 0)
          newff.data = this.formExecution.find(fe => fe.formFieldId == ff.id)?.answer || ''
        return newff
      })
      this.getFormExecution()
    })
  }

  getFormExecution() {
    this.formService.getFormExecution(this.form).subscribe(data => {
      this.formExecution = data.map(fe => {
        let formField = this.formFields.find(f => f.id == fe.formFieldId)
        let newfe: any = { ...fe }
        newfe.fieldDescription = formField?.fieldDescription
        newfe.fieldId = formField?.fieldId

        // formField.data = fe.answer ? fe.answer : ''
        return newfe
      })

      console.log('form', this.form)
      console.log('fields', this.fields)
      console.log('formFields', this.formFields)
      console.log('formExecution', this.formExecution)

    })
  }
  saveFields() {
    console.log('formFields', this.formFields)
    console.log('formExecution', this.formExecution)

    this.formExecution = this.formFields.map(field => {
      let execution = new FormExecution()
      execution.id = this.formExecution.find((fe: FormExecution) => fe.formFieldId === field.id)?.id || null
      execution.formId = field.formId
      execution.formFieldId = field.id
      execution.answer = field.data
      return execution
    })

    console.log('new formExecution', this.formExecution)

    this.formService.saveFormExecution(this.formExecution, this.form).subscribe(data => {
      // this.getFormFields()
      // window.location.reload()
    })
  }

  changeValue(data: Event, index: number) {
    console.log(data, index);
    this.formFields[index].data = data

  }
}
