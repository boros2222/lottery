import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl<number | null>(null, [Validators.required]),
    userId: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  loginFailed: boolean = false;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm.get('user')?.valueChanges.subscribe((userId) => this.userOnChange(userId));
    this.loginForm.get('userId')?.valueChanges.subscribe(userId => this.userIdOnChange(userId));
  }

  login(): void {
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      return;
    }

    this.loginFailed = false;
    this.loginForm.disable();

    this.userService.login(
      this.loginForm.get('user')?.value,
      this.loginForm.get('password')?.value
    ).subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigate(['/games/lottery'])
      } else {
        this.loginFailed = true;
        this.loginForm.enable();
      }
    });
  }

  private userOnChange(userId: number | null) {
    let value: string | null = null;

    if (userId !== null && userId !== undefined) {
      value = userId.toString();
    }

    this.loginForm.get('userId')?.setValue(value, { emitEvent: false });
    this.loginForm.get('userId')?.markAsTouched();
  }

  private userIdOnChange(userId: string | null): void {
    let value: number | null = null;

    if (userId !== null && userId !== '') {
      const user: User | null = this.userService.findUser(parseInt(userId));
      if (user != null) {
        value = user.userId;
      }
    }

    this.loginForm.get('user')?.setValue(value, { emitEvent: false });
    this.loginForm.get('user')?.markAsTouched();
  }

}
