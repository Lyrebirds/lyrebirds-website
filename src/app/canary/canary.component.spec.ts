import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanaryComponent } from './canary.component';

describe('CanaryComponent', () => {
  let component: CanaryComponent;
  let fixture: ComponentFixture<CanaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
