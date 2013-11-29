function createModel() {
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

    var preyOutflowControl = {
        execute: function() { prey.outflow.rate = predator.size * 0.0008; }
    }

    var predatorInflowControl = {
        execute: function() { predator.inflow.rate = prey.size * 0.001; }       
    }

    return {
        stocks: [predator, prey],
        controls: [preyOutflowControl, predatorInflowControl]
    };
}