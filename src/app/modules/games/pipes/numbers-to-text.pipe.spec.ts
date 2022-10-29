import { NumbersToTextPipe } from './numbers-to-text.pipe';

describe('NumbersToTextPipe', () => {
  it('create an instance', () => {
    const pipe = new NumbersToTextPipe();
    expect(pipe).toBeTruthy();
  });
});
