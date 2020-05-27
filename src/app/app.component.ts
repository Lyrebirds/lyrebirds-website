import { Component } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private localize: LocalizeRouterService, private meta: Meta, private translator: TranslateService) {
    this.translator.get('FRONT.META.AUTHOR').subscribe((author: string) => {
      this.meta.addTag({ name: "author", content: author });
    })
  }
}
