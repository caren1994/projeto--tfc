import Matche from '../../database/models/Matche';

export default interface IServiceMatche{
  readAll(inProgress?:boolean):Promise<Matche[] >;
  finish(id:number):Promise<number[] | undefined>;
}
