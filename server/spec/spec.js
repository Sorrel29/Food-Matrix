var expect = require('chai').expect;
var server = require('../index.js');
var path = require('path');
var supertest = require('supertest');

var request = supertest.agent(server);

describe('server', function() {
  describe('GET /', function () {
    it('should return the content of index.html', function (done) {
      // just assume that if it contains a <div> tag its index.html
      request
        .get('/')
        .expect(200, /<div/, done);
    });
  });
});
