import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  currentLang: string = '';

  constructor(private localize: LocalizeRouterService) {
    this.currentLang = this.localize.parser.currentLang;
  }

  changeLanguage() {
    this.currentLang = this.localize.parser.locales.find(lang => lang != this.currentLang)
    this.localize.changeLanguage(this.currentLang);
  }

  ngOnInit() {
  }

}
