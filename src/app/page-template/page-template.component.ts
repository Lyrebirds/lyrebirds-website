import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent implements OnInit {

  @Input() heroPath: string = '/assets/img/horizont_javascript_close.jpg';
  @Input() title: string;
  @Input() subtitle: string;

  getHero() {
    return "url(" + this.heroPath + ")";
  }

  constructor() { }

  ngOnInit() {
  }

}
