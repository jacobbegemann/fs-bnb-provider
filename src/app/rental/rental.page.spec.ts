import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPage } from './rental.page';

describe('RentalPage', () => {
  let component: RentalPage;
  let fixture: ComponentFixture<RentalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
