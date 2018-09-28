function seatMap(d3Service, DrawMatrix, Zoom, Popup, POPUP_CONSTS) {
    return {
        link: link,
        controller: controller,
        controllerAs : 'ctrl'
    };

    function link (scope, elem){

        d3Service.d3()
            .then(function(d3) {

                let svgWidth = scope.ctrl.matrixWidth,
                    svgHeight = scope.ctrl.matrixHeight,
                    amount = scope.ctrl.matrixItemAmount;

                let widthInput = elem[0].querySelector('[ng-model="ctrl.matrixWidth"]');

                widthInput.addEventListener('change', function () {
                    svgWidth = this.value;
                    svg.attr('width', svgWidth);

                    DrawMatrix.setSVGWidth(svgWidth);
                    DrawMatrix.draw();

                    Popup.updateData('svgWidth', svgWidth);

                    Zoom.setWidth(svgWidth);
                });

                let heightInput = elem[0].querySelector('[ng-model="ctrl.matrixHeight"]');

                heightInput.addEventListener('change', function () {
                    svgHeight = this.value;
                    svg.attr('height', svgHeight);

                    DrawMatrix.setSVGHeight(svgHeight);
                    DrawMatrix.draw();

                    Popup.updateData('svgHeight', svgHeight);

                    Zoom.setHeight(svgHeight);
                });

                let amountInput = elem[0].querySelector('[ng-model="ctrl.matrixItemAmount"]');

                amountInput.addEventListener('change', function () {
                    amount = this.value;

                    DrawMatrix.setAmount(amount);
                    DrawMatrix.draw();
                });


                let svg = d3.select('svg')
                        .style("background-color", '#e3e7ec');

                let popupGroup = d3.select('#popup-group');

                let matrixGroup = svg.append("g");

                svg.insert(
                    function () {
                        return matrixGroup.node();
                }, function () {
                        return popupGroup.node();
                });

                Zoom.add({
                    d3 : d3,
                    svg : svg,
                    svgWidth : svgWidth,
                    svgHeight : svgHeight,
                    group : matrixGroup
                });

                DrawMatrix.init({
                    svgWidth : scope.ctrl.matrixWidth,
                    svgHeight : scope.ctrl.matrixHeight,
                    amount : scope.ctrl.matrixItemAmount,
                    groupTag : matrixGroup,
                    d3 : d3
                });

                DrawMatrix.draw();

                Popup.setData(popupGroup, svg);

            });

    }

    function controller (){
        this.matrixWidth = 700;
        this.matrixHeight = 500;
        this.matrixItemAmount = 300;
        this.cornerOffset = 20;
        this.scale = POPUP_CONSTS.scale;
    }
}
