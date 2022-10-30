import {TestBed} from '@angular/core/testing';

import {LoginAccessGuard} from './login-access.guard';
import {CookieModule} from "ngx-cookie";

describe('LoginAccessGuard', () => {
  let guard: LoginAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CookieModule.withOptions() ]
    });
    guard = TestBed.inject(LoginAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
