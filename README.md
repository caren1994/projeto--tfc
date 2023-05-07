# Projeto Trybe Futebol Clube
Projeto realizado durante módulo de Back-end do curso de desenvolvimento web da Trybe.

  <summary><strong>O que foi feito</strong></summary></br>

  Neste projeto desenvolvi um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento respeitou as regras de negócio providas no projeto e API deve ser capaz de ser consumida por um front-end já provido nesse projeto, que foi desenvolvida pela Trybe em `React`.

  O aplicativo TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

  Nesta aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: `CRUD`.

  A aplicação foi desenvolvida com:

- `Node.js`
- `TypeScript`
- `JWT`
- `Sequelize`
- `POO`
- `S.O.L.I.D`
- `Arquitetura MSC`
- `docker`
- `docker-compose`
- `MySql`
- `Express`;


  <summary><strong>Como rodar o projeto</strong></summary></br>

  **Com Docker:**

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior.

- `npm run compose:up` na raiz do projeto;
- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `docker exec -it app_backend bash` em ./app/backend;
- `npm run build` no container do backend;
- `npm run db:reset` no container do backend;

**Localmente:**

**Necessita ter um banco de dados(MySql) instalado localmente**

- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `npm run compose:up` na raiz do projeto;
- `npm run build`;
- `npm run db:reset`;

