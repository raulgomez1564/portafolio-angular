import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter()
  @Output() saveEvent = new EventEmitter()

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      since: [null, [Validators.required]],
      until: [null],
      name: ["", [Validators.required]],
      tittle: ["", [Validators.required]],
      description: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  formSend() {
    let until = "-";
    if (this.form.get("until")?.value) {
      until = this.form.get("until")?.value
      until = new DatePipe('en-US').transform(until, 'MM/yyyy')!
    }

    let formData = {
      "since" : new DatePipe('en-US').transform(this.form.get("since")?.value, 'MM/yyyy')!,
      "until":until,
      "name" : this.form.get("name")?.value,
      "tittle" : this.form.get("tittle")?.value,
      "description" : this.form.get("description")?.value
    }
    this.saveEvent.emit(formData)
  }

  cancelEdition() {
    this.cancelEvent.emit()
  }
}
