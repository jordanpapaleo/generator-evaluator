'use strict';

/**
 * Evaluator Module
 * @module Evaluator
 */
var Evaluator = {};

/**
 * Public function use as entry point to solve a string equation
 * @param {string} equation - this is a string of numbers and operators
 */
Evaluator.solve = function(equation) {
    if(!equation) {
        throw 'No equation to solve';
    }

    equation = this._decodeString(equation);
    var parsedValues = this._parseEquationString(equation);
    var solution = this._evaluateEquations(parsedValues);

    console.log('Evaluator received:', equation);
    console.log('Evaluator solution:', solution);


    return solution;
};

Evaluator._decodeString = function(string) {
    return string.replace(/%2B/g, '+');
};

/**
 * Private function to break an equation string into an array of component strings
 * @param {string} equation - this is a string of numbers and operators
 */
Evaluator._parseEquationString = function(equation) {
    var parsedValues = [];
    var components = equation.split('');
    var tempVal = '';

    for(var i = 0, j = components.length; i < j; i++) {
        var component = components[i];

        if(!isNaN(component)) {
            tempVal += component + '';
        } else {
            parsedValues.push(tempVal);
            parsedValues.push(component);
            tempVal = '';
        }

        //Push last value
        if(i === components.length - 1) {
            parsedValues.push(tempVal);
        }
    }

    return parsedValues;
};

/**
 * Private function to control the iterative solving of each equation
 * @param {array} parsedValues - this is the controller
 */
Evaluator._evaluateEquations = function(parsedValues) {
    var value = null;

    for(var i = 0, j = parsedValues.length; i < j; i++) {
        if(!value) {
            value = parsedValues[i];
        } else {
            value = this._evaluate(value, parsedValues[i], parsedValues[i + 1]);
            i++; //skip an iteration since we just used it
        }
    }

    return value;
};

/**
 * Private function to evaluate an equation
 * @param {string} val1 - first value in the equation
 * @param {string} op - operator for the equation
 * @param {string} val2 - second value in the equation
 */
Evaluator._evaluate = function(val1, op, val2) {
    var solution = 0;
    val1 = parseFloat(val1);
    val2 = parseFloat(val2);

    if(isNaN(val1) || isNaN(val2)) {
        console.error('Error: Cannot divide cannot divide by 0');
        return 0;
    }

    switch(op) {
        case '+':
            solution = val1 + val2;
            break;
        case '-':
            solution = val1 - val2;
            break;
        case '*':
            solution = val1 * val2;
            break;
        case '/':
            solution = val1 / val2;
            break;
    }

    return Math.round(solution * 100) / 100;
};

module.exports = Evaluator;
