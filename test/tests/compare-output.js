/* global require, __dirname, describe, it, assert */

var path = require('path')
var read = require('../utils/read')
var cssnextCompile = require('../utils/build')
var expected = path.join(__dirname, '..', 'expected')

function compare(name, cssnextOptions) {
  return cssnextCompile('../cssnext', name + '.css', name + '.css', cssnextOptions).then(function(result) {
    assert.equal(result.css, read(path.join(expected, result.outputFile)))

    return result
  })
}

describe('cssnextCompiler', function () {
  it('basic cssnext preprocessing', function () {
    return compare('basic')
  })

  it('import statements functioning', function () {
    return compare('import')
  })

  it('can create external sourcemaps', function () {
    return compare('external-sourcemap', { map: { inline: false } }).then(function(result) {
      assert.equal(
        read(path.join(result.directory, result.outputFile + '.map')),
        read(path.join(expected, result.outputFile + '.map'))
      )
    })
  })
})
