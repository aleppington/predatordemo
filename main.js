function pp_start() {
  var svg = d3.select('#container').append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);
  svg.append('svg:circle')
     .attr('cx', 200)
     .attr('cy',200)
     .attr('r', 75);
};