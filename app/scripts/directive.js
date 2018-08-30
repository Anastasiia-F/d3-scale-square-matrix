function seatMap(d3Service, DrawMatrix) {
    return {
        link: function(scope, elem, attrs){

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
                    });

                    let heightInput = elem[0].querySelector('[ng-model="ctrl.matrixHeight"]');

                    heightInput.addEventListener('change', function () {
                        svgHeight = this.value;
                        svg.attr('height', svgHeight);

                        DrawMatrix.setSVGHeight(svgHeight);
                        DrawMatrix.draw();
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

                    addZoom(svg);

                    DrawMatrix.init({
                        svgWidth : scope.ctrl.matrixWidth,
                        svgHeight : scope.ctrl.matrixHeight,
                        amount : scope.ctrl.matrixItemAmount,
                        groupTag : group,
                        d3 : d3
                    });

                    DrawMatrix.draw();

                });

        },
        controller: function(){
            this.matrixWidth = 300;
            this.matrixHeight = 200;
            this.matrixItemAmount = 10;
        },
        controllerAs : 'ctrl'
    }
}


function addZoom(svg) {
    // then, create the zoom behvavior
    let zoom = d3.behavior.zoom()
    // only scale up, e.g. between 1x and 50x
        .scaleExtent([1, 50])
        .on("zoom", function() {
            // the "zoom" event populates d3.event with an object that has
            // a "translate" property (a 2-element Array in the form [x, y])
            // and a numeric "scale" property
            let e = d3.event,
                // now, constrain the x and y components of the translation by the
                // dimensions of the viewport
                tx = Math.min(0, Math.max(e.translate[0], svgWidth - svgWidth * e.scale)),
                ty = Math.min(0, Math.max(e.translate[1], svgHeight - svgHeight * e.scale));
            // then, update the zoom behavior's internal translation, so that
            // it knows how to properly manipulate it on the next movement
            zoom.translate([tx, ty]);
            // and finally, update the <g> element's transform attribute with the
            // correct translation and scale (in reverse order)
            group.attr("transform", [
                "translate(" + [tx, ty] + ")",
                "scale(" + e.scale + ")"
            ].join(" "));
        });

    // then, call the zoom behavior on the svg element, which will add
    // all of the necessary mouse and touch event handlers.
    // remember that if you call this on the <g> element, the even handlers
    // will only trigger when the mouse or touch cursor intersects with the
    // <g> elements' children!
    svg.call(zoom);
}