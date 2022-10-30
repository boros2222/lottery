import {TestBed, waitForAsync} from '@angular/core/testing';

import {UserService} from './user.service';
import {CookieModule} from "ngx-cookie";
import {USER_PASSWORD_MAP, USERS} from "../constants";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CookieModule.withOptions() ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', waitForAsync(() => {
    const userId: number = USERS[0].userId;
    const password: string | undefined = USER_PASSWORD_MAP.get(userId);

    service.login(userId, password).subscribe((loggedIn: boolean) => {
      expect(loggedIn).toBeTrue();
    });
  }));

  it('should not login', waitForAsync(() => {
    const userId: number = USERS[0].userId;
    const password: string | undefined = 'strawberry';

    service.login(userId, password).subscribe((loggedIn: boolean) => {
      expect(loggedIn).toBeFalse();
    });
  }));
});
