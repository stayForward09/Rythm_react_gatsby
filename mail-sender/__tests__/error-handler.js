// Copyright (c) 2018-2019 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { EmailSenderError } = require('../src/error-handler');

describe('EmailSenderError', () => {
  it('should export a function', () => {
    // Assert
    expect(typeof EmailSenderError).toEqual('function');
  });

  it('should be a throwable error', () => {
    // Assert
    expect(() => {
      throw new EmailSenderError('Error');
    }).toThrow(new EmailSenderError('Error'));
  });

  it('should return an error', () => {
    // Arrange
    expectedName = 'EmailSenderError';

    // Act
    const error = new EmailSenderError();

    // Assert
    expect(error.name).toEqual(expectedName);
  });

  it('should contain a given error message', () => {
    // Arrange
    expectedMessage = 'generic error message';

    // Act
    const error = new EmailSenderError(expectedMessage);

    // Assert
    expect(error.message).toEqual(expectedMessage);
  });
});
