'use strict';

var Filter = require('broccoli-filter');
var shell = require('shelljs');
var rsvp = require('rsvp');

function EmscriptenCompiler(inputTree, options) {
  if(!(this instanceof EmscriptenCompiler)) {
    return new EmscriptenCompiler(inputTree);
  }
  Filter.call(this, inputTree, options);

  this.inputTree = inputTree;
  this.options = options || {};
}

EmscriptenCompiler.prototype = Object.create(Filter.prototype);
EmscriptenCompiler.prototype.constructor = EmscriptenCompiler;

EmscriptenCompiler.prototype.extensions = ['cpp'];
EmscriptenCompiler.prototype.targetExtension = 'js';

EmscriptenCompiler.prototype.processFile = function(srcDir, destDir, relativePath) {
  var inputPath = srcDir + '/' + relativePath;
  var outputPath = destDir + '/' + this.getDestFilePath(relativePath);
  var preJs = __dirname + '/pre.js';
  var postJs = __dirname + '/post.js';

  var command = [
    "emcc",
    "--pre-js " + preJs,
    " --post-js " + postJs,
    " --bind -o " + outputPath,
    inputPath
  ].join(' ');

  var deferred = rsvp.defer();

  shell.exec(command, { silent: false }, function(code, output) {
    if (code === 0) {
      deferred.resolve();
    } else {
      deferred.reject(output);
    }
  });

  return deferred.promise;
};

module.exports = EmscriptenCompiler;
