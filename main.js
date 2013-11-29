function pp_start() {


    var prey = 
    {
        name : 'Prey', 
        size: 75, 
        x: 400,
        birthRate: 0.16,
        deathRate: 1
    };

    var predator = 
    {
        name:'Predator', 
        size:50, 
        x:200,
        birthRate: 1,
        deathRate: 0.12
    };

    var stocks = [predator, prey];

  var svg = d3.select('#container').append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);

   function doUpdate() {

     predator.size += (predator.size * predator.deathRate);
     prey.size -= (prey.size * prey.birthRate);
     
     update(svg, stocks);
   };
  
   setInterval(doUpdate, 100);
};

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