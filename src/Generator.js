'use strict';

const Generator = {};

Generator._getRandomNumber = function(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min) + min);
};

Generator._getRandomOperator = function() {
    const operators = ['+', '-', '*', '/'];
    let min = 0;
    let max = operators.length;
    let i = this._getRandomNumber(min, max);
    return operators[i];
};

Generator.createExpression = function(numOfNum) {
    let plop = [];

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

export default Generator;
