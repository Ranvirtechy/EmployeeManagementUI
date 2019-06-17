import { TestBed } from '@angular/core/testing';

import { EmployeeroleService } from './employeerole.service';

describe('EmployeeroleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeroleService = TestBed.get(EmployeeroleService);
    expect(service).toBeTruthy();
  });
});
