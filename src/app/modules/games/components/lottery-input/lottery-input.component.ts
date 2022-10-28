import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faShuffle, faTrashCan} from "@fortawesome/free-solid-svg-icons";

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

  public numbers: ({num: number, checked: boolean}[])[] = [];

  private onChange: Function = () => {};

  private onTouch: Function = () => {};

  constructor(library: FaIconLibrary) {
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

  removeNumbers(): void {
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
      this.removeNumbers();
    } else {
      for (let row of this.numbers) {
        for (let numberData of row) {
          numberData.checked = value.includes(numberData.num);
        }
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
