'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var Generator = require('../src/Generator');

describe('Generator', function() {
    it('should return a string equation when initialized', function() {
        var valueCount = 5;
        var stringLength = (valueCount * 2) - 1; //The string returned will have an operator after every number but the last one
        var equation = Generator.init(valueCount);
        should.exist(equation);
        equation.should.be.a('string');
        equation.should.have.length(stringLength);
    });

    describe('_getRandomNumber', function() {
        it('should create a random number between 2 values', function() {
            var min = 1;
            var max = 9;
            var randomNumber = Generator._getRandomNumber(min, max);
            expect(randomNumber).to.be.within(min, max);
        });
    });
});
