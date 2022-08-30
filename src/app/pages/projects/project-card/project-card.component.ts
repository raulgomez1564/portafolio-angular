import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() id: number = 0
  @Input() defaultSince: string = ""
  @Input() defaultUntil: string = ""
  @Input() defaultName: string = ""
  @Input() defaultTittle: string = ""
  @Input() defaultDescription: string = ""
  formEdited: boolean = false;

  @Output() deleteEvent = new EventEmitter()
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, public authService: AuthService,
    public projectsService: ProjectsService) {
    this.form = this.formBuilder.group({
      since: [null, [Validators.required]],
      until: [null],
      name: [this.defaultName, [Validators.required]],
      tittle: [this.defaultTittle, [Validators.required]],
      description: [this.defaultDescription, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }


  async formSend() {
    let until = "-"
    if (this.form.get("until")?.value) {
      until = this.form.get("until")?.value
      until = new DatePipe('en-US').transform(until, 'MM/yyyy')!
    }
    let since = this.form.get("since")?.value
    since = new DatePipe('en-US').transform(since, 'MM/yyyy')!

    let success: boolean = await this.projectsService.put({
      id: this.id,
      until: until,
      since: since,
      name: this.form.get("name")?.value,
      tittle: this.form.get("tittle")?.value,
      description: this.form.get("description")?.value
    }, this.id
    )

    if (success) {
      this.defaultSince = since
      this.defaultUntil = until
      this.defaultName = this.form.get("name")?.value
      this.defaultTittle = this.form.get("tittle")?.value
      this.defaultDescription = this.form.get("description")?.value
      this.formEdited = false;
    }
  }

  editForm() {
    this.form.setValue({
      name: this.defaultName,
      tittle: this.defaultTittle,
      description: this.defaultDescription,
      since: this.form.get("since")?.value,
      until: this.form.get("until")?.value
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
