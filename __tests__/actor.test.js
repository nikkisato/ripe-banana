require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect')
;
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
// const Review = require('../lib/models/Review');

const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });


  let actor;
  let actors = [];
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

  //actor routes
  it('can create a new actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        dob: '1954-04-19',
        pob: 'Tokyo Japan',
        name:'Corgi Godzilla',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          dob: '1954-04-19T00:00:00.000Z',
          pob: 'Tokyo Japan',
          name:'Corgi Godzilla',
          __v: 0
        });

      });
  });

  it('can get all actors names', () => {
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContain({
            _id: actor._id.toString(),
            name:'Corgi Godzilla',
            __v: 0
          });
        });
      });
  });

  it('can  get actors names by Id', () => {
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: actor._id.toString(),
          name: actor.name,
          dob: '1954-04-19T00:00:00.000Z',
          pob: 'Tokyo Japan',
          films: [{ 
            _id: expect.any(String), 
            title: expect.any(String), 
            released: expect.any(Number) }],
          __v: 0,
        });
      });
  });
});
