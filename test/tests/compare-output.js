var path = require('path');
var read = require('../utils/read')
var cssnextCompile = require('../utils/build');
var expected = path.join(__dirname, '..', 'expected');

function compare (name, cssnextOptions) {
  return cssnextCompile('../cssnext', name + '.css', name + '.css', cssnextOptions).then(function (result) {
    assert.equal(result.css, read(path.join(expected, result.outputFile)));
  });
}

describe('cssnextCompiler', function () {
  it('basic cssnext preprocessing', function () {
    return compare('basic');
  });

  it('import statements functioning', function () {
    return compare('import');
  });
});
