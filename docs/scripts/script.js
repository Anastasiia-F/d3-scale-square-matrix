(function () {
    'use strict';

    let app = angular.module('D3-app', ['d3','ngAnimate']);

    app.service('DrawMatrix',['Popup', DrawMatrix]);
    app.service('Zoom', Zoom);
    app.factory('POPUP_CONSTS', POPUP_CONSTS);
    app.service('Popup', ['POPUP_CONSTS', Popup]);
    app.directive('seatMap', ['d3Service', 'DrawMatrix', 'Zoom', 'Popup', 'POPUP_CONSTS', seatMap]);

})();