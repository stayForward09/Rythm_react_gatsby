// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

const AWS = require('aws-sdk');
const { EmailGenerator } = require('./email-generator');
const { EmailSenderError } = require('./error-handler');
const { MailSender } = require('./mail-sender');
const { Log } = require('./log');
const { validateEmail, validateField, sanitize } = require('./validators');

module.exports = async (data, from, to, subject, debug) => {
  const log = new Log(debug);

  log.info('event data received', data);

  const { sender, email, body, branch } = data;

  // Sanitize input
  const emailObject = {
    subject: sanitize(subject),
    body: sanitize(body),
    branch: sanitize(branch),
    from: sanitize(from),
    to: sanitize(to),
    sender: sanitize(sender),
    email: sanitize(email),
  };

  try {
    for (const field in emailObject) {
      if (emailObject.hasOwnProperty(field)) {
        validateField(emailObject[field]);
      }
    }

    [from, email].forEach((emailFiled) => validateEmail(emailFiled));
  } catch (err) {
    throw new EmailSenderError(err);
  }

  const mailSender = new MailSender(AWS, EmailGenerator);

  log.info('attempting to send following email', emailObject);

  try {
    await mailSender.send(emailObject);
    log.info('email submitted to SES');
  } catch (err) {
    throw new EmailSenderError(err);
  }
};
