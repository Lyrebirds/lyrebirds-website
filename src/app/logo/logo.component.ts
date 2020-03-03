import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor() { }

  @Input() height: number = 50;
  @Input() width: number = null;

  ngOnInit(): void {
    if (this.width == null) {
      this.width = this.height / (1915 * 1841);
    }
  }

}
