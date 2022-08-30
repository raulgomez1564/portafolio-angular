import { Injectable } from '@angular/core';
import { Education } from 'src/app/models/Education';
import { Skill } from 'src/app/models/Skill';
import { FetchService } from '../FetchService';

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends FetchService<Skill> {
  uri = "https://shielded-wildwood-94592.herokuapp.com";
  ednpoint = "/skill/";
}
