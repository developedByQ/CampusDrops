import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggieSigninComponent } from './aggie-signin.component';

describe('AggieSigninComponent', () => {
  let component: AggieSigninComponent;
  let fixture: ComponentFixture<AggieSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggieSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggieSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
