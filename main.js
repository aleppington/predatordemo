function pp_start() {


    var prey = {name : 'Prey', size: 75, x: 400};
    var predator = {name:'Predator', size:50, x:200};

    var stocks = [predator, prey];

  var svg = d3.select('#container').append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);

   function doUpdate() {
     stocks[0].size += 1;
     stocks[1].size -= 1;
     update(svg, stocks);
   };
  
   setInterval(function() { doUpdate(); }, 100);
};

function update(svg, stocks){
     var circleGroups = svg.selectAll("circle")
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

    circleGroups.selectAll("circle")
            .attr('r', function(d) { return d.size;});
}