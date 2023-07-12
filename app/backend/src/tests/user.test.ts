import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { invalidEmail, invalidPassword, userRegistered, userNoPass, validLogin } from './mocks/userMock';
import UserModel from '../database/models/UserModel';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;
    describe('Testa endpoints de Login', () => {
     it('Testa return token', async () => {
       const userMock = UserModel.build(userRegistered)
       sinon.stub(UserModel, 'findOne').resolves(userMock)
       const res = await chai.request(app)
         .post('/login')
         .send(validLogin)

         expect(res.body.token).not.to.be.undefined
       expect(res.status).to.be.equal(200)
    });
    it('Testa return all sem email', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send({ password: '123456' })
  
        expect(res.body.message).to.be.equal('All fields must be filled')
      expect(res.status).to.be.equal(400)
    })
     it('Testa return all sem password', async () => {
       const res = await chai.request(app)
         .post('/login')
         .send(userNoPass)
   
         expect(res.body.message).to.be.equal('All fields must be filled')
       expect(res.status).to.be.equal(400)
     })
     it('Testa com password invalido', async () => {
       const res = await chai.request(app)
         .post('/login')
         .send(invalidPassword)
   
         expect(res.body.message).to.be.equal('Invalid email or password')
       expect(res.status).to.be.equal(401)
     });
   });
   
     it('Testa com email invalido', async () => {
   
       const res = await chai.request(app)
         .post('/login')
         .send(invalidEmail)
   
         expect(res.body.message).to.be.equal('Invalid email or password')
       expect(res.status).to.be.equal(401)
     });
   