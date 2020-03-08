import { TestBed } from '@angular/core/testing';

import { MatchupService } from './matchup.service';

describe('MatchupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchupService = TestBed.get(MatchupService);
    expect(service).toBeTruthy();
  });
});
