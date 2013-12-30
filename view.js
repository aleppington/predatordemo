var View = function(parentElementId)
{
    var parent = d3.select(parentElementId);
    var _dataView = new DataView(parent, 'dataView', 600, 600);
    var _timeView = new TimeView(parent,'timeView', 600, 40, 25);

    this.update = function(modelData)
    {
        _timeView.initialise(0, modelData.length);
        iterate(100, modelData, 0);
    };

    var iterate = function(interval, data, dataIndex) {
        if (dataIndex >= data.length) return;
        _dataView.update(data[dataIndex]);
        //_timeView.update(dataIndex);
        dataIndex++;
        setTimeout(function () { iterate(interval, data, dataIndex); }, interval);
    };
};

var DataView = function(parent,controlId, width, height)
{
    var _view = parent.append('svg:svg')
        .attr('id', controlId)
        .attr('width', width)
        .attr('height', height);

    this.update = function(data)
    {
        var stockDisplays = _view.selectAll("g")
            .data(data.stocks);

        var g = stockDisplays.enter().append('svg:g');
        g.append("rect")
            .attr('x', function (d) { return d.x; })
            .attr('width', 100);

        g.append('text')
            .attr('x', function (d) { return d.x; })
            .attr('y', 580)
            .attr('fill', 'black');

        stockDisplays.select("rect")
            .attr('height', function (d) { return d.value; })
            .attr('y', function (d) { return 560 - d.value; });

        stockDisplays.select("text")
            .text(function (d) { return d.name + ' (' + Math.round(d.value * 100) / 100 + ')'; });

    };
};


var TimeView = function(parent,controlId, width, height, padding)
{
    var _width = width;
    var _height = height;
    var _padding = padding;
    
    var _view = parent.append('div')
        .attr('id', controlId)
        .attr('style', 'height:' + _height + 'px;' + 'width:' + (_width - (_padding * 2)) + 'px;' + 'padding:' + _padding + 'px;');
  
    var _timeLineContainer = _view.append('div')
        .attr('id', controlId + "_timelinecontainer")
        .attr('style', 'margin-left:20px;');
        
    var _timeLine = _timeLineContainer.append('svg:svg')
        .attr('id', controlId + "_timeline")
        .attr('height', 25)

    var _sliderContainer =  _view.append('div')
        .attr('id', controlId + "_slidercontainer")
        .attr('style', 'width:' + (_width - 120) + 'px;' + 'margin-left:20px;');
        
    var _sliderInput = _sliderContainer.append('input')
        .attr('id', controlId + "_sliderinput")
        .attr('type', 'range')
        .attr('style', 'width:' + (_width - 120)  + 'px;');
            
        
    this.initialise = function(min, max)
    {
        var rangeMin = 0;
        var rangeMax = (_width - 120);
        
        var x = d3.scale.linear().domain([min, max]).range([rangeMin, rangeMax]);
        
        _sliderInput.attr('min', min.toString())
            .attr('max', max.toString())
            
        var axis = d3.svg.axis()
            .scale(x);
            
        var axisElement = _timeLine.append('g')
            .attr('id', controlId + "_timelineaxis")
            .data(d3.range(rangeMin, rangeMax))
            .call(axis);
            
        axisElement.selectAll('text')
            .attr('style', 'text-anchor: start;');
    };
    
    
};


