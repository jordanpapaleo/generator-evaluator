'use strict';

import Evaluator      from './Evaluator';
import Generator      from './Generator';

let i = 25;

while(i) {
    let exp = Generator.createExpression(Math.ceil(Math.random() * 50));
    console.log('---------');
    console.log(exp);

    let value = Evaluator.solve(exp); //Linear solve as in typing characters into a basic calculator
    console.log(exp + ' = ' + value);
    console.log('---------');
    i--;
}
