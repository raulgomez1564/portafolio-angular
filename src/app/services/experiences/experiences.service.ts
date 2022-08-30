import { Injectable } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { FetchService } from '../FetchService';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService extends FetchService<Job> {
  uri = "https://shielded-wildwood-94592.herokuapp.com";
  ednpoint = "/job/";
}
