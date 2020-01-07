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
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
//Studio routes
it('can create studios names', () => {
  return request(app)
    .post('/studios') 
    .send({
      name:'Studio Ghibli',
    })
    .then(res => {
      expect(res.body).toEqual[{
        _id: expect.any(String),
        name:'Studio Ghibli',
        __v: 0
      }];
    });
});

it('can get studios names', () => {
  return request(app)
    .get('/studios')
    .then(res => {
      expect(res.body).toEqual[{
        _id: expect.any(String),
        name:'Studio Ghibli',
        __v: 0
      }];
    });
});

//need one for studio id
it('can get studios by id', () => {
  return request(app)
    .get(`/studios/${studio._id}`)
    .then(res => {
      expect(res.body).toEqual[{
        _id: expect.any(String),
        name:'Studio Ghibli',
        address:'1 Chome-1-83 Shimorenjaku, Mitaka, Tokyo 181-0013, Japan',
        films: [{
          //changed this one
          _id: expect.any(String),
          title: 'Godzilla'
        }],
        __v: 0
      }];
    });
});
});
