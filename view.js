var View = function(parentElementId)
{
    var parent = d3.select(parentElementId);
    var _dataView = new DataView(parent, 'dataView', 600, 600);
    var _timeView = new TimeView(parent,'timeView', 600, 50);

    this.update = function(modelData)
    {
        _timeView.initialise(0, modelData.length, 0, 580, 0, 20);
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


var TimeView = function(parent,controlId, width, height)
{
    var _view = parent.append('div')
        .attr('id', controlId);
        
    var _timeLine = _view.append('svg:svg')
        .attr('id', controlId + "_timeline")
        .attr('width', width)
        .attr('height', height);
        
    var _slider =  _view.append('input')
            .attr('id', controlId + "_slider")
            .attr('type', 'range')
            
        
    this.initialise = function(min, max, rangeMin, rangeMax, xPos, yPos)
    {
        var x = d3.scale.linear().domain([min, max]).range([rangeMin, rangeMax]);
        
        _slider.attr('min', min.toString())
            .attr('max', max.toString())
            .attr('style', 'width:' +  + 'px');
            
        var axis = d3.svg.axis()
            .scale(x);
            
        var axisElement = _timeLine.append('g')
            .data(d3.range(rangeMin, rangeMax))
            .call(axis);
            
        return axisElement;
    };
    
    
};


