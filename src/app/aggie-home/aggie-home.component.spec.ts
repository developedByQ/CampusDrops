import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggieHomeComponent } from './aggie-home.component';

describe('AggieHomeComponent', () => {
  let component: AggieHomeComponent;
  let fixture: ComponentFixture<AggieHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggieHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggieHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
