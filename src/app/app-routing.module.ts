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

import { NewsComponent } from './news/news.component';
import { CableHauntVulnerabilityComponent, URL_KEY as CABLEHAUNT_VULNERABILITY_URL_KEY } from './news/cable-haunt-vulnerability/cable-haunt-vulnerability.component';
import { TechnicolorHttpdServerVulnerabilityComponent, URL_KEY as BROADCOM_HTTPD_ERROR_URL_KEY } from './news/technicolor-httpd-server-vulnerability/technicolor-httpd-server-vulnerability.component';
import { ArticleListComponent } from './news/article-list/article-list.component';

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

const routes: Routes = [
  { path: '', component: AboutCompanyComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactUsComponent },
  {
    path: 'news', component: NewsComponent, children: [
      { path: '', component: ArticleListComponent },
      { path: CABLEHAUNT_VULNERABILITY_URL_KEY, component: CableHauntVulnerabilityComponent },
      { path: BROADCOM_HTTPD_ERROR_URL_KEY, component: TechnicolorHttpdServerVulnerabilityComponent },
    ]
  },
  { path: '**', redirectTo: '', component: AboutCompanyComponent },
];
// Add logic for specific article

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    }),
    LocalizeRouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class AppRoutingModule { }
