'use strict';

const Evaluator = {};

Evaluator.solve = function(equation) {
    let processedValues = this._processEquation(equation);
    return this._solveEquation(processedValues);
};

Evaluator._processEquation = function(equation) {
    let processedValues = [];
    let components = equation.split('');
    let tempVal = '';

    for(let i = 0, j = components.length; i < j; i++) {
        let component = components[i];

        if(!isNaN(component)) {
            tempVal += `${component}`;
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

Evaluator._solveEquation = function(processedValues) {
    let value = null;

    for(let i = 0, j = processedValues.length; i < j; i++) {
        if(!value) {
            value = processedValues[i];
        } else {
            value = this._solve(value, processedValues[i], processedValues[i + 1]);
            i++; //skip an iteration since we just used it
        }
    }

    return value;
};

Evaluator._solve = function(val1, op, val2) {
    let value = 0;
    val1 = parseFloat(val1);
    val2 = parseFloat(val2);

    if(isNaN(val1) || isNaN(val2)) {
        console.error('Error: Cannot divide 0 by anything; returning 0');
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

export default Evaluator;
