import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServicesComponent } from './services/services.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterSettings, LocalizeParser } from 'localize-router';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

const routes: Routes = [
  { path: '', component: AboutCompanyComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactUsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    })
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class AppRoutingModule { }
