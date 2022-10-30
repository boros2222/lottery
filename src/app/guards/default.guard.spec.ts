import {TestBed} from '@angular/core/testing';

import {DefaultGuard} from './default.guard';
import {CookieModule} from "ngx-cookie";

describe('DefaultGuard', () => {
  let guard: DefaultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CookieModule.withOptions() ]
    });
    guard = TestBed.inject(DefaultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
