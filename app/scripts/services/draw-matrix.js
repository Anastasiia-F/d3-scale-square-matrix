function DrawMatrix() {

    this.squareSize = 0;
    this.svgWidth = 0;
    this.svgHeight = 0;
    this.amount = 0;
    this.rowTotalAmount = 0;
    this.verticalAmount = 0;
    this.isCreated = false;
}

DrawMatrix.prototype.init = function (params) {

    this.svgWidth = params.svgWidth;
    this.svgHeight = params.svgHeight;
    this.amount = params.amount;
    this.groupTag = params.groupTag;
    this.d3 = params.d3;

    this.squareSize = this.evaluateSquareSize();

    /* максимально возможное кол-во квадратов по вертикали*/
    this.verticalAmount = this.svgHeight / this.squareSize;
};

DrawMatrix.prototype.evaluateSquareSize = function () {
    let squareSize = Math.sqrt((this.svgWidth * this.svgHeight) / this.amount);
    squareSize = Math.floor(squareSize);
    return squareSize;
};

/* кол-во строк учитыва общее кол-во квадратов и коол-во квадратов в одной строке*/
DrawMatrix.prototype.columnTotalAmount = function () {

    this.rowTotalAmount = Math.floor(this.svgWidth / this.squareSize);

    return Math.ceil(this.amount / this.rowTotalAmount);

};

DrawMatrix.prototype.draw = function () {

    if(this.verticalAmount < this.columnTotalAmount()){
        while ((this.svgHeight / this.squareSize) < this.columnTotalAmount()) {
            this.squareSize = this.squareSize - 0.05;
        }
    }

    this.squareSize = parseInt(this.squareSize.toFixed(2));


    let rowCounter = 0;
    let lineCounter = 0;

    let data = this.d3.range(this.amount).map(function () {
        return {
            width : this.squareSize,
            height : this.squareSize,
            color: this.randomColor()
        };
    }.bind(this));


    let rect = this.groupTag.selectAll('rect');

    if(!this.isCreated){
        rect = rect.data(data);
        rect.enter().append('rect');

        this.isCreated = true;
    }

    rect.attr('fill', function (d) { return d.color})
        .attr('height', function (d) { return d.height})
        .attr('width', function (d) { return d.width})
        .attr('x', function (d, i) {
            let x;

            if(rowCounter < this.rowTotalAmount-1){
                x = this.squareSize * rowCounter;
                rowCounter++;
            }
            else if (rowCounter === this.rowTotalAmount-1){
                x = this.squareSize * rowCounter;
                rowCounter = 0;
            }

            if(i === this.amount-1){
                rowCounter = 0;
                lineCounter = 0;
            }

            return x;
        }.bind(this))
        .attr('y', function (d,i) {
            let y;

            if(rowCounter < this.rowTotalAmount-1){
                y = this.squareSize * lineCounter;
                rowCounter++;
            }
            else if (rowCounter === this.rowTotalAmount-1){
                y = this.squareSize * lineCounter;
                rowCounter = 0;
                lineCounter++;
            }

            if(i === this.amount-1){
                rowCounter = 0;
                lineCounter = 0;
            }

            return y;

        }.bind(this));
};

DrawMatrix.prototype.setSVGWidth = function (num) {
    this.svgWidth = num;
};

DrawMatrix.prototype.setSVGHeight = function (num) {
    this.svgHeight = num;
};

DrawMatrix.prototype.setAmount = function (num) {
    this.amount = num;
};

DrawMatrix.prototype.randomColor = function () {
    return "hsl(" + ~~(60 + Math.random() * 3000) + ",80%,60%)";
};