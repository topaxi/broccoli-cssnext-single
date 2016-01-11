'use strict';

process.chdir(__dirname);

var path = require('path');
var broccoli = require('broccoli');

var compileCssnext = require('../../index');
var read = require('./read');

module.exports = function (inputTrees, inputFile, outputFile, cssnextOptions) {
  inputTrees = !Array.isArray(inputTrees) ? [inputTrees] : inputTrees;

  var cssnext = compileCssnext.apply(this, arguments);

  return new broccoli.Builder(cssnext).build().then(function (results) {
    return {
      css: read(path.join(results.directory, outputFile)),
      directory: results.directory,
      outputFile: outputFile
    };
  });
}
