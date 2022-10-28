import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {USER_COOKIE_NAME, USER_PASSWORD_MAP, USERS} from "../models/constants";
import {delay, finalize, Observable, of, tap} from "rxjs";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser: User | null = null;

  private loginProgress: boolean = false;

  constructor(private cookieService: CookieService,
              private router: Router) {

    this.checkUserCookie();
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  isLoginProgress(): boolean {
    return this.loginProgress;
  }

  findUser(userId: number): User | null {
    const users: User[] = USERS.filter(user => user.userId === userId);

    if (users.length === 1) {
      return users[0];
    } else {
      return null;
    }
  }

  getUsers(): User[] {
    return USERS;
  }

  login(userId: number | null | undefined, password: string | null | undefined): Observable<boolean> {

    if (userId === null || userId === undefined || password === null || password === undefined) {
      return of(false);
    }

    const passwordOfUser: string | undefined = USER_PASSWORD_MAP.get(userId);

    const passwordIsCorrect: boolean = passwordOfUser !== null && passwordOfUser !== undefined && passwordOfUser === password;

    this.loginProgress = true;

    return of(passwordIsCorrect).pipe(
      delay(1000),
      tap({ next: () => this.cookieService.put(USER_COOKIE_NAME, userId.toString()) }),
      tap({ next: () => this.checkUserCookie()}),
      finalize(() => this.loginProgress = false)
    );
  }

  logout(): void {
    this.cookieService.remove(USER_COOKIE_NAME);
    this.checkUserCookie();
    this.router.navigate(['/auth/login']);
  }

  private checkUserCookie(): void {
    const userId: string | undefined = this.cookieService.get(USER_COOKIE_NAME);

    this.loggedInUser = null;

    if (userId !== undefined) {
      const user: User | null = this.findUser(parseInt(userId));
      if (user != null) {
        this.loggedInUser = user;
      }
    }
  }

}
