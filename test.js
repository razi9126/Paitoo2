// var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://localhost:8080";
var util = require("util");
// var server = require('./server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.Should();
chai.use(chaiHttp);

// describe('HEALTH', function() {
//     it('h', function(done) {
//         request.get({ url: baseUrl + '/health' },
//             function(error, response, body) {
//             		// var bodyObj = JSON.parse(body);
//             		// expect(bodyObj.name).to.equal("Luke Skywalker");
//             		// expect(bodyObj.hair_color).to.equal("blond");
//                     expect(response.statusCode).to.equal(200);
//                     // console.log(body);
//                 done();
//             });
//     });
// });

    describe('functions', () => {
          it('health', function(done) {
            request.get({ url: baseUrl + '/health' },
                function(error, res, body) {
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    body.should.be.a('string');
                    // console.log(body)
                  done();
                });
          });
          it('it should post a new restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/new')
                    // .field('Content-Type', 'multipart/form-data')
                    .field("name","Nando's")
                    .field("address","13-Z, Commercial 3 D.H.A, Cantt")
                    .field("number","+92 42 35693005")
                    .field("city","Lahore")
                    .field("cusine","Chicken Chain ")
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.should.be.a('object');
                        // res.body.length.should.be.eql(0);
                      done();
                    });
          });

          it('it should retrieve all restaurants from database', (done) => {
            chai.request('http://localhost:8080')
                    .get('/all')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        res.body.should.be.a('array');
                        // console.log(res.body)
                        done();                               
                    });

      });
          it('it should edit already existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/edit/restaurant')
                    .field('_id', '5b447e27586ede25e8b314f6')
                    .field("name","Succesful edit")
                    .field("address","1Succesful edit")
                    .field("number","Succesful edit")
                    .field("city","Succesful edit")
                    .field("cusine","Succesful edit ")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');                                 //Empty body ({})
                      done();
                    });
          });
          
          // it('it should fail to edit a restaurant', (done) => {                             //should fail always
          //   chai.request('http://localhost:8080')
          //           .post('/edit/restaurant')
          //           .field('_id', '111111111111111111111111')
          //           .field("name","Succesful edit")
          //           .field("address","1Succesful edit")
          //           .field("number","Succesful edit")
          //           .field("city","Succesful edit")
          //           .field("cusine","Succesful edit ")
          //           .end((err, res) => {
          //               res.should.have.status(200);
          //               res.body.should.be.a('object');                                 //Empty body ({})
          //             done();
          //           });
          // });
          it('it should retrieve a restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .get('/restaurant/5b447e27586ede25e8b314f6')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        res.body.should.be.a('object');
                        res.body._id.should.be.a('string');
                        res.body.name.should.be.a('string');
                        res.body.city.should.be.a('string');
                        res.body.address.should.be.a('string');
                        console.log(res.body)
                        done();                               
                    });

      });
          it('it should add a menu item to an already existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/newMenuItem/5b447e27586ede25e8b314f6')
                    .field('id', '5b447e27586ede25e8b314f6')
                    .field("name","Chai")
                    .field("category","bev")
                    .field("price","9281")
                    .field("shouldClassify",true)
                    .field("cusine","Succesful edit ")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');                                 //Empty body ({})
                      done();
                    });
          });

          it('it should edit a menu item to an already existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/editItem/5b447e27586ede25e8b314f6')
                    .field('id', '5b447e27586ede25e8b314f6')
                    .field("originalName","Chai")
                    .field("newName","Edited Name")
                    .field("originalCategory","bev")
                    .field("newCategory","bev")
                    .end((err, res) => {
                        res.should.have.status(200);
                        // console.log(res)
                      done();
                    });
          });

          it('it should NOT edit a menu item to an non existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/editItem/5b448e27586ede25e8b314f6')
                    .field('id', '5b448e27586ede25e8b314f6')
                    .field("originalName","Chai")
                    .field("newName","Edited Name")
                    .field("originalCategory","bev")
                    .field("newCategory","bev")
                    .end((err, res) => {
                        res.should.have.status(400);
                        console.log(res.body)
                      done();
                    });
          });




          
})
