import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import {Model} from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('testes de integração Matche ', () => {
  // afterEach(function(){
  //   sinon.restore();
  // })


  it('Testando o metodo get na rota /matches ', async () => {
    // //Arrange

    //Action
    const response= await chai.request(app).get('/matches');
    //Assertions
    expect(response.status).to.be.deep.equal(200);


  });
});