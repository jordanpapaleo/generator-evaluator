'use strict';

var chai       = require('chai');
var request    = require('supertest');
var api        = require('../src/api');
var expect     = chai.expect;

describe('api:v1', function() {
    var version = '/v1';

    describe('Generator', function() {
        describe('GET', function() {
            it('should generate an equation', function(done) {
                request(api)
                    .get(version + '/generator')
                    .end(function(err, res) {
                        if(err) {
                            return done(err);
                        }

                        expect(res.statusCode).to.equal(200);
                        expect(res.type).to.equal('application/json');
                        expect(res.body).to.have.property('expression');

                        done();
                    });
            });
        });
    });

    describe('Evaluator', function() {
        describe('POST', function() {
            it('should return the value of an equation', function(done) {
                request(api)
                    .post(version + '/evaluator')
                    .send("4*10")
                    .end(function (err, res) {
                        if(err) {
                            return done(err);
                        }

                        expect(res.statusCode).to.equal(200);
                        expect(res.text).to.equal('40');

                        done();
                    });
            });
        });
    });
});
