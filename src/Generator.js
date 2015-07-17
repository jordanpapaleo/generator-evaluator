'use strict';

const Generator = {};

Generator._getRandomNumber = function(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min) + min);
};

Generator._getRandomOperator = function() {
    const operators = ['+', '-', '*', '/'];
    let min = 0, max = operators.length;
    let i = this._getRandomNumber(min, max);
    return operators[i];
};

Generator.createExpression = function(blar) {
    let plop = [];

    if(plop.length === 0) {
        plop.push(this._getRandomNumber());
        blar--;
    }

    while(blar) {
        plop.push(this._getRandomOperator());
        plop.push(this._getRandomNumber());
        blar--;
    }

    return plop.join('');
};

export default Generator;
