function createSettings() {
    
    var _timeSpan = 500;
    
    var _prey =
    {
	ref: 'Prey',
        name: 'Prey',
        x: 400,
        y: 450,
        width: 150,
        max: 0
    };

    var _predator =
    {
	ref: 'Predator',
        name: 'Predator',
        x: 200,
        y: 450,
        width: 150,
        max: 0
    };
    
    return {
        timeSpan: _timeSpan,
        stocks: [_predator, _prey]
    };
}