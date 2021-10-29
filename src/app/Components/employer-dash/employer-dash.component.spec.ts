import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployerDashComponent } from './employer-dash.component';

describe('EmployerDashComponent', () => {
  let component: EmployerDashComponent;
  let fixture: ComponentFixture<EmployerDashComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
