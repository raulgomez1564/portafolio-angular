import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { ExperiencesService } from 'src/app/services/experiences/experiences.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {
  experiences: Array<{
    id: number,
    defaultSince: string,
    defaultUntil: string,
    defaultName: string,
    defaultTittle: string,
    defaultDescription: string,
  }> = []
  showAddableItem = false

  constructor(public authService: AuthService,public experiencesService: ExperiencesService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchExperiences();
  }

  private async fetchExperiences() {
    let response: null | [Job] = await this.experiencesService.get();
    if (response) {
      this.experiences = response.map(experience => {
        return {
          id: experience.id!,
          defaultSince: experience.since,
          defaultUntil: experience.until,
          defaultName: experience.company,
          defaultTittle: experience.tittle,
          defaultDescription: experience.description
        };
      });
    }
  }

  async deleteExperience(id: number) {
    let success: boolean = await this.experiencesService.delete(id)

    if(success){
      this.experiences = this.experiences.filter(function (experience) {
        return experience.id != id;
      });
    }
  }

  async saveNewExperience(formData: {
    "since": string,
    "until": string,
    "name": string,
    "tittle": string,
    "description": string
  }) {
    let success: boolean = await this.experiencesService.post({
      until:formData.until,
      since:formData.since,
      company:formData.name,
      tittle:formData.tittle,
      description:formData.description
    })

    if(success){
      this.fetchExperiences()
      this.showAddableItem = false
    }
  }

  addNewExperience() {
    this.showAddableItem = true
  }

  cancelNewExperience() {
    this.showAddableItem = false
  }
}
