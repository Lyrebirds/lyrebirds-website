import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @ViewChild("tabletImage") img: ElementRef;
  @ViewChild("aboutCard") aboutCard: ElementRef;

  ngOnInit(): void {
  }

  update(): void {
    this.aboutCard.nativeElement.ngAfterViewInit +=
      console.log(this.img);
    let boundingClientRect = this.aboutCard.nativeElement.getBoundingClientRect();
    let bla = this.aboutCard.nativeElement;
    console.log(bla.style);
    let height = boundingClientRect.height;
    console.log(height);
    this.img.nativeElement.style.height = height + "px";
    setTimeout(_ => {
      this.update();
    }, 100)
  }

  ngAfterViewInit(): void {
    this.update();
  }

}
