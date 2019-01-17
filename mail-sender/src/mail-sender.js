// Copyright (c) 2018-2019 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

class MailSender {
  constructor(AWS, EmailGenerator) {
    this.ses = new AWS.SES();
    this.emailGenerator = new EmailGenerator();
  }

  async send(emailObject) {
    const { subject, body, branch, from, to, sender, email } = emailObject;
    const emailFormattedObject = this._prepareEmail(
      subject,
      body,
      branch,
      from,
      to,
      sender,
      email
    );

    try {
      await this._sendEmail(emailFormattedObject);
    } catch (err) {
      throw new Error(err);
    }
  }

  async _sendEmail(emailObject) {
    return await this.ses.sendEmail(emailObject).promise();
  }

  _prepareEmail(subject, body, branch, from, to, sender, email) {
    return this.emailGenerator.generate(
      subject,
      body,
      branch,
      from,
      to,
      sender,
      email
    );
  }
}

module.exports.MailSender = MailSender;
