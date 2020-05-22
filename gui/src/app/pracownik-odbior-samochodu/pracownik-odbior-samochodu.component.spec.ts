import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracownikOdbiorSamochoduComponent } from './pracownik-odbior-samochodu.component';

describe('PracownikOdbiorSamochoduComponent', () => {
  let component: PracownikOdbiorSamochoduComponent;
  let fixture: ComponentFixture<PracownikOdbiorSamochoduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracownikOdbiorSamochoduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracownikOdbiorSamochoduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
