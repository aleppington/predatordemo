var View = function(parentElementId, settings)
{
    var parent = d3.select(parentElementId);
    
    var getStockSetting = function(s)
    {
        return function(stockRef)
        {
            for (var i=0; i<s.stocks.length; i++)
            {
                var stockSettings = s.stocks[i];
                
                if (stockSettings.ref == stockRef)
                {
                  return stockSettings; 
                }
            }
            return null;
        };
    };
    
    var _dataView = new CircleDataView(parent, 'dataview', getStockSetting(settings));  
    var _timeLine = new TimeLine(parent, 'timeline');
    var _timeDisplay = new TimeDisplay(parent, 'timedisplay');
    
    _timeLine.initialise(settings.timeSpan);
    
    
    
    this.addTimeChangedListener = function(timeChangedListener)
    {
        _timeLine.addTimeChangedListener(timeChangedListener);
    };
    
    this.update = function(data)
    {
        _dataView.update(data);
    };

    _timeLine.addTimeChangedListener(_timeDisplay.timeChange);
};

var CircleDataView = function(parent,controlId, settings)
{
    var _getSettings = settings;
    
    var _view = parent.append('svg:svg')
        .attr('id', controlId)
        
    var _stocksView = _view.append('g');
    
    var getValue = function(value, maxValue, maxRange)
    {
        var scale = d3.scale.sqrt();
        scale.domain([0,maxValue]).range([0,maxRange]);
        var returnValue = scale(value);
        return returnValue;
    };
    
    var getImageX = function(d)
    {
       return (_getSettings(d.ref).x - (getValue(d.value, d.maxValue(), _getSettings(d.ref).iconwidth)/2));
    }
    
    
    this.update = function(data)
    {
        var stockDisplays = _stocksView.selectAll("g")
            .data(data.stocks);
            
        var stockSelection = stockDisplays.enter().append('svg:g');
        
        //stockSelection.append("image")
        //    .attr('xlink:href', function (d) { return _getSettings(d.ref).icon; })
        //    .attr('x', function (d) { return _getSettings(d.ref).x - _getSettings(d.ref).width/2; })
        //    .attr('y', function (d) { return _getSettings(d.ref).y + _getSettings(d.ref).width/2; })
        //    .attr('height', 40)
        //    .attr('width',  40);
            
        stockSelection.append("image")
            .attr('class', 'valueicon')
            .attr('xlink:href', function (d) { return _getSettings(d.ref).icon; })
       
        stockSelection.append("circle")
            .attr('class', 'range')
            .attr('cx', function (d) { return _getSettings(d.ref).x; })
            .attr('cy', function (d) { return _getSettings(d.ref).y; })                 
                   
        stockSelection.append("circle")
            .attr('class', 'value')
            .attr('cx', function (d) { return _getSettings(d.ref).x; })
            .attr('cy', function (d) { return _getSettings(d.ref).y; })
            .attr('fill', function (d) { return _getSettings(d.ref).fill; })
            .attr('stroke', function (d) { return _getSettings(d.ref).stroke; })
            
        stockSelection.append('text')
            .attr('x', function (d) { return _getSettings(d.ref).x - _getSettings(d.ref).width/2 + 50; })
            .attr('y', function (d) { return _getSettings(d.ref).y + _getSettings(d.ref).width/2 + 30; })
            .attr('fill', 'black');
            
        stockDisplays.select("circle.range")
            .attr('r', function (d) { return (_getSettings(d.ref).width/2); });
            
        stockDisplays.select("image.valueicon")
            .attr('width', function (d) { return (getValue(d.value, d.maxValue(), _getSettings(d.ref).iconwidth)); })
            .attr('height', function (d) { return (getValue(d.value, d.maxValue(), _getSettings(d.ref).iconwidth)); })
            .attr('x', function (d) { return  _getSettings(d.ref).x - (getValue(d.value, d.maxValue(), _getSettings(d.ref).iconwidth))/2;})
            .attr('y', function (d) { return  _getSettings(d.ref).y - (getValue(d.value, d.maxValue(), _getSettings(d.ref).iconwidth))/2;});
            
        stockDisplays.select("text")
            .text(function (d) { return d.name + ' (' + Math.round(d.value * 100) / 100 + ')'; });
            
        stockDisplays.select("circle.value")
            .attr('r', function(d) { return getValue(d.value, d.maxValue(), (_getSettings(d.ref).width)/2); });
    };
}

