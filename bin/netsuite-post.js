const fs = require('fs');
const path = require('path');

const requirements = {
  'N/https': 'https',
};

const fileName = path.resolve(__dirname, '..', 'lib', 'netsuite', 'globalpayments.api.js');
let script = fs.readFileSync(fileName).toString();

const exportList = [];
const argList = [];

for (const key in requirements) {
  if (requirements.hasOwnProperty(key)) {
    const value = requirements[key];
    exportList.push(key);
    argList.push(value);
  }
}

//define(['exports'], function (exports) { 'use strict';
script = script
  .replace("['exports']", `[${exportList.map((v) => `'${v}'`).join(', ')}]`)
  .replace('function (exports)', `function (${argList.join(', ')})`);

const end = script.lastIndexOf('});');
script = script.slice(0, end) + 'return exports;' + script.slice(end);

fs.writeFileSync(fileName, script);
