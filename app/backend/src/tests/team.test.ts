import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { teams as teamsMock } from './mocks/teamMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoints de Teams', () => {
  it('Testa getAllTeams', async () => {
    sinon.stub(TeamModel, "findAll").resolves(teamsMock as any);
    const { body, status } = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock);
  });

  it('Testa se retorna um time com id correto', async () => {
    const team = teamsMock[0];
    sinon.stub(TeamModel, "findByPk").resolves(team as any);
    const { body, status } = await chai.request(app).get(`/teams/${team.id}`);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team);
  });

  it('Testa se vem erro passando id inexistente', async () => {
    const { body, status } = await chai.request(app).get(`/teams/123456`);
    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'Team not found' });
  });
  afterEach(sinon.restore);
});
