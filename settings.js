function createSettings() {
    
    var _timeSpan = 500;
    
    var _prey =
    {
	ref: 'Prey',
        name: 'Prey',
        x: 200,
        y: 150,
        width: 250,
	icon: 'Rabbit.svg',
	iconwidth: 175,
	fill: '#00ff00',
	stroke: '#00ff00'
    };

    var _predator =
    {
	ref: 'Predator',
        name: 'Predator',
        x: 410,
        y: 300,
        width: 250,
	icon: 'Wolf.svg',
	iconwidth: 175,
	fill: '#ff0000',
	stroke: '#ff0000'
    };
    
    return {
        timeSpan: _timeSpan,
        stocks: [_predator, _prey]
    };
}