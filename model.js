function createModel() {
	
    var prey =
    {
        name: 'Prey',
        size: 164,
        x: 400,
        inflow:
	{
		name: 'Births',
		rate: 0.16
	},
        outflow:
	{
		name: 'Deaths',
		rate: 1
	}

    };

    var predator =
    {
        name: 'Predator',
        size: 112,
        x: 200,
        inflow:
	{
		name: 'Births',
		rate: 1
	},
        outflow:
	{
		name: 'Deaths',
		rate: 0.12
	}
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