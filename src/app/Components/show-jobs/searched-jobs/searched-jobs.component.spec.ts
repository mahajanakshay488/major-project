import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedJobsComponent } from './searched-jobs.component';

describe('SearchedJobsComponent', () => {
  let component: SearchedJobsComponent;
  let fixture: ComponentFixture<SearchedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
