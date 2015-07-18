'use strict';

/**
 * Evaluator Module
 * @module Evaluator
 */
var Evaluator = {};

/**
 *
 */
Evaluator.solve = function(equation) {
    var processedValues = this._processEquationString(equation);
    return this._solveEquation(processedValues);
};

/**
 *
 */
Evaluator._processEquationString = function(equation) {
    var processedValues = [];
    var components = equation.split('');
    var tempVal = '';

    for(var i = 0, j = components.length; i < j; i++) {
        var component = components[i];

        if(!isNaN(component)) {
            tempVal += component + '';
        } else {
            processedValues.push(tempVal);
            processedValues.push(component);
            tempVal = '';
        }

        //Push last value
        if(i === components.length - 1) {
            processedValues.push(tempVal);
        }
    }

    return processedValues;
};

/**
 *
 */
Evaluator._solveEquation = function(processedValues) {
    var value = null;

    for(var i = 0, j = processedValues.length; i < j; i++) {
        if(!value) {
            value = processedValues[i];
        } else {
            value = this._evaluate(value, processedValues[i], processedValues[i + 1]);
            i++; //skip an iteration since we just used it
        }
    }

    return value;
};

/**
 *
 */
Evaluator._evaluate = function(val1, op, val2) {
    var value = 0;
    val1 = parseFloat(val1);
    val2 = parseFloat(val2);

    if(isNaN(val1) || isNaN(val2)) {
        console.error('Error: Cannot divide cannot divide by 0');
        return 0;
    }

    switch(op) {
        case '+':
            value = val1 + val2;
            break;
        case '-':
            value = val1 - val2;
            break;
        case '*':
            value = val1 * val2;
            break;
        case '/':
            value = val1 / val2;
            break;
    }

    return value;
};

module.exports = Evaluator;
