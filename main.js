function pp_start() {

    var prey = {name : 'Prey', size: 75};
    var predator = {name:'Predator', size:50};

  var svg = d3.select('#container').append('svg:svg')
    .attr('width', 600)
    .attr('height', 600);
    
    svg.append('svg:circle')
        .attr('cx', 200)
        .attr('cy',200)
        .attr('r', predator.size);
     
    svg.append('svg:circle')
        .attr('cx', 400)
        .attr('cy',200)
        .attr('r', prey.size);

    svg.append('text')
        .text(predator.name)
        .attr('x', 175)
        .attr('y', 200)
        .attr('stroke','white');

    svg.append('text')
        .text(prey.name)
        .attr('x', 385)
        .attr('y', 200)
        .attr('stroke','white');
};