import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployerLoginComponent } from './employer-login.component';

describe('EmployerLoginComponent', () => {
  let component: EmployerLoginComponent;
  let fixture: ComponentFixture<EmployerLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
