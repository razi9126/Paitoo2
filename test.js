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
      //     it('health', function(done) {
      //       request.get({ url: baseUrl + '/health' },
      //           function(error, res, body) {
      //               res.should.have.status(200);
      //               res.body.should.be.a('string');
      //               body.should.be.a('string');
      //               // console.log(body)
      //             done();
      //           });
      //     });

      //     const formData = {
      //       name: JSON.stringify( { first: 'Saeid', last: 'Alidadi' } )
      //     }
      //     it('it should post a new restaurant', (done) => {
      //       chai.request('http://localhost:8080')
      //               .post('/new')
      //               // .field('Content-Type', 'multipart/form-data')
      //               .field("name","Nostra")
      //               .field("address","kjt")
      //               .field("number","Ujhnt5")
      //               .field("city","hjst")
      //               .field("cusine","hjbbui ")
      //               // .field("followedBy",formData)
      //               .end((err, res) => {
      //                   res.should.have.status(200);
      //                   // res.body.should.be.a('object');
      //                   // res.body.length.should.be.eql(0);
      //                 done();
      //               });
      //     });

      //     it('it should retrieve all restaurants from database', (done) => {
      //       chai.request('http://localhost:8080')
      //               .get('/all')
      //               .end(function(err, res) {
      //                   expect(res).to.have.status(200);
      //                   res.body.should.be.a('array');
      //                   // console.log(res.body)
      //                   done();                               
      //               });

      // });
      //     it('it should edit already existing restaurant', (done) => {
      //       chai.request('http://localhost:8080')
      //               .post('/edit/restaurant')
      //               .field('_id', '5b45c9027f310224a0807c74')
      //               .field("name","Succesful edit")
      //               .field("address","1Succesful edit")
      //               .field("number","Succesful edit")
      //               .field("city","Succesful edit")
      //               .field("cusine","Succesful edit ")
      //               .end((err, res) => {
      //                   res.should.have.status(200);
      //                   res.body.should.be.a('object');                                 //Empty body ({})
      //                 done();
      //               });
      //     });
          
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
                    .get('/restaurant/5b45c0740fcc3821595f14aa')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        res.body.should.be.a('object');
                        res.body._id.should.be.a('string');
                        res.body.name.should.be.a('string');
                        res.body.city.should.be.a('string');
                        res.body.address.should.be.a('string');
                        // console.log(res.body)
                        done();                               
                    });

      });
          it('it should add a menu item to an already existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/newMenuItem/5b45c0740fcc3821595f14aa')
                    .field('id', '5b45c0740fcc3821595f14aa')
                    .field("name","Coke")
                    .field("category","bev")
                    .field("price","921")
                    .field("shouldClassify",true)
                    .field("cusine","Succesful edit ")
                    .end((err, res) => {
                        res.should.have.status(200);
                      done();
                    });
          });

          it('it should edit a menu item to an already existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/editItem/5b45c0740fcc3821595f14aa')
                    .field('id', '5b45c0740fcc3821595f14aa')
                    .field("originalName","Coke")
                    .field("newName","Edited Name")
                    .field("originalCategory","bev")
                    .field("newCategory","bev")
                    .end((err, res) => {
                        res.should.have.status(200);
                        // console.log(res)
                      done();
                    });
          });

          it('it should NOT edit a menu item to a non existing restaurant(400)', (done) => {
            chai.request('http://localhost:8080')
                    .post('/editItem/5c45b56117d9421fbd2f309a')
                    .field('id', '5c45b56117d9421fbd2f309a')        //This record does not exist
                    .field("originalName","Chai")
                    .field("newName","Edited Name")
                    .field("originalCategory","bev")
                    .field("newCategory","bev")
                    .end((err, res) => {
                        res.should.have.status(400);
                        // console.log(res.body)
                      done();
                    });
          });

          // it('it should delete a menu item of an existing restaurant', (done) => {
          //   chai.request('http://localhost:8080')
          //           .post('/deleteMenuItem')
          //           .field('id', '5b45c0740fcc3821595f14aa')       
          //           .field("name","Edited Name")
          //           .field("category","bev")
          //           .field("originalCategory","bev")
          //           .field("newCategory","bev")
          //           .end((err, res) => {
          //               res.should.have.status(200);
          //               // console.log(res.body)
          //             done();
          //           });
          // });

          // it('it should delete an existing restaurant', (done) => {                //Use an id from the DB
          //   chai.request('http://localhost:8080')
          //           .post('/deleteRestaurant')
          //           .field('id', '5b45b65417d9421fbd2f309c')       
          //           .end((err, res) => {
          //               res.should.have.status(200);
          //               console.log(res.body)
          //             done();
          //           });
          // });
          it('it should add a follower to an existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/followRestaurant')
                    .field('restaurant', '5b45bfdf0fcc3821595f14a8')       
                    .field("user","23421")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body._id.should.be.a('string');
                        res.body.name.should.be.a('string');
                        res.body.city.should.be.a('string');
                        res.body.address.should.be.a('string');
                      done();
                    });
          });

          it('it should remove a follower from an existing restaurant', (done) => {
            chai.request('http://localhost:8080')
                    .post('/unfollowRestaurant')
                    .field('restaurant', '5b45bfdf0fcc3821595f14a8')       
                    .field("user","23421")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body._id.should.be.a('string');
                        res.body.name.should.be.a('string');
                        res.body.city.should.be.a('string');
                        res.body.address.should.be.a('string');
                        res.body.followedBy.should.be.a('array');
                      done();
                    });
          });
          // it('it should NOT remove a follower to a non existing restaurant', (done) => {
          //   chai.request('http://localhost:8080')
          //           .post('/unfollowRestaurant')
          //           .field('restaurant', '5b45c49d651c3f242015cb96')       
          //           .field("user","234ds21")
          //           .end((err, res) => {
          //               res.should.have.status(200);
          //               console.log(res.body);

          //             done();
          //           });
          // });

          it('it should retrieve a restaurants from database', (done) => {
            chai.request('http://localhost:8080')
                    .get('/restaurantName')
                    .query({name:"Nostra"})
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        res.body.should.be.a('object');
                        res.body._id.should.be.a('string');
                        res.body.name.should.be.a('string');
                        res.body.city.should.be.a('string');
                        res.body.address.should.be.a('string');
                        done();                               
                    });

          });
          it('it should retrieve all categories', (done) => {
            chai.request('http://localhost:8080')
                    .get('/categories')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        res.body.should.be.a('array');
                        // console.log(res.body);
                        done();                               
                    });

          });
          it('it should retrieve a certain dish', (done) => {
            chai.request('http://localhost:8080')
                    .get('/dishSearch')
                    .query({dish:"Edited Name"})
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        res.body.should.be.a('array');
                        done();                               
                    });

          });

          it('it should retrieve a certain category', (done) => {
            chai.request('http://localhost:8080')
                    .get('/categorySearch')
                    .query({category:"bev"})
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        // console.log(res.body);
                        res.body.should.be.a('array');
                        done();                               
                    });

          });
          it('it should add straight to the db', (done) => {
            chai.request('http://localhost:8080')
                    .post('/migrate')
                    .field('asddsa', 'sdds')       
                    .field("user","vbf23421")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('string');
                      done();
                    });
          });










          
})
