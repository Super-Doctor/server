'use strict';

const role= require('../src/routes/roles-route')
const { server } = require('../src/server.js'); // => {server,start}
const superTest = require('supertest');
const request = superTest(server);
const { Role,RoleCoo } = require('../src/models/index')

let roleID;

describe('API Server', () => {
    // Testing Clothes
    it('Handle error routes', async () => {
      const response = await request.get(`/`);
      expect(response.status).toEqual(200);
    });
    it('Handle error method', async () => {
      const response = await request.post(`/test`);
      expect(response.status).toEqual(404);
    });

    it('should create a role on POST ', async () => {
        const response = await request.post('/addRole').send({
          role: 'patient'
        });
        expect(response.body.Role.role).toEqual('patient');
        roleID = response.body.id;
        expect(response.status).toEqual(200);
   
      });

    it('Handle getting roles', async () => {
      const response = await request.get(`/roles`);
      expect(response.status).toEqual(200);
    });
    
        it('should delete roles', async () => {
        const response = await request.delete(`/deleteroles/5`)
        expect(response.body).toEqual(response.body);
      });
    


})