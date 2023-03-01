
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
  it('Testando o metodo get na rota /matches com filtro inprogress ===true ', async () => {
    // //Arrange

    //Action
    const response= await chai.request(app).get('/matches?inProgress=true');
    //Assertions
    expect(response.status).to.be.deep.equal(200);


  });
  it('Testando o metodo get na rota /matches com filtro inprogress ===false ', async () => {
    // //Arrange

    //Action
    const response= await chai.request(app).get('/matches?inProgress=false');
    //Assertions
    expect(response.status).to.be.deep.equal(200);


  });
  it('Testando o metodo patch na rota /matches:id/finish para finalizar a matche', async () => {
    //Arrange
    //Action
    const response = await chai
       .request(app).patch('/matches/10/finish').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI');
//Assertions
    expect(response.status).to.be.deep.equal(200);
  });

  it('Testando o metodo patch na rota /matches:id/finish para finalizar a matche com token invalido', async () => {
    //Arrange
    //Action
    const response = await chai
       .request(app).patch('/matches/10/finish')
        .set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2Nzc2MTY0OTZ9.2bzWbBOvoN-eErkq2rtBIVthoy6X5V2sx9zMo")
      
//Assertions
    expect(response.status).to.be.deep.equal(401);
  });

  it('Testando o metodo patch para editar matche', async () => {
    //Arrange
    //Action
    const response = await chai
       .request(app).patch('/matches/10')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamGoals": 5,
          "awayTeamGoals": 2
        });
//Assertions
    expect(response.status).to.be.deep.equal(200);
  });

  it('Testando o metodo patch para criar matche com id inexistente', async () => {
    //Arrange
    //Action
    const response = await chai
       .request(app).post('/matches')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamId": 10,
          "awayTeamId": 135,
          "homeTeamGoals": 6,
          "awayTeamGoals": 1
        });
//Assertion
    expect(response.status).to.be.deep.equal(404);
  });

  it('Testando o metodo patch para criar matches com id de times iguais', async () => {
    //Arrage
    //Action
    const response = await chai
       .request(app).post('/matches')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamId": 10,
          "awayTeamId": 10,
          "homeTeamGoals": 6,
          "awayTeamGoals": 1
        });

    expect(response.status).to.be.deep.equal(422);
  });

  it('Testando o metodo patch  para criar matche valida', async () => {
   //Arrange
    //Action
    const response = await chai
       .request(app).post('/matches')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamId": 10,
          "awayTeamId": 2,
          "homeTeamGoals": 6,
          "awayTeamGoals": 1
        });
//Assertion
    expect(response.status).to.be.deep.equal(201);
  });

});