
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import {Model} from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('testes de integração Leader ', () => {
  // afterEach(function(){
  //   sinon.restore();
  // })

  it('Testando o metodo get rota /leaderboard/home', async () => {
    //Arrange
    //Action
   const response = await chai
       .request(app).get('/leaderboard/home');
    //Assertions
    expect(response.status).to.be.deep.equal(200);
  });

  it('Testando o metodo get rota /leaderboard/away', async () => {
    //Arrange
    //Action
    const response= await chai
       .request(app).get('/leaderboard/away');
    //Assertions
    expect(response.status).to.be.deep.equal(200);
  });

});