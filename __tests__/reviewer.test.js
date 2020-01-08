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

  //reviewer routes
  it('can create reviewers', () => {
    return request(app)
      .post('/reviewer')
      .send({
        name:'Hayao Miyazaki',
        company:'Studio Ghibli',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name:'Hayao Miyazaki',
          company: 'Studio Ghibli',
          __v: 0
        });
      });
  });

  it('can get reviewers', () => {
    return request(app)
      .get('/reviewer')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name:'Hayao Miyazaki',
          company: 'Studio Ghibli',
          __v: 0
        }]);
      });
  });


  it('can get reviewers by id', () => {
    return request(app)
      .get('/reviewer')
      .then(res => {
        expect(res.body).toEqual[{
          _id: expect.any(String),
          name:'Hayao Miyazaki',
          company: 'Studio Ghibli',
          //need to add reviews
          __v: 0
        }];
      });
  });
//need to add update and delete routes


});
