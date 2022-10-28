import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../authentication/services/user.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-lottery-page',
  templateUrl: './lottery-page.component.html',
  styleUrls: ['./lottery-page.component.scss']
})
export class LotteryPageComponent implements OnInit {

  private NUMBER_OF_LOTTERY_INPUTS = 4;

  lotteryInputs: FormControl<number[] | null>[] = [];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.NUMBER_OF_LOTTERY_INPUTS; i++) {
      const formControl: FormControl<number[] | null> = new FormControl([]);
      formControl.valueChanges.subscribe((value) => console.log(i + ". ", value));
      this.lotteryInputs.push(formControl);
    }
  }

}
