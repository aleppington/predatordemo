function pp_start() {
  var svg = d3.select('#container').append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);
    
    svg.append('svg:circle')
        .attr('cx', 200)
        .attr('cy',200)
        .attr('r', 75);
     
    svg.append('svg:circle')
        .attr('cx', 400)
        .attr('cy',200)
        .attr('r', 75);

    svg.append('text')
        .text('This is some information about whatever')
        .attr('x', 50)
        .attr('y', 150)
        .attr('stroke','white');
};