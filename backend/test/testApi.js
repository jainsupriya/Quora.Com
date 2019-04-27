var assert = require('chai').assert;
var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);

describe('Should return list of 4 users with status 200', function(){
    it('users',function(){
        agent.get('/users')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.mongo.length).to.equal(4);
        })
    });
})

describe('Should return user having id 5cbe44cb5445656fa98b6f7e and status 200', function(){
    it('users',function(){
        agent.get('/user/5cbe44cb5445656fa98b6f7e')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body[0]._id).to.equal("5cbe44cb5445656fa98b6f7e");
        })
    });
})

describe('Should return answer having id 5cc0a4b59902a84b3c8dfa72 and status 200 with updated ans', function(){
    it('users',function(){
        agent.put('/answer/5cc0a4b59902a84b3c8dfa72')
            .send({
                answer : "changing Answer again"
            })
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal("5cc0a4b59902a84b3c8dfa72");
            expect(res.body.answer).to.equal("changing Answer again");
        })
    });
})

describe('Should return answer having id 5cc0a4b59902a84b3c8dfa72 and status 200 with views = 8', function(){
    it('users',function(){
        agent.put('/answer/view/5cc0a4b59902a84b3c8dfa72')
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal("5cc0a4b59902a84b3c8dfa72");
            expect(res.body.views).to.equal(8);
        })
    });
})

describe('Should login with user id 3', function(){
    it('users',function(){
        agent.post('/login').send({
            "email": "abc03@abc.com",
            "password": "asdfghjkl"
        })
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.sqlData.id).to.equal(3);
        })
    });
})

describe('Should update mobile', function(){
    it('users',function(){
        agent.put('/user/5cbe44ad5445656fa98b6f7d').send({
            "mobile": "1212343456"
        })
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal("5cbe44ad5445656fa98b6f7d");
            expect(res.body.mobile).to.equal("1212343456");
        })
    });
})

describe('Should return 2 questions with topic2', function(){
    it('users',function(){
        agent.get('/questions/searchByTopic/topic2')
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(2);
        })
    });
})

describe('Should return 1 questions with question contains questions 2', function(){
    it('users',function(){
        agent.get('/questions/searchByQuestion/questions 2')
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(1);
        })
    });
})

describe('Should return 1 message between 2 users', function(){
    it('users',function(){
        agent.get('/messages/5cbe44cb5445656fa98b6f7e/5cbe44d25445656fa98b6f7f')
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(1);
        })
    });
})

describe('Should return user activity with 3 items', function(){
    it('users',function(){
        agent.get('/content/byUserId/5cbe44cb5445656fa98b6f7e/year/2019')
            .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(3);
        })
    });
})
