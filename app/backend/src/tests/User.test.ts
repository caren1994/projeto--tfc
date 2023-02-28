import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import {Model} from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('testes de integração', () => {
  // afterEach(function(){
  //   sinon.restore();
  // })


  it('Testando o metodo post na rota /login usuario invalido', async () => {
    // //Arrange

    //Action
    const response= await chai.request(app).post('/login').send({"email":"carenoliveiraa@gmail.com","password":"teste123"})
    //Assertions
    expect(response.status).to.be.deep.equal(401);


  });
  it('testando o metodo post na rota /login com email vazio',async()=>{
    //Action 
    const response=await chai.request(app).post('/login').send({
      "email":"",
      "password":"test123"
    })
    //Assertions
    expect(response.status).to.be.deep.equal(400);
  })
  it('testando o metodo post na rota /login com email invalido',async()=>{
    //Action 
    const response=await chai.request(app).post('/login').send({
      "email":"caren@oliveira",
      "password":"test123"
    })
    //Assertions
    expect(response.status).to.be.deep.equal(401);
  })
  it('testando o metodo post na rota /login com password invalido',async()=>{
    //Action 
    const response=await chai.request(app).post('/login').send({
      "email":"caren@oliveira@gmail.com",
      "password":"test"
    })
    //Assertions
    expect(response.status).to.be.deep.equal(401);
  })
  it('testando o metodo post na rota /login user validado com sucesso',async()=>{
    //Action 
    const response=await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    })
    //Assertions
    expect(response.status).to.be.deep.equal(200);
  })
  it('testando o metodo post na rota /login user não validado',async()=>{
    //Action 
    const response=await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_ad"
    })
    //Assertions
    expect(response.status).to.be.deep.equal(401);
  })
  it('testando o metodo get na rota /login/role token incorreto',async()=>{
    //Action 
    const response=await chai.request(app).get('/login/role').set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2Nzc2MTY0OTZ9.2bzWbBOvoN-eErkq2rtBIVthoy6X5V2sx9zMo5DS");
    //Assertions
    expect(response.status).to.be.deep.equal(401);
  })
  it('testando o metodo get na rota /login/role token não enviado',async()=>{
    //Action 
    const response=await chai.request(app).get('/login/role');
    //Assertions
    expect(response.status).to.be.deep.equal(401);
  })
  it('testando o metodo get na rota /login/role token enviado',async()=>{
    //Action 
    const response=await chai.request(app).get('/login/role').set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2Nzc2MTY0OTZ9.2bzWbBOvoN-eErkq2rtBIVthoy6X5V2sx9zMo5DS-J4");
    //Assertions
    expect(response.status).to.be.deep.equal(200);
  })
});