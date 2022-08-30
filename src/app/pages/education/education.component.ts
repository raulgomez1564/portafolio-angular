import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education/education.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations: Array<{
    id: number,
    defaultSince: string,
    defaultUntil: string,
    defaultName: string,
    defaultTittle: string,
    defaultDescription: string,
  }> = []

  showAddableItem = false

  constructor(public authService: AuthService,public educationService: EducationService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchEducation();
  }

  private async fetchEducation() {
    let response: null | [Education] = await this.educationService.get();
    if (response) {
      this.educations = response.map(education => {
        return {
          id: education.id!,
          defaultSince: education.since,
          defaultUntil: education.until,
          defaultName: education.institute,
          defaultTittle: education.tittle,
          defaultDescription: education.description
        };
      });
    }
  }

  async deleteEducation(id: number) {
    let success: boolean = await this.educationService.delete(id)

    if(success){
      this.educations = this.educations.filter(function (education) {
        return education.id != id;
      });
    }
  }

  async saveNewEducation(formData: {
    "since": string,
    "until": string,
    "name": string,
    "tittle": string,
    "description": string
  }) {
    let success: boolean = await this.educationService.post({
      until:formData.until,
      since:formData.since,
      institute:formData.name,
      tittle:formData.tittle,
      description:formData.description
    })

    if(success){
      this.fetchEducation()
      this.showAddableItem = false
    }
  }

  addNewEducation() {
    this.showAddableItem = true
  }

  cancelNewEducation() {
    this.showAddableItem = false
  }
}
