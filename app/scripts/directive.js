function seatMap(d3Service, evaluateSquareSize) {
    return {
        link: function(scope, elem, attrs){

            d3Service.d3()
                .then(function(d3) {

                    let index = 0;

                    let svgWidth = scope.ctrl.matrixWidth,
                        svgHeight = scope.ctrl.matrixHeight,
                        amount = scope.ctrl.matrixItemAmount;

                    let wrapper = elem[0].querySelector('[data-matrix-wrapper]');

                    let widthInput = elem[0].querySelector('[ng-model="ctrl.matrixWidth"]');

                    widthInput.addEventListener('change', function () {
                        svgWidth = this.value;
                        svg.attr('width', svgWidth);
                        drawMatrix();
                    });
                    // create your svg element and a <g> container
                    // for all of the transformed content
                    let svg = d3.select(wrapper).append("svg")
                            .attr("width", svgWidth)
                            .attr("height", svgHeight)
                            .style("background-color", '#e3e7ec'),
                        group = svg.append("g");


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

                    function drawMatrix() {
                        let squareSize = evaluateSquareSize({
                            svgWidth : svgWidth,
                            svgHeight : scope.ctrl.matrixHeight,
                            amount : scope.ctrl.matrixItemAmount
                        });

                        let rowTotalAmount = 0;

                        /* кол-во строк учитыва общее кол-во квадратов и коол-во квадратов в одной строке*/
                        let columnTotalAmount = function () {

                            rowTotalAmount = Math.floor(svgWidth / squareSize);

                            return Math.ceil(amount / rowTotalAmount);

                        };

                        /* максимально возможное кол-во квадратов по вертикали*/
                        let verticalAmount = svgHeight / squareSize;

                        if(verticalAmount < columnTotalAmount()){
                            while ((svgHeight / squareSize) < columnTotalAmount()) {
                                squareSize = squareSize - 0.05;
                            }
                        }

                        squareSize = squareSize.toFixed(2);

                        let rowCounter = 0;
                        let lineCounter = 0;

                        let data = d3.range(amount).map(function () {
                            return {
                                width : squareSize,
                                height : squareSize,
                                color: randomColor()
                            }
                        });


                        let rect = group.selectAll('rect');

                        if(index){
                            rect.attr('fill', function (d) { return d.color})
                                .attr('height', function (d) { return d.height})
                                .attr('width', function (d) { return d.width})
                                .attr('x', function (d, i) {
                                    let x;

                                    if(rowCounter < rowTotalAmount-1){
                                        x = squareSize * rowCounter;
                                        rowCounter++;
                                    }
                                    else if (rowCounter === rowTotalAmount-1){
                                        x = squareSize * rowCounter;
                                        rowCounter = 0;
                                    }

                                    if(i === amount-1){
                                        rowCounter = 0;
                                        lineCounter = 0;
                                    }

                                    return x;
                                })
                                .attr('y', function (d,i) {
                                    let y;

                                    if(rowCounter < rowTotalAmount-1){
                                        y = squareSize * lineCounter;
                                        rowCounter++;
                                    }
                                    else if (rowCounter === rowTotalAmount-1){
                                        y = squareSize * lineCounter;
                                        rowCounter = 0;
                                        lineCounter++;
                                    }

                                    if(i === amount-1){
                                        rowCounter = 0;
                                        lineCounter = 0;
                                    }

                                    return y;
                                });
                        }
                        else {
                            rect = rect.data(data);
                            rect.enter().append('rect')
                                .attr('fill', function (d) { return d.color})
                                .attr('height', function (d) { return d.height})
                                .attr('width', function (d) { return d.width})
                                .attr('x', function (d, i) {
                                    let x;

                                    if(rowCounter < rowTotalAmount-1){
                                        x = squareSize * rowCounter;
                                        rowCounter++;
                                    }
                                    else if (rowCounter === rowTotalAmount-1){
                                        x = squareSize * rowCounter;
                                        rowCounter = 0;
                                    }

                                    if(i === amount-1){
                                        rowCounter = 0;
                                        lineCounter = 0;
                                    }

                                    return x;
                                })
                                .attr('y', function (d,i) {
                                    let y;

                                    if(rowCounter < rowTotalAmount-1){
                                        y = squareSize * lineCounter;
                                        rowCounter++;
                                    }
                                    else if (rowCounter === rowTotalAmount-1){
                                        y = squareSize * lineCounter;
                                        rowCounter = 0;
                                        lineCounter++;
                                    }

                                    if(i === amount-1){
                                        rowCounter = 0;
                                        lineCounter = 0;
                                    }

                                    return y;
                                });

                            rect.exit().remove();

                            index++;
                        }
                    }

                    drawMatrix();

                    function randomColor() {
                        return "hsl(" + ~~(60 + Math.random() * 3000) + ",80%,60%)";
                    }
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