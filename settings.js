function createSettings() {
    
    var _timeSpan = 500;
    
    var _prey =
    {
	ref: 'Prey',
        name: 'Prey',
        x: 200,
        y: 175,
        width: 250
    };

    var _predator =
    {
	ref: 'Predator',
        name: 'Predator',
        x: 450,
        y: 325,
        width: 250
    };
    
    return {
        timeSpan: _timeSpan,
        stocks: [_predator, _prey]
    };
}