





/*
chote block ko test karne ke liye unit testing hota hai
Developer Ready: Complete and ready to set-up JavaScript testing solution. Works out of the box for any React project.
Instant Feedback: Failed tests run first. Fast interactive mode can switch between running all tests or only test files related to changed files.
Snapshot Testing: Jest can capture snapshots of React trees or other serializable values to simplify UI testing.

Postman is a widely used tool for manually testing APIs. It allows users to send various types of HTTP requests
(GET, POST, PUT, DELETE) to API endpoints and inspect the responses easily. This makes it an invaluable resource for
developers and testers to validate API functionality and troubleshoot issues. Other options like Git, Docker,and
Jenkins serve different purposes, such as version control, containerization, and continuous Integration, respectively.

we can not install the jest like -> npm i jest because at server it is not used it is used for development purpose /testing purpose so use ->npm i jest --save-dev 

The to Have Property matcher in Jest is specifically used to check if an object contains a certain property. This matcher allows you to verify the presence of properties in an object and can also be used to check nested properties. The other options serve different purposes: toBe checks for strict equality, toHaveLength verifies the length of an array or string, and toContain checks for the presence of an item in an array or substring in a string.

The toContain matcher in Jest is used to check if an array contains a specific item. This is useful for verifying that a particular value is present in an array, such as checking the results of an API response. The other options serve different purposes: toBe checks for strict equality, to Equal is used for deep equality comparisons, and toMatchObject checks for a partial match of an object's properties.
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
In this code, expect(2 + 2) returns an "expectation" object. You typically won't do much with these expectation objects except call matchers on them. In this code, .toBe(4) is the matcher. When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you

test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
toEqual recursively checks every field of an object or array.
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

toBeNull matches only null
toBeUndefined matches only undefined
toBeDefined is the opposite of toBeUndefined
toBeTruthy matches anything that an if statement treats as true
toBeFalsy matches anything that an if statement treats as false
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
comparing numbers have matcher equivalents
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

check strings against regular expressions with toMatch
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

f you want to test whether a particular function throws an error when it's called, use toThrow
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});

*/