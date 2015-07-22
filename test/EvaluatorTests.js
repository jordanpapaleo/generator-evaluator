'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var Evaluator = require('../src/Evaluator');

describe('Evaluator', function() {
    var stringEquation = '1+3-1*4/2';

    it('should evaluate a string equation', function() {
        var solution = Evaluator.solve(stringEquation);
        //console.log(solution);
        should.exist(solution);
        solution.should.be.a('number');
        expect(solution).to.equal(6);
    });

    describe('_parseEquationString', function() {
        it('should parse a string into an array', function() {
            var parsedValue = Evaluator._parseEquationString('1+2');
            parsedValue.should.be.a('array');
            expect(parsedValue).to.eql(['1', '+', '2']);
        });
    });

    describe('_equationController', function() {
        it('should execute math equations from array data', function() {
            var value = Evaluator._equationController(['1', '+', '2']);
            value.should.be.a('number');
            expect(value).to.equal(3);
        });
    });

    describe('_evaluate', function() {
        it('should evaluate an equation', function() {
            var solution = Evaluator._evaluate('1', '+', '2');
            solution.should.be.a('number');
            expect(solution).to.equal(3);
        });
    });
});
