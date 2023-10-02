import { TestBed } from '@angular/core/testing';

import { DailyStudyingService } from './daily-studying.service';

describe('DailyStudyingService', () => {
  let service: DailyStudyingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyStudyingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
