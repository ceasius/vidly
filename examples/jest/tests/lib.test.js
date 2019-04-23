const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
  it('should return positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Mosh');
    expect(result).toMatch(/Mosh/);
    expect(result).toContain('Mosh'); //alternative without regex
  });
});

describe('getCurrencies', () => {
  it('should return the supported currencies', () => {
    const result = lib.getCurrencies('Mosh');
    expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    //toBe will not work because they are two seperate instances
    //expect(result).toEqual({ id: 1, price: 10 });
    //toEqual will work but it means you cannot add more properties
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  it('should throw an exception when username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(arg => {
      expect(() => {
        lib.registerUser(arg);
      }).toThrow();
    });
  });
  it('should return a user when passing valid username', () => {
    const result = lib.registerUser('mosh');
    expect(result).toMatchObject({ username: 'mosh' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId) {
      console.log('Mock Reading Customer...');
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
describe('notifyCustomer', () => {
  it('should email to the customer', () => {
    db.getCustomerSync = function(customerId) {
      console.log('Mock Reading Customer...');
      return { email: 'a' };
    };
    let mailSent = false;
    mail.send = function(email, message) {
      mailSent = true;
    };

    lib.notifyCustomer(1);
    expect(mailSent).toBe(true);
  });
});
