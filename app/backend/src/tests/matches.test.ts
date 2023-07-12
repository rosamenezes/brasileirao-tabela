import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { match, InProgress } from './mocks/matchesMock';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoist de Matches', function () {
  let chaiHttpResponse: Response;

  
  it('Testa se retorna partidas em progresso', async function () {
      sinon.stub(Model, 'findAll').resolves(match);
      
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect([response.body[0]]).to.deep.equal([InProgress[0]]);
      expect(response.status).to.be.equal(200);
    });
    it('Testa se retorna all matches', async function () {
       chaiHttpResponse = await chai
         .request(app).get('/matches').send(match);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

  it('Testa se retorna partidas terminadas', async function () {
    sinon.stub(Model, 'findAll').resolves(match);

    const response = await chai.request(app).get('/matches?inProgress=false');
    expect([response.body[1]]).to.deep.equal([InProgress[1]]);
    expect(response.status).to.be.equal(200);
  });

  afterEach(sinon.restore);
});