var BarChartDataView = function(parent,controlId, settings)
{
    var _getSettings = settings;
    
    var _view = parent.append('svg:svg')
        .attr('id', controlId);
        
    var _stocksView = _view.append("g");
    var _flowsView = _view.append("g");

    this.update = function(data)
    {
        var stockDisplays = _stocksView.selectAll("g")
            .data(data.stocks);
        
        var stockSelection = stockDisplays.enter().append('svg:g');
        stockSelection.append("rect")
            .attr('x', function (d) { return _getSettings(d.ref).x; })
            .attr('width', function (d) { return _getSettings(d.ref).width; });
        
        stockSelection.append('text')
            .attr('x', function (d) { return _getSettings(d.ref).x; })
            .attr('y', function (d) { return _getSettings(d.ref).y; })
            .attr('fill', 'black');
        
        stockDisplays.select("rect")
            .attr('height', function (d) { return d.value; })
            .attr('y', function (d) { return (_getSettings(d.ref).y - 20) - d.value; });
        
        stockDisplays.select("text")
            .text(function (d) { return d.name + ' (' + Math.round(d.value * 100) / 100 + ')'; });
        
        var flowDisplays = _flowsView.selectAll("g")
            .data(data.stocks);
        
        var flowSelection = flowDisplays.enter().append('svg:g');
        
        var totaltext = flowSelection.append('text')
            .attr('id', 'flowtotaldisplay')
            .attr('x', function (d) { return _getSettings(d.ref).x; })
            .attr('y', function (d) { return _getSettings(d.ref).y + 30; })
            .attr('fill', 'black');
            
        totaltext.append('tspan')
            .attr('id', 'flowtotal')
            .attr('x', function (d) { return _getSettings(d.ref).x; })
            .attr('dy', '1.2em');
            
        var flowtext = flowSelection.append('text')
            .attr('id', 'flowdisplay')
            .attr('x', function (d) { return _getSettings(d.ref).x;  })
            .attr('y', function (d) { return _getSettings(d.ref).y + 60; })
            .attr('fill', 'black');
        
        flowtext.append('tspan')
            .attr('id', 'inflow')
            .attr('x', function (d) { return _getSettings(d.ref).x;  })
            .attr('dy', '1.2em');
            
        flowtext.append('tspan')
            .attr('id', 'outflow')
            .attr('x', function (d) { return _getSettings(d.ref).x;  })
            .attr('dy', '1.2em');
        
        flowDisplays.select('#flowtotal')
            .text(function (d) { return Math.round(d.totalflow.value * 100) / 100; })
        
        flowDisplays.select('#inflow')
            .text(function (d) { return d.inflow.name + ' (' + Math.round(d.inflow.value * 100) / 100 + ')'; })
            
        flowDisplays.select('#outflow')
            .text(function (d) { return d.outflow.name + ' (' + Math.round(d.outflow.value * 100) / 100 + ')'; })
            


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
    
    this.initialise = function(max)
    {
        _max = max;
        
        var rangeMin = 0;
        var rangeMax = parseInt(_sliderInput.property('clientWidth'));
        
        var x = d3.scale.linear().domain([_min, _max]).range([rangeMin, rangeMax]);
        
        _sliderInput.attr('min', _min.toString())
            .attr('max', _max.toString())
            .attr('value', _min.toString());
            
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




