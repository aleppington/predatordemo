function pp_start() {

    var model = createModel();

    var view = initialiseView('#container');

    iterate(100, 100, function () { return step(model); }, view);

};

function iterate(iterations, interval, calculator, view) {
    if (iterations <= 0) return;
    var model = calculator();
    updateView(view, model);
    setTimeout(function () { iterate(iterations - 1, interval, calculator, view); }, interval);
};

function step(model) {
 
    for (var i = model.controls.length - 1; i >= 0; i--) {
        model.controls[i].execute();
    };

    for (var i = model.stocks.length - 1; i >= 0; i--) {
        adjustStock(model.stocks[i]);
    };
    return model;
}



function initialiseView(divId) {
    var svg = d3.select(divId).append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);
    return svg;
}

function adjustStock(stock) {
    var reduction = stock.size * stock.outflow.rate;
    var increase = stock.size * stock.inflow.rate;

    var newSize = stock.size + increase - reduction;

    stock.size = Math.max(newSize, 0);
}

function updateView(svg, model) {
    var stockDisplays = svg.selectAll("g")
      .data(model.stocks);

    var g = stockDisplays.enter().append('svg:g');
    g.append("rect")
        .attr('x', function (d) { return d.x; })
        .attr('width', 100);

    g.append('text')
        .attr('x', function (d) { return d.x; })
        .attr('y', 580)
        .attr('stroke', 'white');

    stockDisplays.select("rect")
            .attr('height', function (d) { return d.size; })
            .attr('y', function (d) { return 560 - d.size; });

    stockDisplays.select("text")
             .text(function (d) { return d.name + ' (' + Math.round(d.size * 100) / 100 + ')'; });
}