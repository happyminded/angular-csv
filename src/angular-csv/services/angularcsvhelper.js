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
