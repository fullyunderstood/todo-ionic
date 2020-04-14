import { TestBed } from '@angular/core/testing';

import { AppThemeService } from './app-theme.service';

describe('AppThemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppThemeService = TestBed.get(AppThemeService);
    expect(service).toBeTruthy();
  });
});
