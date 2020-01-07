require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect')
;
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });


  let studio;
  let actor;
  beforeEach(() => {
    return mongoose.connection.dropDatabase();

  });

  beforeEach(async() => {
    actor = await Actor
      .create({
        films: [{
          id:'1234',
          title: 'Corgi Land',
          released: 1964 
        }],
        name:'Corgi Godzilla',
        dob: '1954-04-19',
        pob: 'Tokyo Japan'
      });

    studio = await Studio
      .create({
        name:'Studio Ghibli',
        address:'1 Chome-1-83 Shimorenjaku, Mitaka, Tokyo 181-0013, Japan',
        films: [{
          _id:'1234',
          title: 'Godzilla'
        }],
      });

    reviewer = await Reviewer 
      .create({
        name:'Hayao Miyazaki',
        company: 'Studio Ghibli'
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  //actor routes
  it('can get all actors names', () => {
    return request(app)
      .get('/actors')
      .then(res => {
        expect(res.body).toEqual[{
          _id: expect.any(String),
          name:'Corgi Godzilla',
          __v: 0
        }];
      });
  });

  it('can  get actors names by Id', () => {
    return request(app)
      .get(`/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id.toString(),
          name:'Corgi Godzilla',
          dob: '1954-04-19T00:00:00.000Z',
          pob: 'Tokyo Japan',
          __v: 0,
          films: [{
            id:'1234',
            title: 'Corgi Land',
            released: 1964 
          }]
        });
      });
  });

  //Studio routes
  it('can create a get studios names', () => {
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
  it('can create a get studios by id', () => {
    return request(app)
      .get(`/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual[{
          _id: expect.any(String),
          name:'Studio Ghibli',
          address:'1 Chome-1-83 Shimorenjaku, Mitaka, Tokyo 181-0013, Japan',
          films: [{
            _id:'1234',
            title: 'Godzilla'
          }],
          __v: 0
        }];
      });
  });

  //reviewer routes
  it('can create a get reviewers', () => {
    return request(app)
      .get('/reviewer')
      .then(res => {
        expect(res.body).toEqual[{
          _id: expect.any(String),
          name:'Hayao Miyazaki',
          company: 'Studio Ghibli',
          __v: 0
        }];
      });
  });


  it('can create a get reviewers by id', () => {
    return request(app)
      .get('/reviewer')
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





