require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect')
;
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });


  let actor;
  // let actors = [];
  let film;
  // let films = [];
  let studio;
  let review;
  let reviews = [];
  let reviewer;


  beforeEach(() => {
    return mongoose.connection.dropDatabase();

  });

  beforeEach(async() => {
    actor = await Actor
      .create({
        dob: '1954-04-19',
        pob: 'Tokyo Japan',
        name:'Corgi Godzilla',
      });

    studio = await Studio
      .create({
        name:'Studio Ghibli',
        address:'1 Chome-1-83 Shimorenjaku, Mitaka, Tokyo 181-0013, Japan',
        films: [{
          _id: '1234',
          title: 'Godzilla'
        }],
      });

    reviewer = await Reviewer 
      .create({
        name:'Hayao Miyazaki',
        company: 'Studio Ghibli'
      });


    film = await Film
      .create({
        title:'Godzilla',
        released:1964,
        studio: studio._id,
        cast: [{ 
          role: 'Godzilla', 
          actor: actor._id }]
      });

    review = await Review 
      .create({
        rating: 3,
        review: 'This was an interesting movie choice',
        film: film._id,
        reviewer: reviewer._id,
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });



  //reviews routes
  it('can create a new review', () => {
    return request(app)
      .post('/reviews')
      .send({
        rating: 3,
        reviewer: reviewer._id,
        review: 'This was an interesting movie choice',
        film: film._id,
      })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id:  expect.any(String),
          __v: 0,
          rating: 3,
          reviewer: expect.any(String),
          review: 'This was an interesting movie choice',
          film: expect.any(String)
        });
      });
  });

  it('can get all reviews', () => {
    return request(app)
      .get('/reviews')
      .then(res => {
        reviews.forEach(review => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            reviewer: reviewer._id,
            __v: 0,
          });
        });
      });
  });



  it('can get review by id', () => {
    return request(app)
      .get(`/reviews/${review.id}`)
      .then(res => {  
        expect(res.body).toEqual({
          rating: 3,
          review: 'This was an interesting movie choice',
          film: film._id.toString(),
          reviewer: expect.any(String),
          _id: expect.any(String),
          __v: 0,
        });
      });
  });

  

});



