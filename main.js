function pp_start() {


    var prey = 
    {
        name : 'Prey', 
        size: 164, 
        x: 400,
        birthRate: 0.16,
        deathRate: 1
    };

    var predator = 
    {
        name:'Predator', 
        size:112, 
        x:200,
        birthRate: 1,
        deathRate: 0.12
    };

    var stocks = [predator, prey];

    var svg = initialiseView('#container');

   function doUpdate(iteration, interval, calculator) {

    if (iteration <= 0) return;

        calculator();

        updateView(svg, stocks);
        setTimeout(function() {doUpdate(iteration-1, interval, calculator);}, interval);
   };
  
   doUpdate(100, 100, function() {performEquations(predator, prey);});

};

function performEquations(predator, prey) {
    prey.deathRate = predator.size * 0.0008;
    predator.birthRate = prey.size * 0.001;

    predator.size = getAdjustedStock(predator.size, predator.birthRate, predator.deathRate);
    prey.size = getAdjustedStock(prey.size, prey.birthRate, prey.deathRate);
}

function initialiseView(divId) {
      var svg = d3.select(divId).append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);
    return svg;
}

function getAdjustedStock(size, inflowRate, outflowRate){
    var reduction = size * outflowRate;
    var increase = size * inflowRate;
    var newSize = size + increase - reduction;

    return Math.max(newSize,0);
}

function updateView(svg, stocks){
     var stockDisplays = svg.selectAll("g")
      .data(stocks);

    var g = stockDisplays.enter().append('svg:g');
    g.append("rect")
        .attr('x',  function(d) { return d.x;})
        .attr('width',100);

    g.append('text')
        .attr('x', function (d) {return d.x;})
        .attr('y', 580)
        .attr('stroke','white');

    stockDisplays.select("rect")
            .attr('height', function(d)  { return d.size;})
            .attr('y', function(d) {return 560 - d.size;});

    stockDisplays.select("text")
             .text(function (d) { return d.name + ' (' + Math.round(d.size * 100)/100 + ')';});
}