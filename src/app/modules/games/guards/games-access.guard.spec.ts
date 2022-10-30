import {TestBed} from '@angular/core/testing';

import {GamesAccessGuard} from './games-access.guard';
import {CookieModule} from "ngx-cookie";

describe('GamesAccessGuard', () => {
  let guard: GamesAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CookieModule.withOptions() ]
    });
    guard = TestBed.inject(GamesAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
