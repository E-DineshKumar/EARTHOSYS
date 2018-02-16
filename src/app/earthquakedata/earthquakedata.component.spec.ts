import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakedataComponent } from './earthquakedata.component';

describe('EarthquakedataComponent', () => {
  let component: EarthquakedataComponent;
  let fixture: ComponentFixture<EarthquakedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthquakedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthquakedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
