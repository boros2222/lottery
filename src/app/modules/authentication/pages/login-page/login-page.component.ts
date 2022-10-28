import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
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

    this.loginForm.disable();

    this.userService.login(
      this.loginForm.get('user')?.value,
      this.loginForm.get('password')?.value
    ).subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigate(['/games/lottery'])
      } else {
        this.loginForm.enable();
      }
    });
  }

  private userOnChange(userId: number | null) {
    if (userId === null) {
      this.loginForm.get('userId')?.setValue(null, {emitEvent: false});
    } else {
      this.loginForm.get('userId')?.setValue(userId.toString(), {emitEvent: false});
    }
  }

  private userIdOnChange(userId: string | null): void {
    if (userId !== null && userId !== '') {
      const user: User | null = this.userService.findUser(parseInt(userId));
      if (user != null) {
        this.loginForm.get('user')?.setValue(user.userId, {emitEvent: false});
        return;
      }
    }
    this.loginForm.get('user')?.setValue(null, {emitEvent: false});
  }

}
