function DrawMatrix(Popup) {
    this.squareSize = 0;
    this.svgWidth = 0;
    this.svgHeight = 0;
    this.amount = 0;
    this.rowTotalAmount = 0;
    this.verticalAmount = 0;
    this.isCreated = false;
    this.rowCounter = 0;
    this.lineCounter = 0;
    this.popup = Popup;
}

DrawMatrix.prototype.init = function (params) {

    this.svgWidth = params.svgWidth;
    this.svgHeight = params.svgHeight;
    this.amount = params.amount;
    this.groupTag = params.groupTag;
    this.d3 = params.d3;

    this.squareSize = this._evaluateSquareSize();

    /* максимально возможное кол-во квадратов по вертикали*/
    this.verticalAmount = this.svgHeight / this.squareSize;
};

DrawMatrix.prototype._evaluateSquareSize = function () {
    let squareSize = Math.sqrt((this.svgWidth * this.svgHeight) / this.amount);
    squareSize = Math.floor(squareSize);
    return squareSize;
};

/* кол-во строк учитыва общее кол-во квадратов и коол-во квадратов в одной строке*/
DrawMatrix.prototype._columnTotalAmount = function () {

    this.rowTotalAmount = Math.floor(this.svgWidth / this.squareSize);

    return Math.ceil(this.amount / this.rowTotalAmount);

};

DrawMatrix.prototype.draw = function () {

    if(this.verticalAmount < this._columnTotalAmount()){
        while ((this.svgHeight / this.squareSize) < this._columnTotalAmount()) {
            this.squareSize = this.squareSize - 0.05;
        }
    }

    this.squareSize = parseInt(this.squareSize.toFixed(2));

    let data = this.d3.range(this.amount).map(function () {
        return {
            width : this.squareSize,
            height : this.squareSize,
            color: this._randomColor()
        };
    }.bind(this));


    if(this.isCreated){
        this.groupTag.selectAll('rect').remove();
    }

    let rect = this.groupTag.selectAll('rect');

    rect = rect.data(data);
    rect.enter().append('rect');

    this.isCreated = true;

    let randomColor = this._randomColor;
    let self = this;

    rect.attr('fill', function (d) { return d.color})
        .attr('height', function (d) { return d.height})
        .attr('width', function (d) { return d.width})
        .attr('x', function (d, i) {return this._setXaxis(i)}.bind(this))
        .attr('y', function (d,i) {return this._setYaxis(i)}.bind(this))
        .on('click', function () {
            self.popup.show(d3.select(this));
        })
        .on('mouseover', function () {
            d3.select(this)
                .transition().duration(150)
                    .attr('fill', randomColor)
        });
};

DrawMatrix.prototype.setSVGWidth = function (num) {
    this.svgWidth = num;
    this.squareSize = this._evaluateSquareSize();
};

DrawMatrix.prototype.setSVGHeight = function (num) {
    this.svgHeight = num;
    this.squareSize = this._evaluateSquareSize();
};

DrawMatrix.prototype.setAmount = function (num) {
    this.amount = num;
    this.squareSize = this._evaluateSquareSize();
};

DrawMatrix.prototype._randomColor = function () {
    return "hsl(" + ~~(Math.random() * 3000) + ",80%,60%)";
};

DrawMatrix.prototype._setXaxis = function (i) {

    let x;

    if(this.rowCounter < this.rowTotalAmount-1){
        x = this.squareSize * this.rowCounter;
        this.rowCounter++;
    }
    else if (this.rowCounter === this.rowTotalAmount-1){
        x = this.squareSize * this.rowCounter;
        this.rowCounter = 0;
    }

    if(i === this.amount-1){
        this.rowCounter = 0;
        this.lineCounter = 0;
    }

    return x;
};

DrawMatrix.prototype._setYaxis = function (i) {
    let y;

    if(this.rowCounter < this.rowTotalAmount-1){
        y = this.squareSize * this.lineCounter;
        this.rowCounter++;
    }
    else if (this.rowCounter === this.rowTotalAmount-1){
        y = this.squareSize * this.lineCounter;
        this.rowCounter = 0;
        this.lineCounter++;
    }

    if(i === this.amount-1){
        this.rowCounter = 0;
        this.lineCounter = 0;
    }

    return y;
};

DrawMatrix.prototype._popover = function (elem) {
    console.log(elem);
};