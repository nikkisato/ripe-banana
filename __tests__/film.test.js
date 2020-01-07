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
  let actors = [];
  let film;
  let films = [];
  let studio;

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

    film = await Film
      .create({
        title:'Godzilla',
        released:1964,
        studio: studio._id,
        cast: [{ 
          role: 'Godzilla', 
          actor: actor._id }]
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  //Film routes
  it('can create a new film', () => {
    return request(app)
      .post('/films')
      .send({
        title: 'Godzilla', 
        released: 1964,
        studio: studio._id,
        cast: [{ 
          role: 'Godzilla', 
          actor: actor._id 
        }]
      })
      .then(res => {
        console.log(res.body);
        
        expect(res.body).toEqual({
          _id:  expect.any(String),
          __v: 0,
          title:'Godzilla',
          released:1964,
          studio: studio._id.toString(),
          cast: [{ 
            _id: expect.any(String),
            role: 'Godzilla',
            actor: actor._id.toString() 
          }]
        });
      });
  });

  it('can get all Films', () => {
    return request(app)
      .get('/films')
      .then(res => {
        films.forEach(film => {
          expect(res.body).toEqual({
          // _id: film._id.toString(),
            _id: expect.any(String),
            __v: 0,
            title:'Godzilla',
            released: 1964,
            studio: studio._id,
          });
        });
      });
  });



  it('can get film by id', () => {
    return request(app)
      .get(`/films/${film._id}`)
      .then(res => {  
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Godzilla',
          released: 1964,
          __v: 0,
          studio: studio._id.toString(),
          cast: [{ 
            _id: expect.any(String),
            role: 'Godzilla', 
            actor: actor._id.toString() 
          }],
        });
      });
  });
});
