import { Injectable } from '@angular/core';
import { Education } from 'src/app/models/Education';
import { Project } from 'src/app/models/Project';
import { FetchService } from '../FetchService';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends FetchService<Project> {
  uri = "https://shielded-wildwood-94592.herokuapp.com";
  ednpoint = "/project/";
}
