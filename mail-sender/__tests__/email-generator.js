// Copyright (c) 2018-2019 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { EmailGenerator } = require('../src/email-generator');

describe('EmailGenerator', () => {
  beforeEach(() => (emailGenerator = new EmailGenerator()));

  it('should export a function', () => {
    // Assert
    expect(typeof EmailGenerator).toEqual('function');
  });

  it('should set the charset to `UTF-8` by default', () => {
    // Arrange
    const expectedCharset = 'UTF-8';

    // Act
    const result = emailGenerator.generate();

    // Assert
    expect(result.Message.Subject.Charset).toEqual(expectedCharset);
  });

  it('should accept a different charset', () => {
    // Arrange
    const expectedCharset = 'ISO-8859-1';

    // Act
    const isoEmailGenerator = new EmailGenerator(expectedCharset);
    const result = isoEmailGenerator.generate();

    // Assert
    expect(result.Message.Subject.Charset).toEqual(expectedCharset);
  });

  it('should generate an email object', () => {
    // Arrange
    const emailGenerator = new EmailGenerator();
    const subject = 'test email';
    const branch = 'Earth';
    const from = 'fake_user@mail.com';
    const sender = 'Heisenberg';
    const email = 'heisenberg@crystal.blue';
    const to = 'fake_recipient@mail.com';
    const body = 'Hello!';
    // Mock the Date constructor
    Date = jest.fn(() => ({
      toUTCString: () => 'now',
    }));

    // Act
    const prepareMail = emailGenerator.generate(
      subject,
      body,
      branch,
      from,
      to,
      sender,
      email
    );

    // Assert
    expect(prepareMail).toMatchSnapshot();
  });
});
