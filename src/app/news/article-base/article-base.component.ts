import { Component, Input, Injectable } from '@angular/core';

export class ArticleBaseComponent {
  @Input() dedicated: boolean = true;
  route: string;
  id: string;
  titleKey: string;

  constructor(inputRoute: string, inputId: string, inputTitleKey: string) {
    this.route = inputRoute;
    this.id = inputId;
    this.titleKey = inputTitleKey;
  }
}
