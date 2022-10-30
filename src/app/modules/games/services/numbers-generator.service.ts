import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumbersGeneratorService {

  constructor() { }

  generateRandomDifferentNumbers(maxNumber: number, length: number): number[] {
    if (maxNumber < length) {
      // to prevent forever running
      return [];
    }

    const generatedNumbers: number[] = [];

    for (let i = 0; i < length; i++) {
      let randomNumber: number | null = null;

      do {
        randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      } while (generatedNumbers.includes(randomNumber));

      generatedNumbers.push(randomNumber);
    }

    generatedNumbers.sort((a, b) => a - b);

    return generatedNumbers;
  }
}
