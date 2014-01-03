var View = function(parentElementId)
{
    var parent = d3.select(parentElementId);
    var _dataView = new DataView(parent, 'dataview');  
    var _timeLine = new TimeLine(parent, 'timeline');
    var _timeDisplay = new TimeDisplay(parent, 'timedisplay');
    
    this.addTimeChangedListener = function(timeChangedListener)
    {
        _timeLine.addTimeChangedListener(timeChangedListener);
    };
    
    this.initialise = function(min, max)
    {
        _timeLine.initialise(min, max);
    };
    
    this.update = function(data)
    {
        _dataView.update(data);
    };
    

    _timeLine.addTimeChangedListener(_timeDisplay.timeChange);
};

var DataView = function(parent,controlId, width, height)
{
    var _view = parent.append('svg:svg')
        .attr('id', controlId)
        .attr('width', width)
        .attr('height', height);
        
    var _stocksView = _view.append("g");
    var _flowsView = _view.append("g");

    this.update = function(data)
    {
        var stockDisplays = _stocksView.selectAll("g")
            .data(data.stocks);
        
        var stockSelection = stockDisplays.enter().append('svg:g');
        stockSelection.append("rect")
            .attr('x', function (d) { return d.x; })
            .attr('width', 100);
        
        stockSelection.append('text')
            .attr('x', function (d) { return d.x; })
            .attr('y', 450)
            .attr('fill', 'black');
        
        stockDisplays.select("rect")
            .attr('height', function (d) { return d.value; })
            .attr('y', function (d) { return 430 - d.value; });
        
        stockDisplays.select("text")
            .text(function (d) { return d.name + ' (' + Math.round(d.value * 100) / 100 + ')'; });
        
        var flowDisplays = _flowsView.selectAll("g")
            .data(data.stocks);
        
        var flowSelection = flowDisplays.enter().append('svg:g');
        
        var totaltext = flowSelection.append('text')
            .attr('id', 'flowtotaldisplay')
            .attr('x', function (d) { return d.x; })
            .attr('y', 480)
            .attr('fill', 'black');
            
        totaltext.append('tspan')
            .attr('id', 'flowtotal')
            .attr('x', function (d) { return d.x; })
            .attr('dy', '1.2em');
            
        var flowtext = flowSelection.append('text')
            .attr('id', 'flowdisplay')
            .attr('x', function (d) { return d.x; })
            .attr('y', 510)
            .attr('fill', 'black');
        
        flowtext.append('tspan')
            .attr('id', 'inflow')
            .attr('x', function (d) { return d.x; })
            .attr('dy', '1.2em');
            
        flowtext.append('tspan')
            .attr('id', 'outflow')
            .attr('x', function (d) { return d.x; })
            .attr('dy', '1.2em');
        
        flowDisplays.select('#flowtotal')
            .text(function (d) { return Math.round(d.totalflow.flow * 100) / 100; })
        
        flowDisplays.select('#inflow')
            .text(function (d) { return d.inflow.name + ' (' + Math.round(d.inflow.flow * 100) / 100 + ')'; })
            
        flowDisplays.select('#outflow')
            .text(function (d) { return d.outflow.name + ' (' + Math.round(d.outflow.flow * 100) / 100 + ')'; })
            


    };
};

var TimeDisplay = function(parent,controlId)
{
    var _view = parent.append('div')
        .attr('id', controlId)
    
    this.timeChange = function(time)
    {
        _view.text(time.toString());
    }
}


var TimeLine = function(parent,controlId)
{
    var _min = 0;
    var _max = 0;
    
    var _timeChangedListeners = new Array();
    
    var _view = parent.append('div')
        .attr('id', controlId);
  
    var _timeLineContainer = _view.append('div')
        .attr('id', controlId + "_timelinecontainer");
        
    var _timeLine = _timeLineContainer.append('svg:svg')
        .attr('id', controlId + "_timeline");

    var _sliderContainer =  _view.append('div')
        .attr('id', controlId + "_slidercontainer");
     
    var _sliderInput = _sliderContainer.append('input')
        .attr('id', controlId + "_sliderinput")
        .attr('type', 'range');
         
    var raiseChangedEvents = function() {
        for (var i=0;i < _timeChangedListeners.length; i++)
        {
            _timeChangedListeners[i](getCurrentValue());
        }
    };
    
    _sliderInput.on('mouseup', raiseChangedEvents);
    _sliderInput.on('keyup', raiseChangedEvents);
      
    this.addTimeChangedListener = function(timeChangedListener)
    {
        _timeChangedListeners.push(timeChangedListener);
    };
    
    this.initialise = function(min, max)
    {
        _min = min;
        _max = max;
        
        var rangeMin = 0;
        var rangeMax = parseInt(_sliderInput.property('clientWidth'));
        
        var x = d3.scale.linear().domain([min, max]).range([rangeMin, rangeMax]);
        
        _sliderInput.attr('min', min.toString())
            .attr('max', max.toString())
            .attr('value', min.toString());
            
        var axis = d3.svg.axis()
            .scale(x);
            
        var axisElement = _timeLine.append('g')
            .attr('id', controlId + "_timelineaxis")
            .data(d3.range(rangeMin, rangeMax))
            .call(axis);
            
        axisElement.selectAll('text')
            .attr('style', 'text-anchor: start;');
            
        axisElement.selectAll('path')
        .attr({fill:'none',
              stroke:'black',
              'stroke-width': 0.5});
            
        axisElement.selectAll('line')
            .attr({fill:'none',
                  stroke:'black',
                  'stroke-width': 0.3});
    };
    
    var changeSliderInput = function(amount)
    {
        var currentValue = getCurrentValue();
        var nextValue = currentValue + amount;
        if ((nextValue) >= _max) {
            setCurrentValue(_max);
        }
        else
        {
            setCurrentValue(nextValue);
        }
        raiseChangedEvents();
    };
    
    var getCurrentValue = function()
    {
        return parseInt(_sliderInput.property('value'));
    };
    
    var setCurrentValue = function(sliderInputValue)
    {
        _sliderInput.property('value',sliderInputValue.toString());
    };
    
};




