import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamochodySzczegolyComponent } from './samochody-szczegoly.component';

describe('SamochodySzczegolyComponent', () => {
  let component: SamochodySzczegolyComponent;
  let fixture: ComponentFixture<SamochodySzczegolyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamochodySzczegolyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamochodySzczegolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
