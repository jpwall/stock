# stock
A stock application that is written in javascript for intended use in node.js
# Installation
To install and use this program you must first have both node.js and npm installed
For Ubuntu (and Debian?):
'''
apt-get install node npm
'''

For Arch Linux:
'''
pacman -S node npm
'''

Then the dependencies for this program:
'''
sudo npm install -g jsdom
'''

And finally, getting the actual program downloaded:
'''
git clone https://github.com/jpwall/stock
cd stock
'''

# Usage
# 1) Calculating Profit
One use of this program is to calculate the profits from buying a certain stock and selling it. The usage and parameters are as follows:
'''
node stock.js -c [buy price] [sell price] [shares] [fee]
'''
The fee can either be in percent like 10% or as dollars 10

# 2) When to Sell
The other use of this program is to notify you when to sell a stock given a cercain increase in price.
The usage and parameters are as follows:
'''
node stock.js -q [stock symbol] [increment to sell at]
'''
The increment to sell at is in terms of dollars and tells the program when you want to be notified to sell the stock
