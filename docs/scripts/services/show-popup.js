function Popup(POPUP_CONSTS) {
   this.popup = null;
   this.popupHeight = null;
   this.popupWidth = null;
   this.cornerWidth = POPUP_CONSTS.cornerWidth;
   this.cornerTopOffset = POPUP_CONSTS.cornerTopOffset;
   this.cornerLeftOffset = POPUP_CONSTS.cornerLeftOffset;
   this.cornerRotate = POPUP_CONSTS.cornerRotate;
   this.cornerMinusTopOffset = POPUP_CONSTS.cornerMinusTopOffset;
   this.closeTransform = POPUP_CONSTS.closeTransform;
   this.svg = null;
   this.corner = null;
   this.closeBtn = null;
}

Popup.prototype.setData = function(popup, svg){
    this.popup = popup;
    this.svg = svg;
    this.popupHeight = popup.node().getBoundingClientRect().height;
    this.popupWidth = popup.node().getBoundingClientRect().width;
    this.corner = popup.select('polyline');
    this.svgWidth = svg.attr('width');
    this.closeBtn = popup.select('#closeIcon');

    let self = this;

    this.closeBtn.on('click', function () {
        self.close();
    })
};

Popup.prototype.updateData = function (attr, value) {
    for(let key in this){
        if(key == attr){
            this[key] = value;
            console.log(this[key]);
        }
    }
};

Popup.prototype.show = function(elem){
    this.popup.attr('opacity', '0');
    let transformData = this._setTransform(elem);
    this.popup
        .attr('transform', transformData.popup)
        .transition().duration(150)
        .attr('opacity', '1');

    this.corner.attr('transform', transformData.corner);
};

Popup.prototype.close = function(){
    this.popup
        .transition().duration(150)
        .attr('opacity', '0')
        .transition().duration(0)
        .attr('transform', this.closeTransform)
};

Popup.prototype._setTransform = function(elem){
    let elemX = parseInt(elem.attr('x'));
    let elemY = parseInt(elem.attr('y'));
    let elemHeight = parseInt(elem.attr('height'));
    let rightOffset = 25;
    let topOffset = 10;
    let maxX = this.svgWidth - this.popupWidth - rightOffset;
    let popupX = elemX - this.cornerLeftOffset - (this.cornerWidth/2);
    let popupY = elemY - this.popupHeight;
    let offsetX = parseInt(elem.attr('width')) / 2;
    let cornerXOffset = this.cornerLeftOffset;
    let cornerYOffset = this.cornerTopOffset;
    let rotate = '';


    if(popupX > maxX){
        popupX = maxX;
        cornerXOffset = (elemX - popupX - offsetX);
    }

    if(popupY <= 0){
        popupY = elemY + elemHeight + topOffset;
        cornerYOffset = this.cornerMinusTopOffset;
        rotate =  this.cornerRotate;
    }

    let cornerTransform = 'translate(' + cornerXOffset + ',' + cornerYOffset + ')' + rotate;

    let popupTransform = 'translate('+ (popupX + offsetX) +', '+ (popupY) +')';

    return {
        popup : popupTransform,
        corner : cornerTransform
    }
};