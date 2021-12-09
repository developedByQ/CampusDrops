import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggieSignupComponent } from './aggie-signup.component';

describe('AggieSignupComponent', () => {
  let component: AggieSignupComponent;
  let fixture: ComponentFixture<AggieSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggieSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggieSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
