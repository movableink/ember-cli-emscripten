# Ember-CLI Emscripten

ember-cli-emscripten allows you to add emscripten-flavored c or c++ code to your ember app, then require the exposed functions and classes.

## Installation

`ember install:addon ember-cli-emscripten`

## Usage

This addon uses emscripten's (embind)[http://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/ embind.html] to expose c/c++ functions to javascript.  From the emscripten example:

```
#include <emscripten/bind.h>

using namespace emscripten;

float lerp(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("lerp", &lerp);
}
```

ember-cli-emscripten then exports `lerp` via ES6, so you could use it like so:

```
import lerp from 'ember-app/compiled/lerp';

lerp.lerp(1, 2.5, 5)
```

## TODO

* Right now every cpp file that gets compiled to js includes the emscripten runtime. Ideally this should only be included once per project.
* Expose emscripten emcc optimization options.

## License

See LICENSE.
