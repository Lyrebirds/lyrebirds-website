import { Component, OnInit, TemplateRef, AfterViewInit, ViewContainerRef, Input, ComponentFactoryResolver, Type, ViewChild, Directive, QueryList, ViewChildren, Inject, ComponentRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TechnicolorHttpdServerVulnerabilityComponent } from './technicolor-httpd-server-vulnerability/technicolor-httpd-server-vulnerability.component';
import { CableHauntVulnerabilityComponent } from './cable-haunt-vulnerability/cable-haunt-vulnerability.component';
import { ArticleBaseComponent } from './article-base/article-base.component';
import { ActivatedRoute } from '@angular/router';

export class Article {
  constructor(public component: Type<any>, public id: string){}
}

@Directive({
  selector: 'host',
})
export class ArticleDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'app-news',
  //templateUrl: './news.component.html',
  template: `
    <app-page-template [title]="'NEWS.HERO'">
      <div *ngFor="let x of articles">
        <host></host>
      </div>
    </app-page-template>
  `,
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements AfterViewInit {
  @ViewChildren(ArticleDirective) viewChildren: QueryList<ArticleDirective>;
  
  currentUrl = window.location.href;

  articles = [
    new Article(TechnicolorHttpdServerVulnerabilityComponent, "technicolor"),
    new Article(CableHauntVulnerabilityComponent, "cableHaunt")
  ]
  private sub: any;
  private id: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cdRef:ChangeDetectorRef,
              private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];
    
          this.viewChildren.forEach((articleDirective, i) => {
              
            let curArticle = this.articles[i]; // Add logic for specific article
            if (this.id === "all" || this.id == curArticle.id) {
              const componentFactory = this.componentFactoryResolver.resolveComponentFactory(curArticle.component);
              const viewContainerRef = articleDirective.viewContainerRef;

              viewContainerRef.clear();

              const componentRef = viewContainerRef.createComponent(componentFactory);

              let article: ArticleBaseComponent = (<ArticleBaseComponent>componentRef.instance);
              article.id = curArticle.id;
              article.dedicated = (this.id == curArticle.id);

              this.cdRef.detectChanges();
            }
          });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
