import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-circle',
  templateUrl: './new-circle.component.html',
  styleUrls: ['./new-circle.component.scss']
})
export class NewCircleComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter()
  @Output() saveEvent = new EventEmitter()

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      porcent: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  formSend() {
    let formData = {
      "porcent" : this.form.get("porcent")?.value,
      "description" : this.form.get("description")?.value,
    }
    this.saveEvent.emit(formData)
  }

  cancelEdition() {
    this.cancelEvent.emit()
  }
}
