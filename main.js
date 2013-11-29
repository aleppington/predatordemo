function pp_start() {

    var preyInflow =
    {
        rate: 0.16
    };

    var preyOutflow =
    {
        rate: 1
    };

    var prey =
    {
        name: 'Prey',
        size: 164,
        x: 400,
        inflow: preyInflow,
        outflow: preyOutflow
    };

    var predatorInflow =
    {
        rate: 1
    };

    var predatorOutflow =
    {
        rate: 0.12
    };

    var predator =
    {
        name: 'Predator',
        size: 112,
        x: 200,
        inflow: predatorInflow,
        outflow: predatorOutflow
    };

    var stocks = [predator, prey];

    var view = initialiseView('#container');

    var preyOutflowControl = {

        execute: function() { prey.outflow.rate = predator.size * 0.0008; }
    }

    var predatorInflowControl = {
        execute: function() { predator.inflow.rate = prey.size * 0.001; }       
    }

    iterate(100, 100, function () { return performEquations(stocks, [preyOutflowControl, predatorInflowControl]); }, view);

};

function iterate(iterations, interval, calculator, view) {
    if (iterations <= 0) return;
    var stocks = calculator();
    updateView(view, stocks);
    setTimeout(function () { iterate(iterations - 1, interval, calculator, view); }, interval);
};

function performEquations(stocks, controls) {
 
    for (var i = controls.length - 1; i >= 0; i--) {
        controls[i].execute();
    };

    for (var i = stocks.length - 1; i >= 0; i--) {
        adjustStock(stocks[i]);
    };
    return stocks;
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

function updateView(svg, stocks) {
    var stockDisplays = svg.selectAll("g")
      .data(stocks);

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