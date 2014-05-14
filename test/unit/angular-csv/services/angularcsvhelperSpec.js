/* jshint indent: 2*/
// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';
describe('angularCsvHelper', function() {
  var angularCsvHelper;
  var $rootScope;
  var options;

  beforeEach(module('angularCsv'));

  beforeEach(inject(function(_angularCsvHelper_, _$rootScope_, _$document_) {
    angularCsvHelper = _angularCsvHelper_;
    $document = _$document_;
    $rootScope = _$rootScope_;
    $rootScope.dataArr = [['a', 'b', 1], ['c', 'd', 2]];
    $rootScope.dataObj = [{ a: 'a', b: 'b', c: 1 }, { a: 'c', b: 'd', c: 2 }];
  }));

  describe('with defaults', function() {
    beforeEach(function() {
      options = {};
    });

    it('should not alter row arrays', function() {
      expect(angularCsvHelper.makeDataArray($rootScope.dataArr, options))
        .toEqual($rootScope.dataArr);
    });

    it('should make row arrays from row objects', function() {
      expect(angularCsvHelper.makeDataArray($rootScope.dataObj, options))
        .toEqual($rootScope.dataArr);
    });

    it('should make csv string', function() {
      expect(angularCsvHelper.makeCsvString($rootScope.dataArr, options))
        .toBe('data:text/csv;charset=utf-8,a,b,1%0D%0Ac,d,2%0D%0A');
    });
  });

  describe('with custom delimiter', function() {
    var delimitedArray;
    beforeEach(function() {
      options = { delimiter: '"' };
      delimitedArray = [['"a"', '"b"', 1], ['"c"', '"d"', 2]];
    });

    it('should add delimiter to string values in row arrays', function() {
      expect(angularCsvHelper.makeDataArray($rootScope.dataArr, options))
        .toEqual(delimitedArray);
    });

    it('should add delimiter to string values in row objects', function() {
      expect(angularCsvHelper.makeDataArray($rootScope.dataObj, options))
        .toEqual(delimitedArray);
    });

    it('should make csv string', function() {
      expect(angularCsvHelper.makeCsvString(delimitedArray, options))
        .toBe('data:text/csv;charset=utf-8,' +
          '%22a%22,%22b%22,1%0D%0A' +
          '%22c%22,%22d%22,2%0D%0A');
    });
  });

  describe('with custom separator', function() {
    beforeEach(function() {
      options = { separator: ';' };
    });

    it('should make csv string', function() {
      expect(angularCsvHelper.makeCsvString($rootScope.dataArr, options))
        .toBe('data:text/csv;charset=utf-8,' +
          'a;b;1%0D%0A' +
          'c;d;2%0D%0A');
    });
  });

  describe('with header', function() {
    beforeEach(function() {
      options = { header: ['col1', 'col2', 'col3'] };
    });

    it('should add header and not alter row arrays', function() {
      expect(angularCsvHelper.makeDataArray($rootScope.dataArr, options))
        .toEqual([options.header].concat($rootScope.dataArr));
    });

    it('should add header and make row arrays from row objects', function() {
      expect(angularCsvHelper.makeDataArray($rootScope.dataObj, options))
        .toEqual([options.header].concat($rootScope.dataArr));
    });

    it('should make csv string', function() {
      expect(angularCsvHelper.makeCsvString([options.header].concat($rootScope.dataArr),
          options))
        .toBe('data:text/csv;charset=utf-8,' +
          'col1,col2,col3%0D%0A' +
          'a,b,1%0D%0A' +
          'c,d,2%0D%0A');
    });
  });

});
