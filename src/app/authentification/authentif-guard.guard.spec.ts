import { TestBed } from '@angular/core/testing';

import { AuthentifGuardGuard } from './authentif-guard.guard';

describe('AuthentifGuardGuard', () => {
  let guard: AuthentifGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthentifGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
