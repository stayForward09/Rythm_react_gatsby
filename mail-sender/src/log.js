// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

class Log {
  constructor(debugStatus = false) {
    this.debugStatus = debugStatus;
  }

  info(title, body) {
    if (this.debugStatus) {
      console.log(title);
      body && console.log(body);
    }
  }
}

module.exports.Log = Log;
