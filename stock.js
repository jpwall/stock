var jsdom = require('jsdom');

// -q for quickbuy program
if (process.argv[2] == '-q') {
    var stock = process.argv[3];
    var inc = process.argv[4];
    jsdom.env('http://www.nasdaq.com/symbol/' + stock + '/real-time', function(err, window) {
	function getStockPrice() {
	    var priceDollar = window.document.getElementsByClassName('qwidget-dollar')[0].textContent;
	    var price = priceDollar.split('$');
	    console.log(price[1]);
	    return price[1];
	}
	
	var oldPrice = getStockPrice();
	function calcSell() {
	    var updPrice = getStockPrice();
	    if (updPrice >= (oldPrice + inc)) {
		console.log('SELL AT: ' + updPrice);
		clearInterval(interval);
	    }
	}
	var interval = setInterval(calcSell, 5000);
    });
}

// -c for calculate program
if (process.argv[2] == '-c') {
    var buyPrice = process.argv[3];
    var sellPrice = process.argv[4];
    var shares = process.argv[5];
    var charge = process.argv[6];
    function getProfit(buy, sell, stockShares, deduct) {
	dsplit = deduct.split('%');
	if (dsplit[1] == '') {
	    var percent = parseInt(dsplit[0]);
	    var profit = ((sell - buy) * stockShares) * (-(percent * 0.01) + 1);
	    console.log(profit);
	}
	else {
	    var profit = (((sell - buy) * stockShares) - deduct);
	    console.log(profit);
	}
    }
    getProfit(buyPrice, sellPrice, shares, charge);
}
