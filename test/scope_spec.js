'use strict';

var Scope = require('../src/scope');

describe("Scope", function () {
  it("can be constructed and used as an object", function () {
    var scope = new Scope();
    scope.aProperty = 1;

    expect(scope.aProperty).toBe(1);
  });
});

describe("digest", function () {
  var scope;

  beforeEach(function () {
    scope = new Scope();
  });

  it("calls listener when watch value is first undefined", function () {
    scope.counter = 0;

    scope.$watch(
      function (scope) {
        return scope.someValue;
      },
      function (newValue, oldValue, scope) {
        scope.counter++;
      });

    scope.$digest();
    expect(scope.counter).toBe(1);
  });

  it("may have watchers that omit the listener function", function () {
    var watchFn = jasmine.createSpy().and.returnValue('something');
    scope.$watch(watchFn);

    scope.$digest();

    expect(watchFn).toHaveBeenCalled();
  });
});
