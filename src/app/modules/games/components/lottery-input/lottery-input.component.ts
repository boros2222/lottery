import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faShuffle, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {NumbersGeneratorService} from "../../services/numbers-generator.service";

@Component({
  selector: 'app-lottery-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LotteryInputComponent),
      multi: true
    }
  ],
  templateUrl: './lottery-input.component.html',
  styleUrls: ['./lottery-input.component.scss'],
})
export class LotteryInputComponent implements OnInit, ControlValueAccessor {

  @Input()
  public disabled: boolean = false;

  @Input()
  public index: number = 0;

  @Input()
  public width: number = 7;

  @Input()
  public height: number = 7;

  @Input()
  public randomNumbersLength: number = 6;

  public numbers: ({num: number, checked: boolean}[])[] = [];

  private onChange: Function = () => {};

  private onTouch: Function = () => {};

  constructor(private library: FaIconLibrary,
              private numbersGeneratorService: NumbersGeneratorService) {

    library.addIcons(faTrashCan, faShuffle);
  }

  ngOnInit(): void {
    this.initNumbers();
  }

  private initNumbers(): void {
    let currentNumber = 1;

    for (let i = 0; i < this.height; i++) {
      this.numbers.push([]);
      for (let j = 0; j < this.width; j++) {
        this.numbers[i][j] = {
          num: currentNumber,
          checked: false
        };
        currentNumber++;
      }
    }
  }

  checkNumber(xIndex: number, yIndex: number): void {
    if (this.disabled) {
      return;
    }

    this.numbers[xIndex][yIndex].checked = !this.numbers[xIndex][yIndex].checked;

    let checkedNumbers: number[] | null = [];

    for (let row of this.numbers) {
      for (let numberData of row) {
        if (numberData.checked) {
          checkedNumbers.push(numberData.num);
        }
      }
    }

    this.onChange(checkedNumbers);
    this.onTouch(checkedNumbers);
  }

  setRandomNumbers(): void {
    const maxNumber: number = this.width * this.height;

    const randomNumbers: number[] = this.numbersGeneratorService.generateRandomDifferentNumbers(
      maxNumber, this.randomNumbersLength);

    this.setCheckedNumbers(randomNumbers);
    this.onChange(randomNumbers);
    this.onTouch(randomNumbers);
  }

  setCheckedNumbers(numbers: number[]): void {
    for (let row of this.numbers) {
      for (let numberData of row) {
        numberData.checked = numbers.includes(numberData.num);
      }
    }
  }

  deleteNumbers(): void {
    this.clearTable();
    this.onChange([]);
    this.onTouch([]);
  }

  private clearTable(): void {
    for (let row of this.numbers) {
      for (let numberData of row) {
        numberData.checked = false;
      }
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number[] | null | undefined): void {
    if (value === null || value === undefined || value.length === 0) {
      this.clearTable();
    } else {
      this.setCheckedNumbers(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
