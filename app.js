'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');

function listDirectory(cwd=process.cwd()) {
  return fs.readdirSync(cwd, {
    withFileTypes: true
  });
}
exports.listDirectory = listDirectory;
assert.ok(listDirectory().length > 0);

function traverse(dir=listDirectory(), cwd=process.cwd()) {
  const tree = dir;
  for (let leaf of tree) {
    let curr;
    if (leaf.isDirectory()) {
      curr = path.join(cwd, leaf.name);
      let currDir = listDirectory(curr);
      console.log(path.join(curr));
      return traverse(currDir, curr);
    } else {
      console.log(path.join(cwd, leaf.name));
    }
  }
}

traverse();
