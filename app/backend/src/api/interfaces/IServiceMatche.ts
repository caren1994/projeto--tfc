import Matche from '../../database/models/Matche';

export default interface IServiceMatche{
  readAll():Promise<Matche[] >;
}
