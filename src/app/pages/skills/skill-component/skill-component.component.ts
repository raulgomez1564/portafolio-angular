import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SkillsService } from 'src/app/services/skills/skills.service';

@Component({
  selector: 'app-skill-component',
  templateUrl: './skill-component.component.html',
  styleUrls: ['./skill-component.component.scss']
})
export class SkillComponentComponent implements OnInit {
  @Input() id: number = 0
  @Input() defaultPorcent: number = 0
  @Input() defaultDescription: string = ""
  formEdited: boolean = false;

  @Output() deleteEvent = new EventEmitter()
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, public authService: AuthService,
    public skillsService: SkillsService) {
    this.form = this.formBuilder.group({
      porcent: [null, [Validators.required]],
      description: [null]
    })
  }

  ngOnInit(): void {
  }


  async formSend() {
    let success: boolean = await this.skillsService.put({
      id: this.id,
      domain: this.form.get("porcent")?.value,
      name: this.form.get("description")?.value,
    }, this.id)

    if (success) {
      this.defaultPorcent = this.form.get("porcent")?.value
      this.defaultDescription = this.form.get("description")?.value
      this.formEdited = false;
    }
  }

  editForm() {
    this.form.setValue({
      porcent: this.defaultPorcent,
      description: this.defaultDescription,
    })
    this.formEdited = true;
  }

  cancelForm() {
    this.formEdited = false;
  }

  formDelete() {
    this.deleteEvent.emit(this.id)
  }
}
