'use strict';

/**
 * Generator Module
 * @module Generator
 */
var Generator = {};

/**
 * Public function used to create a random string expression
 */
Generator.init = function(numCount) {
    //A random number of components in the equation string
    numCount = (numCount) ? numCount : Math.ceil(Math.random() * 50);
    var expressionComponent = [];

    if(expressionComponent.length === 0) {
        expressionComponent.push(this._getRandomNumber());
        numCount--;
    }

    while(numCount) {
        expressionComponent.push(this._getRandomOperator());
        expressionComponent.push(this._getRandomNumber());
        numCount--;
    }

    var equationString = expressionComponent.join('');

    console.log('Generated equation: ', equationString);

    return equationString;
};

/**
 * Private helper function to create random numbers
 * @param {number} min
 * @param {number} max
 */
Generator._getRandomNumber = function(min, max) {
    min = (min) ? min : 1;
    max = (max) ? max : 9;

    return Math.floor(Math.random() * (max - min) + min);
};

/** Private function to select a random operator */
Generator._getRandomOperator = function() {
    var operators = ['+', '-', '*', '/'];
    var i = Math.floor(Math.random() * operators.length);
    return operators[i];
};

module.exports = Generator;
