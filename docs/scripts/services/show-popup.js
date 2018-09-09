function Popup(POPUP_CONSTS) {
   this.popup = null;
   this.popupHeight = null;
   this.popupWidth = null;
   this.consts = POPUP_CONSTS;
   this.cornerOffset = 0;
   this.svg = null;
   this.corner = null;
}

Popup.prototype.setData = function(popup, svg){
    this.popup = popup;
    this.svg = svg;
    this.popupHeight = popup.node().getBoundingClientRect().height;
    this.popupWidth = popup.node().getBoundingClientRect().width;
    this.corner = popup.select('polyline');
    this.svgWidth = svg.attr('width');

    let cornerX =this.corner.node().getBoundingClientRect().x;
    let rectX = popup.select('rect').node().getBoundingClientRect().x;
    this.cornerOffset = cornerX - rectX;
};

Popup.prototype.show = function(elem){
    this.popup.attr('opacity', '0');
    let transform = this._setTransform(elem);
    this.popup
        .attr('transform', transform)
        .transition().duration(150)
        .attr('opacity', '1');

};

Popup.prototype._setTransform = function(elem){
    let elemX = elem.attr('x');
    let elemY = elem.attr('y');
    let rightOffset = 25;
    let maxX = this.svgWidth - this.popupWidth - rightOffset;
    let popupX = elemX - this.cornerOffset - (this.consts.cornerWidth/2);
    let popupY = elemY - this.popupHeight;
    let offsetX = elem.attr('width') / 2;

    if(popupX > maxX){
        popupX = maxX;
        let cornerOffset = (elemX - popupX - offsetX);
        this.corner.attr('transform', 'translate('+cornerOffset+')');
    }
    else {
        this.corner.attr('transform', 'translate('+this.cornerOffset+')');
    }

    return 'translate('+ (popupX + offsetX) +', '+ (popupY) +')';
};