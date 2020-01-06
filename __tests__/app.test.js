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

  it('can create a get actors names by ID', () => {
    return request(app)
      .get(`/actors/${actor.id}`)
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

  //Studio routes









});
