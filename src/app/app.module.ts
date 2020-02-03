import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewsComponent } from './news/news.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { ServicesComponent } from './services/services.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faCheckCircle, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLanguage, faLaptopCode, faBug, faUsers, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { CableHauntVulnerabilityComponent } from './news/cable-haunt-vulnerability/cable-haunt-vulnerability.component';
import { TechnicolorHttpdServerVulnerabilityComponent } from './news/technicolor-httpd-server-vulnerability/technicolor-httpd-server-vulnerability.component';

// For Translation with AOT
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactUsComponent,
    NewsComponent,
    AboutCompanyComponent,
    ServicesComponent,
    EmployeeProfileComponent,
    PageTemplateComponent,
    FooterComponent,
    CableHauntVulnerabilityComponent,
    TechnicolorHttpdServerVulnerabilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    // Translation
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faTwitter, faLinkedin, faFacebook, faCheckCircle, faLanguage, faEnvelope, faLaptopCode, faBug, faUsers, faFingerprint);
  }
}
