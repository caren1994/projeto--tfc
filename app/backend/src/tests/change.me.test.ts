import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import {Model} from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('testes de integração teams', () => {
  afterEach(function(){
    sinon.restore();
  })
  const oneTeam:Team={

    id:7,
    teamName:'Flamengo'
  }as Team;


const teams=[
  {
    id:7,
    teamName:'Flamengo'
    
  }as Team,
  {id:8,
  teamName:'Grêmio'}as Team
]

  it('testando metodo get da rota /teams', async () => {
    //Arrange
    // sinon.stub(Model,'findAll').resolves(teams);
    //Action
    const response= await chai.request(app).get('/teams');
    //Assertions
    expect(response.status).to.be.deep.equal(200);
    // expect(response.body).to.be.deep.equal(teams);
  });
  it('Testando o metodo get da rota /teams:id', async () => {
    // //Arrange
    // sinon.stub(Model,'findOne').resolves(oneTeam);
    //Action
    const response= await chai.request(app).get('/teams/7');
    //Assertions
    expect(response.status).to.be.deep.equal(200);
    // expect(response.body).to.be.deep.equal(oneTeam);

  });
});
