import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamochodyComponent } from './samochody.component';

describe('SamochodyComponent', () => {
  let component: SamochodyComponent;
  let fixture: ComponentFixture<SamochodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamochodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamochodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
