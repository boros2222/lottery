import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'app-lottery-page',
  templateUrl: './lottery-page.component.html',
  styleUrls: ['./lottery-page.component.scss']
})
export class LotteryPageComponent implements OnInit {

  public NUMBER_OF_LOTTERY_INPUTS = 4;
  public CORRECT_LENGTH_OF_NUMBERS = 6;
  public WIDTH_OF_LOTTERY_INPUT = 7;
  public HEIGHT_OF_LOTTERY_INPUT = 7;

  lotteryInputs: FormControl<number[] | null>[] = [];

  played: boolean = false;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.NUMBER_OF_LOTTERY_INPUTS; i++) {
      this.lotteryInputs.push(new FormControl([],
        [this.numbersLengthValidator(this.CORRECT_LENGTH_OF_NUMBERS)])
      );
    }
  }

  play(): void {
    for (const lotteryInput of this.lotteryInputs) {
      lotteryInput.markAsTouched();
    }
    this.played = true;
  }

  numbersLengthValidator(correctLengthOfNumbers: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: number[] = control.value;
      if (value === null || value === undefined || value.length === 0) {
        return {
          empty: true
        };
      }
      else if (value.length < correctLengthOfNumbers) {
        return {
          lessThan: {
            value: correctLengthOfNumbers - value.length
          }
        };
      }
      else if (value.length > correctLengthOfNumbers) {
        return {
          greaterThan: {
            value: value.length - correctLengthOfNumbers
          }
        };
      }
      return null;
    };
  }

}
