// Copyright (c) 2018-2019 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

const sendMail = require('./src');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const from = process.env.FROM;
const to = process.env.TO;
const subject = process.env.SUBJECT;
const debug = process.env.DEBUG === 'true';

const returnCallback = (body, statusCode = 500) => {
  if (!(statusCode < 300 && statusCode >= 200)) {
    body = { name: body.name, message: body.message };
  }

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://www.rhythmicexcellence.london',
    },
    body: JSON.stringify(body),
  };
};

module.exports.send = async (event, context) => {
  let data;

  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return returnCallback({
      name: 'SyntaxError',
      message:
        'body is missing in the event or is not parsable to JSON.\n' +
        err.message,
    });
  }

  try {
    await sendMail(data, from, to, subject, debug);
  } catch (err) {
    return returnCallback(err);
  }

  return returnCallback({ status: 'success' }, 200);
};
