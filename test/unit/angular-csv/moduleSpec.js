'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('angularCsv', function () {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function (module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function () {
    module = angular.module('angularCsv');
    dependencies = module.requires;
  });

  it('should load config module', function () {
    expect(hasModule('angularCsv.config')).toBeTruthy();
  });

});
