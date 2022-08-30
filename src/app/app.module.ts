import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { EducationComponent } from './pages/education/education.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ExperiencesComponent } from './pages/experiences/experiences.component';
import { ExperienceCardComponent } from './pages/experiences/experience-card/experience-card.component';
import { ProjectCardComponent } from './pages/projects/project-card/project-card.component';
import { EducationCardComponent } from './pages/education/education-card/education-card.component';
import { SkillComponentComponent } from './pages/skills/skill-component/skill-component.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NewCardComponent } from './pages/components/new-card/new-card.component';
import { NewCircleComponent } from './pages/components/new-circle/new-circle.component';
import { AuthService } from './services/auth/auth.service';
import { AboutMeService } from './services/about-me/about-me.service';
import { SocialMediaService } from './services/social-media/social-media.service';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorComponent } from './pages/modal/error/error.component';
import { ExperiencesService } from './services/experiences/experiences.service';
import { EducationService } from './services/education/education.service';
import { ProjectsService } from './services/projects/projects.service';
import { UnauthorizedComponent } from './pages/modal/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PortafolioComponent,
    AboutmeComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperiencesComponent,
    ExperienceCardComponent,
    ProjectCardComponent,
    EducationCardComponent,
    SkillComponentComponent,
    NewCardComponent,
    NewCircleComponent,
    ErrorComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [AuthService, AboutMeService, SocialMediaService, ExperiencesService, EducationService, ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
