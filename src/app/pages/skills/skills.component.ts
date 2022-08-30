import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/Skill';
import { SkillsService } from 'src/app/services/skills/skills.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: Array<{
    id: number,
    porcent: number,
    description: string,
  }> = []

  showAddableItem = false

  constructor(public authService: AuthService,public skillsService: SkillsService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchSkills();
  }

  private async fetchSkills() {
    let response: null | [Skill] = await this.skillsService.get();
    if (response) {
      this.skills = response.map(education => {
        return {
          id: education.id!,
          porcent:education.domain,
          description:education.name
        };
      });
    }
  }

  async deleteSkill(id: number) {
    let success: boolean = await this.skillsService.delete(id)

    if(success){
      this.skills = this.skills.filter(function (skill) {
        return skill.id != id;
      });
    }
  }
  
  async saveNewSkill(formData: {
    "porcent": number,
    "description": string,
  }) {
    let success: boolean = await this.skillsService.post({
      domain: formData.porcent,
      name: formData.description,
    })
    if(success){
      this.fetchSkills()
      this.showAddableItem = false
    }
  }

  addNewSkill() {
    this.showAddableItem = true
  }

  cancelNewSkill() {
    this.showAddableItem = false
  }
}
