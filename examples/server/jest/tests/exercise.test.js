const run = require('../exercise');

describe('fizzBuzz', () => {
  it('should throw exception if input is not a number', () => {
    const args = ['5', 'a', false, undefined, null, {}];
    args.forEach(arg => {
      expect(() => {
        run.fizzBuzz(arg);
      }).toThrow();
    });
  });
  it('should return FizzBuzz if input is divisible by 3 and 5', () => {
    const result = run.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  it('should return Fizz if input is only divisible by 3', () => {
    const result = run.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  it('should return Buzz if input is only divisible by 5', () => {
    const result = run.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  it('should return input if input if it is not divisible by 3 or 5', () => {
    const result = run.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
