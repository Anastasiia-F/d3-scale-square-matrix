(function () {
    'use strict';

    var app = angular.module('D3-app', ['d3']);

    app.factory('evaluateSquareSize', evaluateSquareSize);
    // app.factory('setXattr', setXattr);
    // app.factory('setYattr', setYattr);
    app.directive('seatMap', ['d3Service', 'evaluateSquareSize', seatMap]);

})();