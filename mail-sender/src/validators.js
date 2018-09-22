// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

const sanitize = (field) => field && ['', field].join('').trim();

const validateField = (dataField) => {
  if (typeof dataField === 'string' && !!dataField && dataField.length >= 2) {
    return;
  }

  throw 'Invalid data';
};

const validateEmail = (emailFiled) => {
  const emailFieldExtractor = /^[\w ]+ <(.+)>$/;
  const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,8}))$/;

  const emailFound = emailFiled.match(emailFieldExtractor);

  const validate = () => {
    if (emailFound && emailFound[1]) {
      return validateEmail(emailFound[1]);
    }

    if (emailValidator.test(emailFiled)) {
      return;
    }

    throw 'Invalid email';
  };

  return validate();
};

module.exports = {
  sanitize,
  validateField,
  validateEmail,
};
