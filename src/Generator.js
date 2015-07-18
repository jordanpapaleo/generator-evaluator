'use strict';

var Generator = {};

Generator._getRandomNumber = function(min, max) {
    if(!min) {
        min = 1;
    }

    if(!max) {
        max = 9
    }

    return Math.floor(Math.random() * (max - min) + min);
};

Generator._getRandomOperator = function() {
    var operators = ['+', '-', '*', '/'];
    var min = 0;
    var max = operators.length;
    var i = this._getRandomNumber(min, max);
    return operators[i];
};

Generator.createExpression = function(numOfNum) {
    var plop = [];

    if(plop.length === 0) {
        plop.push(this._getRandomNumber());
        numOfNum--;
    }

    while(numOfNum) {
        plop.push(this._getRandomOperator());
        plop.push(this._getRandomNumber());
        numOfNum--;
    }

    return plop.join('');
};

module.exports = Generator;
