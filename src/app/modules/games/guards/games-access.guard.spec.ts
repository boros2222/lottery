import { TestBed } from '@angular/core/testing';

import { GamesAccessGuard } from './games-access.guard';

describe('GamesAccessGuard', () => {
  let guard: GamesAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GamesAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
