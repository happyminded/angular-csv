/**
 * angular-csv module
 * Save Javascript arrays from browser as csv files
 *
 * Author: happyminded - https://github.com/happyminded
 * Inspired by asafdav's ng-csv
 *
 */
csv.directive('csv', ['save', function (save) {
  return {
    restrict: 'AC',
    scope: {
      csvData: '&',
      csvFilename: '@',
      csvHeader: '&',
      csvDelimiter: '@',
      csvSeparator: '@'
    },
    link: function (scope, element) {
      element.bind('click', function () {
        save(scope.data(), {
          filename: scope.csvFilename,
          header: scope.csvHeader(),
          delimiter: scope.csvDelimiter,
          separator: scope.csvSeparator
        });
      });
    }
  };
}]);
