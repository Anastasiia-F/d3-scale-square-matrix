function evaluateSquareSize() {
    return function (params) {
        var squareSize = Math.sqrt((params.svgWidth * params.svgHeight) / params.amount);
        squareSize = Math.floor(squareSize);
        return squareSize;
    };
}