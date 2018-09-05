function seatMap(d3Service, DrawMatrix, Zoom) {
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

                let wrapper = elem[0].querySelector('[data-matrix-wrapper]');

                let widthInput = elem[0].querySelector('[ng-model="ctrl.matrixWidth"]');

                widthInput.addEventListener('change', function () {
                    svgWidth = this.value;
                    svg.attr('width', svgWidth);

                    DrawMatrix.setSVGWidth(svgWidth);
                    DrawMatrix.draw();

                    Zoom.setWidth(svgWidth);
                });

                let heightInput = elem[0].querySelector('[ng-model="ctrl.matrixHeight"]');

                heightInput.addEventListener('change', function () {
                    svgHeight = this.value;
                    svg.attr('height', svgHeight);

                    DrawMatrix.setSVGHeight(svgHeight);
                    DrawMatrix.draw();

                    Zoom.setHeight(svgHeight);
                });

                let amountInput = elem[0].querySelector('[ng-model="ctrl.matrixItemAmount"]');

                amountInput.addEventListener('change', function () {
                    amount = this.value;

                    DrawMatrix.setAmount(amount);
                    DrawMatrix.draw();
                });

                // create your svg element and a <g> container
                // for all of the transformed content
                let svg = d3.select(wrapper).append("svg")
                        .attr("width", svgWidth)
                        .attr("height", svgHeight)
                        .style("background-color", '#e3e7ec'),
                    group = svg.append("g");

                Zoom.add({
                    d3 : d3,
                    svg : svg,
                    svgWidth : svgWidth,
                    svgHeight : svgHeight,
                    group : group
                });

                DrawMatrix.init({
                    svgWidth : scope.ctrl.matrixWidth,
                    svgHeight : scope.ctrl.matrixHeight,
                    amount : scope.ctrl.matrixItemAmount,
                    groupTag : group,
                    d3 : d3
                });

                DrawMatrix.draw();

            });

    }

    function controller (){
        this.matrixWidth = 300;
        this.matrixHeight = 200;
        this.matrixItemAmount = 10;
    }
}
