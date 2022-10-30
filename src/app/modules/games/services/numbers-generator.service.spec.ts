import {TestBed} from '@angular/core/testing';

import {NumbersGeneratorService} from './numbers-generator.service';

describe('NumbersGeneratorService', () => {
  let service: NumbersGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumbersGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate correct length of numbers', () => {
    const parameters: {maxNumber: number, length: number}[] = [
      { maxNumber: 3, length: 3 },
      { maxNumber: 10, length: 3 }
    ];

    for (let parameter of parameters) {
      let randomNumbers: number[] = service.generateRandomDifferentNumbers(parameter.maxNumber, parameter.length);
      expect(randomNumbers.length).toEqual(parameter.length);
      for (let randomNumber of randomNumbers) {
        expect(randomNumber).toBeGreaterThanOrEqual(1);
        expect(randomNumber).toBeLessThanOrEqual(parameter.maxNumber);
      }
    }
  });

  it('should generate empty numbers because of wrong parameters', () => {
    const randomNumbers: number[] = service.generateRandomDifferentNumbers(2, 3);
    expect(randomNumbers.length).toEqual(0);
  });
});
