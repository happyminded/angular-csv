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
      csvData: '&csv',
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
