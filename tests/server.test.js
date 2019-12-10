const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Get Requests', () => {

  test('it should respond to the / endpoint', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    done();
  });

  test('it should respond the /autosearch endpoint with a query for a non-existsant item', async (done) => {
    var query = 'itemnonexistant'
    const response = await request.get(`/autosearch?data=${query}`)
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(0)
    done();
  });

  test('it should respond the /autosearch endpoint with a query for an existing item', async (done) => {
    var query = 'test'
    const response = await request.get(`/autosearch?data=${query}`)
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(1)
    done();
  });

  test('it should respond the /autosearch endpoint with a maximum of 8 results', async (done) => {
    var query = 't'
    const response = await request.get(`/autosearch?data=${query}`)
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(8)
    done();
  });
})