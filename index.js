/* global require */

var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var includePathSearcher = require('include-path-searcher')
var CachingWriter = require('broccoli-caching-writer')
var cssnext = require('cssnext')
var merge = require('lodash-node/modern/object/merge')
var RSVP = require('rsvp')
var writeFile = RSVP.denodeify(fs.writeFile)

module.exports = CssnextCompiler

CssnextCompiler.prototype = Object.create(CachingWriter.prototype)
CssnextCompiler.prototype.constructor = CssnextCompiler

function CssnextCompiler (sourceTrees, inputFile, outputFile, options) {
  if (!(this instanceof CssnextCompiler)) {
    return new CssnextCompiler(sourceTrees, inputFile, outputFile, options)
  }

  CachingWriter.apply(this, [arguments[0]].concat(arguments[3]))

  options = options || {}

  this.sourceTrees = sourceTrees
  this.inputFile = inputFile
  this.outputFile = outputFile
  this.cssnextOptions = options
}

CssnextCompiler.prototype.updateCache = function (srcDir, destDir) {
  var destFile = destDir + '/' + this.outputFile

  mkdirp.sync(path.dirname(destFile))

  var cssnextOptions = {
    from: includePathSearcher.findFileSync(this.inputFile, srcDir)
  }

  merge(cssnextOptions, this.cssnextOptions)

  var data = fs.readFileSync(cssnextOptions.from, 'utf8')
  var output = cssnext(data, cssnextOptions)

  return writeFile(destFile, output, { encoding: 'utf8' })
}
