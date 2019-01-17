// Copyright (c) 2018-2019 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { MailSender } = require('../src/mail-sender');

describe('MailSender', () => {
  it('should return a function', () => {
    // Assert
    expect(typeof MailSender).toEqual('function');
  });

  it('should throw an error if the AWS provider is missing', () => {
    expect(() => {
      new MailSender();
    }).toThrow(TypeError(`Cannot read property 'SES' of undefined`));
  });

  it(`should throw an error if the AWS provider doesn't contain 'ses'`, () => {
    expect(() => {
      new MailSender({ fakeAWS: true });
    }).toThrow(TypeError('AWS.SES is not a constructor'));
  });

  it(`should throw an error if the emailGenerator provider is missing`, () => {
    expect(() => {
      new MailSender({ SES: class SES {} });
    }).toThrow(TypeError('EmailGenerator is not a constructor'));
  });

  describe('send', () => {
    const fakeSendEmailPromise = jest.fn(() => Promise.resolve());

    const fakeSendEmail = jest.fn(() => ({
      promise: fakeSendEmailPromise,
    }));

    const fakeSES = jest.fn(() => ({ sendEmail: fakeSendEmail }));
    const AWS = { SES: fakeSES };

    const fakeGenerate = jest.fn(() => 'fakeEmailFormattedObject');
    const EmailGenerator = jest.fn(() => ({ generate: fakeGenerate }));

    let mailSender;

    beforeEach(() => {
      mailSender = new MailSender(AWS, EmailGenerator);
    });

    it('should generate a formatted email object', async () => {
      // Arrange
      const subject = 'subject';
      const body = 'body';
      const branch = 'branchName';
      const from = 'from';
      const to = 'to';
      const sender = 'Heisenberg';
      const email = 'dr.heisenberg@mail.com';
      const mockEmailObject = {
        subject,
        body,
        branch,
        from,
        to,
        sender,
        email,
      };

      // Act
      await mailSender.send(mockEmailObject);

      // Assert
      expect(fakeGenerate).toHaveBeenCalledWith(
        subject,
        body,
        branch,
        from,
        to,
        sender,
        email
      );
    });

    it('should send an email using SES', async () => {
      // Arrange
      const mockEmailObject = {
        subject: 'subject',
        body: 'body',
        from: 'from',
        to: 'to',
      };

      // Act
      await mailSender.send(mockEmailObject);

      // Assert
      expect(fakeSendEmail).toHaveBeenCalledWith('fakeEmailFormattedObject');
    });

    it('should throw an error when SES fails to send the email', async () => {
      // Arrange
      fakeSendEmailPromise.mockImplementationOnce(() =>
        Promise.reject('Some Error')
      );
      const mockEmailObject = {
        subject: 'subject',
        body: 'body',
        from: 'from',
        to: 'to',
      };

      // Assert
      let error;
      try {
        await mailSender.send(mockEmailObject);
      } catch (err) {
        error = err;
      }

      expect(error).toEqual(new Error('Some Error'));
    });
  });
});
