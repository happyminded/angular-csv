angularCsv - save data from browser as csv file
======

A simple AngularJS directive to save Javascript arrays from browser as CSV files.
Inspired by asafdav's ng-csv https://github.com/asafdav/ng-csv

csv string is build only on clicking the element with the directive

## Options
Optional attributes for the directive:
csv-header - optional header to put as column names as first row in csv file;
csv-delimiter - optional text delimiter to escape string values in csv file;
csv-separator - optional value separator for csv file, defaults to ',';

## Usage
1. Add csv.min.js to your main file (index.html)

2. Set `angular-csv` as a dependency in your module
  ```javascript
  var myapp = angular.module('myapp', ['csv'])
  ```

3. Add ng-csv directive to an element, example:
  ```html
  <button type="button" csv="getData()" filename="data.csv">Save</button>
  ```

