import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverViewallComponent } from './driver-viewall.component';

describe('DriverViewallComponent', () => {
  let component: DriverViewallComponent;
  let fixture: ComponentFixture<DriverViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverViewallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
