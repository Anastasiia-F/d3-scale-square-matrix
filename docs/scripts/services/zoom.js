function Zoom() {
    this.svgWidth = 0;
    this.svgHeight = 0;
}

Zoom.prototype.add = function (params) {

    let d3 = params.d3,
        group = params.group,
        svg = params.svg;


    this.svgWidth = params.svgWidth;
    this.svgHeight = params.svgHeight;

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
                tx = Math.min(0, Math.max(e.translate[0], this.svgWidth - this.svgWidth * e.scale)),
                ty = Math.min(0, Math.max(e.translate[1], this.svgHeight - this.svgHeight * e.scale));

            // then, update the zoom behavior's internal translation, so that
            // it knows how to properly manipulate it on the next movement
            zoom.translate([tx, ty]);
            // and finally, update the <g> element's transform attribute with the
            // correct translation and scale (in reverse order)
            group.attr("transform", [
                "translate(" + [tx, ty] + ")",
                "scale(" + e.scale + ")"
            ].join(" "));
        }.bind(this));

    // then, call the zoom behavior on the svg element, which will add
    // all of the necessary mouse and touch event handlers.
    // remember that if you call this on the <g> element, the even handlers
    // will only trigger when the mouse or touch cursor intersects with the
    // <g> elements' children!
    svg.call(zoom);
};

Zoom.prototype.setWidth = function (num) {
    this.svgWidth = num;
};

Zoom.prototype.setHeight = function (num) {
    this.svgHeight = num;
};