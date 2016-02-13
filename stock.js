var jsdom = require('jsdom');

// -q for quickbuy program
if (process.argv[2] == '-q') {
    var stock = process.argv[3];
    var inc = Number(process.argv[4]);
    
    jsdom.env('http://www.nasdaq.com/symbol/' + stock + '/real-time', function(err, window) {
	if (err) {
	    console.log(err);
	}
	else {
	    var priceDollarOld = window.document.getElementsByClassName('qwidget-dollar')[0].textContent;
	    var priceSplitOld = priceDollarOld.split('$');
	    var priceOld = Number(priceSplitOld[1]);
		
	    function calculateStock() {
		var priceDollarNew = window.document.getElementsByClassName('qwidget-dollar')[0].textContent;
		var priceSplitNew = priceDollarNew.split('$');
		var priceNew = Number(priceSplitNew[1]);
		    
		if (priceNew >= (priceOld + inc)) {
		    console.log('SELL AT: ' + priceNew);
		    clearInterval(interval);
		    //window.close();
		}
		else {
		    console.log(priceNew);
		    //window.close();
		}
	    }
	    
	    var interval = setInterval(calculateStock, 5000);
	}
    });
	
}

// -c for calculate program
if (process.argv[2] == '-c') {
    var buyPrice = process.argv[3];
    var sellPrice = process.argv[4];
    var shares = process.argv[5];
    var charge = process.argv[6];
    function getProfit(buy, sell, stockShares, deduct) {
	dSplit = deduct.split('%');
	if (dSplit[1] == '') {
	    var percent = parseInt(dSplit[0]);
	    var profit = ((sell - buy) * stockShares) * (-(percent * 0.01) + 1);
	    console.log(profit);
	}
	else {
	    profit = (((sell - buy) * stockShares) - deduct);
	    console.log(profit);
	}
    }
    getProfit(buyPrice, sellPrice, shares, charge);
}
