/* global describe it before */
const { expect } = require('chai');
const request = require('supertest');
const faker = require('faker');
const { init } = require('./server');
const knex = require('../db');

const uuidv4Regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

// checklist:
// - [x] check that the validator works
// - [x] check that an insert works
// - [] check that we do not save duplicates
describe('helm repo', () => {
  let app;

  before(async () => {
    app = await init();
  });

  describe('POST / helm-repo', () => {
    it('returns 201 and helm-repo is created', async () => {
      const name = faker.random.word();
      const url = faker.internet.url();
      await request(app)
        .post('/')
        .send({ name, url })
        .set('Content-Type', 'application/json')
        .expect(201)
        .then((response) => {
          expect(response.body.name).to.equal(name);
          expect(response.body.url).to.equal(url);
          expect(response.body.id).to.match(uuidv4Regex);
        });
      const databaseObj = await knex('helm_repos').select('name').where({ name, url }).first();
      expect(databaseObj.name).to.equal(name);
    });
    it('returns 409 if a Helm - Repo is already existing in our Data Store', async () => {
      const sample = await knex('helm_repos').select().first();
      await request(app)
        .post('/')
        .send({ name: sample.name, url: sample.url })
        .set('Content-Type', 'application/json')
        .expect(409)
        .then((response) => {
          expect(response.body.errorMessage).to.eql('Duplicate entry for name');
          expect(response.body.errorCode).to.eql('UniqueConstraintValidationError');
        });
    });
    it('returns 400 if request body is not correctly provided', async () => {
      await request(app)
        .post('/')
        .send({ name: 'john' })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.errorCode).to.eql('ValidationError');
          expect(response.body.errorMessage).to.equal('url is a required field');
        });
      await request(app)
        .post('/')
        .send({ url: 'john' })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.errorCode).to.eql('ValidationError');
          expect(response.body.errorMessage).to.equal('name is a required field');
        });
      await request(app)
        .post('/')
        .send({ name: 'test', url: 'john' })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.errorCode).to.eql('ValidationError');
          expect(response.body.errorMessage).to.equal('url must be a valid URL');
        });
    });
  });
  // describe('GET helm-repo', () => {
  //   it('can get an repo that already exists from the database', async () => {
  //     const { name: repoName } = await knex('helm_repos').select().first();
  //     request(app)
  //       .get(`/${repoName}`)
  //       .expect(213)
  //       .then((response) => {
  //         expect(response.body.name).to.equal(repoName);
  //       });
  //   });
  // });
  describe('GET / helm-repo', () => {
    it('returns 200', async () => {
      const { name: repoName } = await knex('helm_repos').select().first();
      await request(app)
        .get(`/${repoName}`)
        .expect(200)
        .then((response) => {
          expect(response.body.name).to.equal(repoName);
          expect(response.body.id).to.match(uuidv4Regex);
        });
    });
    it('returns 404 if note found', async () => {
      await request(app)
        .get('/UNKNOWREPO1234')
        .expect(404)
        .then((response) => {
          expect(response.body.errorCode).to.equal('HelmRepoNotFound');
          expect(response.body.errorMessage).to.equal('Helm reposistory UNKNOWREPO1234 not found');
        });
    });
  });
});
