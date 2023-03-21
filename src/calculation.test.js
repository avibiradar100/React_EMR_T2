// Mocking 3 Concepts:

// 1.Mocking a function
// 2.Mocking a entire module
// 3.Spying and mocking


//1. Mocking a Function
test("Mock function by Default Returns undefined",()=>{

        const mock=jest.fn();

        let result=mock("Hello")

        expect(result).toBe(undefined);
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith("Hello");
})

//2. Mocking a entire Module 
import * as calculation from './calculation.js'
import * as math from './math.js'

// math.add = jest.fn();
// math.subtract = jest.fn();

jest.mock("./math")

test("calls math.add", () => {
  calculation.doAdd(1, 2);
  expect(math.add).toHaveBeenCalledWith(1, 2);
});

test("calls math.subtract", () => {
  calculation.doSubtract(1, 2);
  expect(math.subtract).toHaveBeenCalledWith(1, 2);
});

// 3.Spying and mocking
test("Spying and mocking", () => {

        const addMock=jest.spyOn(math,"add");

        // override the implementation
        addMock.mockImplementation(() => "Hello");
        expect(app.doAdd(1, 2)).toEqual("Hello");

        // restore the original implementation
        addMock.mockRestore();
        expect(app.doAdd(1, 2)).toEqual(3);
})