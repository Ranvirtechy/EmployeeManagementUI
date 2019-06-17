import { TestBed } from '@angular/core/testing';

import { TimetrackerService } from './timetracker.service';

describe('TimetrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimetrackerService = TestBed.get(TimetrackerService);
    expect(service).toBeTruthy();
  });
});
