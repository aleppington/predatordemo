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
        _view.update(_data.timeSlotData[time]);
    };
    
    //var setMaxRanges(data, settings)
    //{
    //    
    //};
    
    var runModel = function(timeLength, calculator){
        
        var data =
        {
            summaryData :
            {
                maxValue: 0
            },
            timeSlotData : []
        };
 
        for (var j=0; j< timeLength; j++)
        {
            var model = calculator();
            
            var timeSlotItemData = {
                time: j,
                stocks : []
            };
            
            for (var i = 0; i < model.stocks.length; i++)
            {
                var currentStock = model.stocks[i];
                timeSlotItemData.stocks.push(
                    {
                        ref: currentStock.ref,
                        name: currentStock.name,
                        value: currentStock.size,
                        maxValue : function (){ return data.summaryData.maxValue;},
                        
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
                setMaxValue(data.summaryData,currentStock.ref,currentStock.size);
            }
            data.timeSlotData.push(timeSlotItemData);
        }
        return data;
        
    };
    
    var setMaxValue = function(summaryData, stockRef, value){
        //var stockSummaryData = summaryData[stockRef]
        //if (stockSummaryData == null)
        //{
        //    summaryData[stockRef] = value;
        //}
        //else
        //{
        //    summaryData[stockRef] = Math.max(stockSummaryData, value);
        //}
        summaryData.maxValue = Math.max(summaryData.maxValue, value);
    }
    

    
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








