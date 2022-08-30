import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Array<{
    id: number,
    defaultSince: string,
    defaultUntil: string,
    defaultName: string,
    defaultTittle: string,
    defaultDescription: string,
  }> = []

  showAddableItem = false

  constructor(public authService: AuthService,public projectsService: ProjectsService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchEducation();
  }

  private async fetchEducation() {
    let response: null | [Project] = await this.projectsService.get();
    if (response) {
      this.projects = response.map(project => {
        return {
          id: project.id!,
          defaultSince: project.since,
          defaultUntil: project.until,
          defaultName: project.name,
          defaultTittle: project.tittle,
          defaultDescription: project.description
        };
      });
    }
  }

  async deleteProject(id: number) {
    let success: boolean = await this.projectsService.delete(id)

    if(success){
      this.projects = this.projects.filter(function (project) {
        return project.id != id;
      });
    }
  }

  async saveNewProject(formData: {
    "since": string,
    "until": string,
    "name": string,
    "tittle": string,
    "description": string
  }) {
    let success: boolean = await this.projectsService.post({
      until:formData.until,
      since:formData.since,
      name:formData.name,
      tittle:formData.tittle,
      description:formData.description
    })

    if(success){
      this.fetchEducation()
      this.showAddableItem = false
    }
  }
  
  addNewProject() {
    this.showAddableItem = true
  }

  cancelNewProject() {
    this.showAddableItem = false
  }
}
