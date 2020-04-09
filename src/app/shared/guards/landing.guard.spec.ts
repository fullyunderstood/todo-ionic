import { TestBed, async, inject } from '@angular/core/testing';

import { LandingGuard } from './landing.guard';

describe('LandingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandingGuard]
    });
  });

  it('should ...', inject([LandingGuard], (guard: LandingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
