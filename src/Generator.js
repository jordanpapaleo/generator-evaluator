'use strict';

/**
 * Generator Module
 * @module Generator
 */
var Generator = {};

/**
 * Private function to create random numbers
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

/**
 * Public function used to create a string expression
 * @param {number} numCount - The amount of numbers in the expression
 */
Generator.createExpression = function(numCount) {
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

    return expressionComponent.join('');
};

module.exports = Generator;
