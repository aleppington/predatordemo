function start() {

    var timeSpan = 500;

    var view = new View("#container");
    var model = createModel();
    var data = runModel(timeSpan, function () { return step(model); });

    view.update(data);

};

function runModel(timeLength, calculator){

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
}


function step(model) {

    for (var i = model.controls.length - 1; i >= 0; i--) {
        model.controls[i].execute();
    };

    for (var i = model.stocks.length - 1; i >= 0; i--) {
        adjustStock(model.stocks[i]);
    };
    return model;
}

function adjustStock(stock) {
    var reduction = stock.size * stock.outflow.rate;
    var increase = stock.size * stock.inflow.rate;
    var newSize = stock.size + increase - reduction;
    stock.size = Math.max(newSize, 0);
}
