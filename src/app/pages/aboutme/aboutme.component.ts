import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutMe } from 'src/app/models/AboutMe';
import { AboutMeService } from 'src/app/services/about-me/about-me.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss']
})
export class AboutmeComponent implements OnInit {
  id: number = 0

  defaultImageSrc: string = ""
  imageSrc: string = this.defaultImageSrc
  imageEdited: boolean = false;

  defaultName: string = ""
  defaultTittle: string = ""
  defaultDescription: string = ``
  formEdited: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public aboutMeService: AboutMeService) {
    this.form = this.formBuilder.group({
      name: [this.defaultName, [Validators.required]],
      tittle: [this.defaultTittle, [Validators.required]],
      description: [this.defaultDescription, [Validators.required]],
    })
  }

  async ngOnInit(): Promise<void> {
    let response: null | [AboutMe] = await this.aboutMeService.get()

    if (response) {
      for (const aboutMe of response) {
        this.id = aboutMe.id!
        this.defaultName = aboutMe.name
        this.defaultDescription = aboutMe.presentation
        this.defaultTittle = aboutMe.professionalTittle
        this.form.setValue({
          "name":aboutMe.name,
          "description":aboutMe.presentation,
          "tittle":aboutMe.professionalTittle,
        })
      }
    }
    
    let imageResponse:null|string =  await this.aboutMeService.getImage()
    if (imageResponse) {
      this.defaultImageSrc = imageResponse
      this.imageSrc = imageResponse
    }
  }

  async formSend() {
    let success: boolean = await this.aboutMeService.put({
      id: this.id,
      name: this.form.get("name")?.value,
      professionalTittle: this.form.get("tittle")?.value,
      presentation: this.form.get("description")?.value
    }, this.id
    )

    if (success) {
      this.defaultName = this.form.get("name")?.value
      this.defaultTittle = this.form.get("tittle")?.value
      this.defaultDescription = this.form.get("description")?.value
      this.formEdited = false;
    }
  }

  editForm() {
    this.formEdited = true;
  }

  cancelForm() {
    this.formEdited = false;
  }

  imgInputChange(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      const file = fileInputEvent.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result && typeof reader.result === "string") {
          this.imageSrc = reader.result
          this.imageEdited = true;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  cancelImageEdition() {
    this.imageSrc = this.defaultImageSrc
    this.imageEdited = false;
  }

  async saveImageEdition() {
    let success: boolean = await this.aboutMeService.createImage({content:this.imageSrc})

    if (success) {
      this.defaultImageSrc = this.imageSrc
      this.imageEdited = false;
    }
  }
}
