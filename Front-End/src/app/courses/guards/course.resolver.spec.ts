import { TestBed } from '@angular/core/testing';

import { CourseResolver } from './course.resolver';
import { HttpClientModule } from '@angular/common/http';

describe('CourseResolver', () => {
  let resolver: CourseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientModule]
    });
    resolver = TestBed.inject(CourseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
