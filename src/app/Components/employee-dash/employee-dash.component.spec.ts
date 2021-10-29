import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeDashComponent } from './employee-dash.component';

describe('EmployeeDashComponent', () => {
  let component: EmployeeDashComponent;
  let fixture: ComponentFixture<EmployeeDashComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
