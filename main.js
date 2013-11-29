function pp_start() {


    var prey =
    {
        name: 'Prey',
        size: 164,
        x: 400,
        inflow: 0.16,
        outflow: 1
    };

    var predator =
    {
        name: 'Predator',
        size: 112,
        x: 200,
        inflow: 1,
        outflow: 0.12
    };

    var stocks = [predator, prey];

    var view = initialiseView('#container');

    var preyOutflowControl = {

        execute: function() { prey.outflow = predator.size * 0.0008; }
    }

    var predatorInflowControl = {
        execute: function() { predator.inflow = prey.size * 0.001; }       
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
    var predator = stocks[0];
    var prey = stocks[1];
 
    for (var i = controls.length - 1; i >= 0; i--) {
        controls[i].execute();
    };

    adjustStock(prey, prey.inflow, prey.outflow);
    adjustStock(predator, predator.inflow, predator.outflow);
    return stocks;
}



function initialiseView(divId) {
    var svg = d3.select(divId).append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);
    return svg;
}

function adjustStock(stock, inflowRate, outflowRate) {
    var reduction = stock.size * outflowRate;
    var increase = stock.size * inflowRate;
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