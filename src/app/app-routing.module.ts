import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Local Components
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ServicesComponent } from './services/services.component';

// NGX Translate
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterSettings, LocalizeParser } from 'localize-router';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

const routes: Routes = [
  { path: '', component: FrontpageComponent },
  { path: 'services', component: ServicesComponent }
];

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
