require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect')
;
const Actor = require('../lib/models/Actor');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  let actor;
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  //actor routes
  it('can create a get actors names', () => {
    return request(app)
      .get('/actors')
      .send({
        name:'Corgi Godzilla'
      })
      .then(res => {
        expect(res.body).toEqual[{
          _id: expect.any(String),
          name:'Corgi Godzilla',
          __v: 0
        }];
      });
  });

  it('can create a get actors names by Id', () => {
    return request(app)
      .get(`/actors/${actor._id}`)
      .send({
        name:'Corgi Godzilla',
        dob: 'April 19, 1954',
        pob: 'Tokyo Japan'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name:'Corgi Godzilla',
          dob: expect.any(String),
          pob: 'Tokyo Japan',
          __v: 0,
          //need to add films here
          // films: [{
          //   id,
          //   title,
          //   released
        });
      });
  });

  //Studio routes
  it('can create a get studios names', () => {
    return request(app)
      .get('/studios')
      .send({
        name:'Studio Ghibli'
      })
      .then(res => {
        expect(res.body).toEqual[{
          _id: expect.any(String),
          name:'Studio Ghibli',
          __v: 0
        }];
      });
  });

  //reviewer routes
  it('can create a get reviewers', () => {
    return request(app)
      .get('/reviewer')
      .send({
        name:'Hayao Miyazaki',
        company: 'Studio Ghibli'
      })
      .then(res => {
        expect(res.body).toEqual[{
          _id: expect.any(String),
          name:'Hayao Miyazaki',
          company: 'Studio Ghibli',
          __v: 0
        }];
      });
  });

});





