import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracownikWydanieSamochoduComponent } from './pracownik-wydanie-samochodu.component';

describe('PracownikWydanieSamochoduComponent', () => {
  let component: PracownikWydanieSamochoduComponent;
  let fixture: ComponentFixture<PracownikWydanieSamochoduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracownikWydanieSamochoduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracownikWydanieSamochoduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
