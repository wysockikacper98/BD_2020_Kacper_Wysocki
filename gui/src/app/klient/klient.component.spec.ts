import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlientComponent } from './klient.component';

describe('KlientComponent', () => {
  let component: KlientComponent;
  let fixture: ComponentFixture<KlientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
