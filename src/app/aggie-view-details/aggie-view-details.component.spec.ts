import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggieViewDetailsComponent } from './aggie-view-details.component';

describe('AggieViewDetailsComponent', () => {
  let component: AggieViewDetailsComponent;
  let fixture: ComponentFixture<AggieViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggieViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggieViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
