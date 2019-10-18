import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  constructor(public translator: TranslateService) {
    translator.addLangs(['en', 'da']);
    translator.setDefaultLang('en');
    const browserLang = translator.getBrowserLang();
    translator.use(browserLang.match(/en|da/) ? browserLang : 'en');
  }
}
