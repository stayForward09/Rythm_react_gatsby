// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { Log } = require('../src/log');

describe('Log', () => {
  it('should export a function', () => {
    // Assert
    expect(typeof Log).toEqual('function');
  });

  it('should export a function constructor', () => {
    // Arrange
    const log = new Log(true);

    // Assert
    expect(log).toBeInstanceOf(Log);
  });

  it(`should export an 'info' method`, () => {
    // Arrange
    const log = new Log(true);

    // Assert
    expect(log.info).toBeDefined();
  });

  it(`should print a message when the 'debugStatus' is set to true'`, () => {
    // Arrange
    const log = new Log(true);

    // Mock and Spy the console.log
    console = {
      log: jest.fn(),
    };

    // Act
    log.info('test');

    // Assert
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('test');
  });

  it(`should print both a message and a variable, if specified`, () => {
    // Arrange
    const testObject = {
      name: 'Heisenberg',
    };
    const log = new Log(true);

    // Mock and Spy the console.log
    console = {
      log: jest.fn(),
    };

    // Act
    log.info('test', testObject);

    // Assert
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith('test');
    expect(console.log).toHaveBeenCalledWith(testObject);
  });

  it(`should not print anything if the 'debugStatus' is false or not specified'`, () => {
    // Arrange
    const log = new Log();
    const log2 = new Log(false);

    console = {
      log: jest.fn(),
    };

    // Act
    log.info('test');
    log2.info('test');

    // Assert
    expect(console.log).not.toHaveBeenCalled();
  });
});
