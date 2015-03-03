/* jshint node: true */
'use strict';

var EmscriptenCompiler = require('./lib/emscripten-compiler');

module.exports = {
  name: 'Ember CLI Emscripten Addon',

  included: function(app) {
    app.registry.add('js', {
      name: 'ember-cli-emscripten',
      ext: 'js',

      toTree: function(tree, inputPath, outputPath) {
        var options = {
          srcDir: inputPath,
          destDir: outputPath
        };
        return EmscriptenCompiler(tree, options);
      }
    });
  }
};
