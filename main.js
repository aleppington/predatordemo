var Presenter = function(view, model, settings)
{
    var _view = view;
    var _model = model;
    var _settings = settings;
    var _data;
    
    this.start = function() {
        _data = runModel(_settings.timeSpan, function () { return step(_model); });
        _view.addTimeChangedListener(update);
    };
    
    var update = function(time) {
        _view.update(_data[time]);
    };
    
    //var setMaxRanges(data, settings)
    //{
    //    
    //};
    
    var runModel = function(timeLength, calculator){
        var data = [];
        for (var j=0; j< timeLength; j++)
        {
            var model = calculator();
            var timeSlotData = {
                time: j,
                stocks : []
            };
            for (var i = 0; i < model.stocks.length; i++)
            {
                var currentStock = model.stocks[i];
                timeSlotData.stocks.push(
                    {
                        ref: currentStock.ref,
                        name: currentStock.name,
                        value: currentStock.size,
                        inflow:
                        {
                            name: currentStock.inflow.name,
                            value: calculateFlow(currentStock, currentStock.inflow)
                        },
                        outflow: 
                        {
                            name: currentStock.outflow.name,
                            value: calculateFlow(currentStock, currentStock.outflow)
                        },
                        totalflow:
                        {
                            name: "Total Flow",
                            value: calculateTotalFlow(currentStock)
                        }
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
    
    
    var adjustStock = function(stock)
    {
        var newSize = stock.size + calculateTotalFlow(stock);  
        stock.size = Math.max(newSize, 0);
    };
    
    var calculateTotalFlow = function(stock) {
        var reduction = calculateFlow(stock, stock.outflow);
        var increase = calculateFlow(stock, stock.inflow);
        return increase - reduction;
            
    };
    
    var calculateFlow = function(stock, flow)
    {
        return stock.size * flow.rate;
    };
};








