import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostJobComponent } from './post-job.component';

describe('PostJobComponent', () => {
  let component: PostJobComponent;
  let fixture: ComponentFixture<PostJobComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
