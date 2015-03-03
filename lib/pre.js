// emcc tries to access `this` when it is undefined, so wrap it in an anonymous
// function and bind `this` to something else.
var mod = {};
(function() {
