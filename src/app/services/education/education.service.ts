import { Injectable } from '@angular/core';
import { Education } from 'src/app/models/Education';
import { FetchService } from '../FetchService';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends FetchService<Education> {
  uri = "https://shielded-wildwood-94592.herokuapp.com";
  ednpoint = "/education/";
}
