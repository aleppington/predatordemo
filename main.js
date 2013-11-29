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

  var svg = d3.select('#container').append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);

   function doUpdate(iteration) {

    if (iteration > 100) return;

    prey.deathRate = predator.size * 0.0008;
    predator.birthRate = prey.size * 0.001;

    predator.size = getAdjustedStock(predator.size, predator.birthRate, predator.deathRate);
    prey.size = getAdjustedStock(prey.size, prey.birthRate, prey.deathRate);

     update(svg, stocks);
     setTimeout(function() {doUpdate(iteration+1);}, 100);
   };
  
   doUpdate(1);

};

function getAdjustedStock(size, inflowRate, outflowRate){
    var reduction = size * outflowRate;
    var increase = size * inflowRate;
    var newSize = size + increase - reduction;

    return Math.max(newSize,0);
}

function update(svg, stocks){
     var circleGroups = svg.selectAll("g")
      .data(stocks);

    var g = circleGroups.enter().append('svg:g');
    g.append("circle")
        .attr('cx',  function(d) { return d.x;})
        .attr('cy', 200);

    g.append('text')
        .text(function (d) { return d.name;})
        .attr('x', function (d) {return d.x - 25;})
        .attr('y', 200)
        .attr('stroke','white');

    circleGroups.select("circle")
            .attr('r', function(d)  { return d.size;});
}