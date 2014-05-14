'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('csv', function () {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function (module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function () {
    module = angular.module('csv');
    dependencies = module.requires;
  });

  it('should load config module', function () {
    expect(hasModule('csv.config')).toBeTruthy();
  });

});
