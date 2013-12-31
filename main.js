var ModelRunner = function()
{
    var _currentTime;
    var _timeSpanMax = 500;
    var _view = new View("#container");
    var _model= createModel();
    var _data;
    
    this.start = function() {
        _data = runModel(_timeSpanMax, function () { return step(_model); });
        _currentTime = 0;
        _view.initialise(_currentTime, _timeSpanMax);
        _view.addTimeChangedListener(update);
    };
    
    var update = function(timeSpan) {
        _view.update(_data[timeSpan]);
    };
    
    var runModel = function(timeLength, calculator){
        var data = new Array();
        for (var j=0; j< timeLength; j++)
        {
            var model = calculator();
            var timeSlotData = {
                time: j,
                stocks : new Array()
            };
            for (var i = 0; i < model.stocks.length; i++)
            {
                var currentStock = model.stocks[i];
                timeSlotData.stocks.push(
                    {
                        name: currentStock.name,
                        value: currentStock.size,
                        x: currentStock.x
                    });
            }
            data.push(timeSlotData);
        }
        return data;
    };
    
    var step = function step(model) {
        for (var i = model.controls.length - 1; i >= 0; i--) {
            model.controls[i].execute();
        };
    
        for (var i = model.stocks.length - 1; i >= 0; i--) {
            adjustStock(model.stocks[i]);
        };
        return model;
    };
    
    var adjustStock = function(stock) {
        var reduction = stock.size * stock.outflow.rate;
        var increase = stock.size * stock.inflow.rate;
        var newSize = stock.size + increase - reduction;
        stock.size = Math.max(newSize, 0);
    };
};



//function onTimeChange()
//{
//    view.update(data[dataIndex]);
//}

//function iterate(interval, data, view, dataIndex) {
//        if (dataIndex >= data.length) return;
//        view.update(data[dataIndex]);
//        _timeView.update(dataIndex);
//        dataIndex++;
//        setTimeout(function () { iterate(interval, data, view, dataIndex); }, interval);
//    };







