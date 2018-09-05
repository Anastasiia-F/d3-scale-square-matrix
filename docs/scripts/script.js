(function () {
    'use strict';

    var app = angular.module('D3-app', ['d3','ngAnimate', 'ui.bootstrap']);

    app.service('DrawMatrix', DrawMatrix);
    app.service('Zoom', Zoom);
    app.directive('seatMap', ['d3Service', 'DrawMatrix', 'Zoom', seatMap]);
    app.controller('popoverCtrl', popoverCtrl);

})();