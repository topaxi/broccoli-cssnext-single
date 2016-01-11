/* global require */

var fs                  = require('fs')
var path                = require('path')
var mkdirp              = require('mkdirp')
var includePathSearcher = require('include-path-searcher')
var CachingWriter       = require('broccoli-caching-writer')
var cssnext             = require('cssnext')
var merge               = require('lodash.merge')

module.exports = CssnextCompiler

CssnextCompiler.prototype = Object.create(CachingWriter.prototype)
CssnextCompiler.prototype.constructor = CssnextCompiler

function CssnextCompiler (sourceTrees, inputFile, outputFile, _options) {
  if (!(this instanceof CssnextCompiler)) {
    return new CssnextCompiler(sourceTrees, inputFile, outputFile, _options)
  }

  CachingWriter.call(this, Array.isArray(sourceTrees) ? sourceTrees : [ sourceTrees ], _options)

  var options = merge({}, _options)

  this.sourceTrees    = sourceTrees
  this.inputFile      = inputFile
  this.outputFile     = outputFile
  this.cssnextOptions = options
}

CssnextCompiler.prototype.build = function() {
  var destFile = this.outputPath + '/' + this.outputFile

  mkdirp.sync(path.dirname(destFile))

  var from = includePathSearcher.findFileSync(this.inputFile, this.inputPaths)
  var dir  = path.dirname(from)
  var cssnextOptions = {
    from: this.inputFile,
    import: { root: dir, path: [ dir ] },
    path: [ dir ]
  }

  merge(cssnextOptions, this.cssnextOptions)

  var data   = fs.readFileSync(from, 'utf8')
  var output = cssnext(data, cssnextOptions)

  fs.writeFileSync(destFile, output, { encoding: 'utf8' })

  if (output.map) {
    fs.writeFileSync(destFile + '.map', output.map, { encoding: 'utf8' })
  }
}
