import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobsDescComponent } from './jobs-desc.component';

describe('JobsDescComponent', () => {
  let component: JobsDescComponent;
  let fixture: ComponentFixture<JobsDescComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
