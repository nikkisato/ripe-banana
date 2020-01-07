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

    // reviewer = await Reviewer 
    //   .create({
    //     name:'Hayao Miyazaki',
    //     company: 'Studio Ghibli'
    //   });

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
      .post('/actors')
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
      .get('/actors')
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
      .get(`/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id.toString(),
          name:'Corgi Godzilla',
          dob: '1954-04-19T00:00:00.000Z',
          pob: 'Tokyo Japan',
          // films: [{
          //   _id:
          //   title: 
          //   released
          // }]
          __v: 0,
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
            //changed this one
            _id: expect.any(String),
            title: 'Godzilla'
          }],
          __v: 0
        }];
      });
  });

  //reviewer routes
  it('can get reviewers', () => {
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
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title:'Godzilla',
          released:1964,
          studio: studio._id,
          cast: [{ 
            _id: expect.any(String),
            role: 'Godzilla',
            actor: expect.any(String) 
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
            _id: film._id.toString(),
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
          studio: studio._id,
          cast: [{ 
            _id: expect.any(String),
            role: 'Godzilla', 
            actor: actor._id 
          }],
        });
      });
  });

});



