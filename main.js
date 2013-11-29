function pp_start() {

    var preySize = 75;
    var predatorSize = 75;
  var svg = d3.select('#container').append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);
    
    svg.append('svg:circle')
        .attr('cx', 200)
        .attr('cy',200)
        .attr('r', predatorSize);
     
    svg.append('svg:circle')
        .attr('cx', 400)
        .attr('cy',200)
        .attr('r', preySize);

    svg.append('text')
        .text('Predator')
        .attr('x', 175)
        .attr('y', 200)
        .attr('stroke','white');

    svg.append('text')
        .text('Prey')
        .attr('x', 385)
        .attr('y', 200)
        .attr('stroke','white');
};