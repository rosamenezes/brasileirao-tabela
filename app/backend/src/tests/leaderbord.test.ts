import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { awayMock, homeMock } from './mocks/leaderbordMock';
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpois de LeaderBord', function () {
  let chaiHttpResponse: Response;
  
  it('Testa all stats away', async function () {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away').send(awayMock);

   expect(chaiHttpResponse.status).to.be.equal(200);
 });
  it('Testa all stats home', async function () {
     chaiHttpResponse = await chai.request(app).get('/leaderboard/home').send(homeMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  afterEach(sinon.restore);
});