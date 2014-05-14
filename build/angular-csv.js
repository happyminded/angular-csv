// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('angularCsv.config', [])
  .value('angularCsv.config', { debug: true })
  .config(['$compileProvider', function($compileProvider) {
    if (angular.isDefined($compileProvider.urlSanitizationWhitelist)) {
      $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
    } else {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
    }
  }]);

// Modules
var angularCsv = angular.module('angularCsv', ['angularCsv.config', 'ngSanitize']);
/**
 * angular-csv module
 * Save Javascript arrays from browser as csv files
 *
 * Author: happyminded - https://github.com/happyminded
 * Inspired by asafdav's ng-csv
 *
 */
angularCsv.directive('angularCsv', ['angularCsvHelper', function (angularCsvHelper) {
  return {
    restrict: 'AC',
    scope: {
      csvData: '&angularCsv',
      csvFilename: '@',
      csvHeader: '&',
      csvDelimiter: '@',
      csvSeparator: '@'
    },
    link: function (scope, element) {
      element.bind('click', function () {
        angularCsvHelper.save(scope.csvData(), {
          filename: scope.csvFilename,
          header: scope.csvHeader(),
          delimiter: scope.csvDelimiter,
          separator: scope.csvSeparator
        });
      });
    }
  };
}]);
angularCsv.factory('angularCsvHelper', function($document) {'use strict';
  var fns = {
    makeDefaults: function(options) {
      options.separator = options.separator || ',';
      options.filename = options.filename || 'data.csv';
      return options;
    },

    makeDataArray: function(data, options) {
      options = fns.makeDefaults(options);
      var dataArray = [];
      if (options.header) {
        data = [options.header].concat(data);
      }

      angular.forEach(data, function (row) {
        var rowArray = [];
        angular.forEach(row, function (value) {
          if (typeof value === 'string' && options.delimiter) {
            value = options.delimiter + value + options.delimiter;
          }
          this.push(value);
        }, rowArray);
        this.push(rowArray);
      }, dataArray);
      return dataArray;
    },

    makeCsvString: function(dataArray, options) {
      options = fns.makeDefaults(options);
      var csvString = 'data:text/csv;charset=utf-8,';
      angular.forEach(dataArray, function(rowArray) {
        csvString += rowArray.join(options.separator) + '\r\n';
      });
      return encodeURI(csvString);
    },

    makeAnchor: function(dataStr, options) {
      options = fns.makeDefaults(options);
      var saveAnchor = angular.element('<a></a>');
      saveAnchor.attr('download', options.filename);
      saveAnchor.attr('href', dataStr);
      saveAnchor.css('visibility', 'hidden');
      saveAnchor.css('position', 'absolute');
      return saveAnchor;
    },

    appendElement: function(el) {
      var body = angular.element($document[0].body);
      body.append(el);
    },

    save: function(data, options) {
      options = fns.makeDefaults(options);
      var dataArr = fns.makeDataArray(data, options);
      var dataStr = fns.makeCsvString(dataArr, options);
      var saveAnchor = fns.makeAnchor(dataStr, options);
      fns.appendElement(saveAnchor);
      saveAnchor[0].click();
      saveAnchor.remove();
    }
  };
  return fns;
});
